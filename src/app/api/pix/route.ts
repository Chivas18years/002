import { NextResponse } from "next/server";
import { db } from "~/server/db";

export async function GET() {
  try {
    // Buscar configurações PIX do banco de dados
    const config = await db.pixConfig.findFirst({
      orderBy: {
        updatedAt: "desc",
      },
    });
    
    if (config) {
      // Converter o valor para número se existir
      const pixValue = config.pixValue ? parseFloat(config.pixValue) : null;
      
      // Adicionar timestamp para evitar cache
      const response = NextResponse.json({ 
        key: config.pixKey,
        value: pixValue,
        timestamp: Date.now()
      });
      
      // Headers para evitar cache
      response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      response.headers.set('Pragma', 'no-cache');
      response.headers.set('Expires', '0');
      response.headers.set('Surrogate-Control', 'no-store');
      
      return response;
    }
    
    // Fallback para a chave padrão se não houver configuração
    const response = NextResponse.json({ 
      key: "b6399e0e-80f6-4b0b-b773-8a738569699b",
      value: 43.34,
      timestamp: Date.now()
    });
    
    // Headers para evitar cache
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    response.headers.set('Surrogate-Control', 'no-store');
    
    return response;
  } catch (error) {
    console.error("Erro ao buscar configurações PIX:", error);
    return NextResponse.json(
      { error: "Erro ao buscar configurações PIX" },
      { status: 500 }
    );
  }
}