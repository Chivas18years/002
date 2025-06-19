import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";

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

    return NextResponse.json(updatedConfig);
  } catch (error) {
    console.error("Erro ao atualizar configuração PIX:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

