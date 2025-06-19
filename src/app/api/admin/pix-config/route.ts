import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    // Buscar a configuração PIX mais recente
    const pixConfig = await db.pixConfig.findFirst({
      orderBy: {
        updatedAt: "desc",
      },
    });

    if (!pixConfig) {
      // Se não existe configuração, criar uma padrão
      const defaultConfig = await db.pixConfig.create({
        data: {
          pixKey: "",
          pixValue: "43.34",
        },
      });
      return NextResponse.json(defaultConfig);
    }

    return NextResponse.json(pixConfig);
  } catch (error) {
    console.error("Erro ao buscar configuração PIX:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pixKey, pixValue } = body;

    if (!pixKey) {
      return NextResponse.json(
        { error: "Chave PIX é obrigatória" },
        { status: 400 }
      );
    }

    // Buscar configuração existente
    const existingConfig = await db.pixConfig.findFirst({
      orderBy: {
        updatedAt: "desc",
      },
    });

    let updatedConfig;

    if (existingConfig) {
      // Atualizar configuração existente
      updatedConfig = await db.pixConfig.update({
        where: {
          id: existingConfig.id,
        },
        data: {
          pixKey,
          pixValue: pixValue || null,
        },
      });
    } else {
      // Criar nova configuração
      updatedConfig = await db.pixConfig.create({
        data: {
          pixKey,
          pixValue: pixValue || null,
        },
      });
    }

    // FORÇAR REVALIDAÇÃO IMEDIATA
    try {
      revalidatePath('/pagamento');
      revalidatePath('/api/pix');
      revalidatePath('/checkout');
      
      // Invalidar cache da Vercel
      const revalidateResponse = await fetch(`${process.env.VERCEL_URL || 'http://localhost:3000'}/api/revalidate?secret=${process.env.REVALIDATE_SECRET || 'secret'}&path=/api/pix`, {
        method: 'POST'
      }).catch(() => null);
      
      console.log('Revalidação forçada executada');
    } catch (revalidateError) {
      console.error('Erro na revalidação:', revalidateError);
    }

    return NextResponse.json(updatedConfig);
  } catch (error) {
    console.error("Erro ao atualizar configuração PIX:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

