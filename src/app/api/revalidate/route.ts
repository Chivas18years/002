import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const secret = searchParams.get('secret');
    const path = searchParams.get('path');

    // Verificar secret (opcional, para segurança)
    if (secret !== process.env.REVALIDATE_SECRET && secret !== 'secret') {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    // Revalidar path específico ou todas as rotas PIX
    if (path) {
      revalidatePath(path);
    } else {
      // Revalidar todas as rotas relacionadas ao PIX
      revalidatePath('/api/pix');
      revalidatePath('/pagamento');
      revalidatePath('/checkout');
    }

    // Revalidar tags específicas
    revalidateTag('pix-config');
    revalidateTag('pix-data');

    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now(),
      path: path || 'all-pix-routes'
    });
  } catch (err) {
    console.error('Erro na revalidação:', err);
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}

