import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { revalidatePath } from "next/cache";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    // Forçar revalidação de todas as rotas relacionadas
    revalidatePath('/pagamento');
    revalidatePath('/api/pix');
    
    // Buscar configurações PIX do banco de dados
    const config = await db.pixConfig.findFirst({
      orderBy: {
        updatedAt: "desc",
      },
    });
    
    // Se não tem config no banco → não gera QR Code
    if (!config) {
      const response = NextResponse.json({ 
        error: "Chave PIX não configurada",
        configured: false,
        timestamp: Date.now()
      });
      
      // Headers mais agressivos para evitar cache
      response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
      response.headers.set('Pragma', 'no-cache');
      response.headers.set('Expires', '0');
      response.headers.set('Surrogate-Control', 'no-store');
      response.headers.set('CDN-Cache-Control', 'no-store');
      response.headers.set('Vercel-CDN-Cache-Control', 'no-store');
      response.headers.set('X-Accel-Expires', '0');
      
      return response;
    }
    
    // Converter o valor para número se existir
    const pixValue = config.pixValue ? parseFloat(config.pixValue) : null;
    
    // Adicionar timestamp para evitar cache
    const response = NextResponse.json({ 
      key: config.pixKey,
      value: pixValue,
      timestamp: Date.now(),
      lastUpdate: config.updatedAt,
      configured: true
    });
    
    // Headers mais agressivos para evitar cache
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    response.headers.set('Surrogate-Control', 'no-store');
    response.headers.set('CDN-Cache-Control', 'no-store');
    response.headers.set('Vercel-CDN-Cache-Control', 'no-store');
    response.headers.set('X-Accel-Expires', '0');
    response.headers.set('Edge-Cache-Tag', `pix-${Date.now()}`);
    
    return response;
  } catch (error) {
    console.error("Erro ao buscar configurações PIX:", error);
    return NextResponse.json(
      { error: "Erro ao buscar configurações PIX" },
      { status: 500 }
    );
  }
}

