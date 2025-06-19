import { PrismaClient } from "@prisma/client";

// Declaração global para o PrismaClient
declare global {
  var prismaGlobal: PrismaClient | undefined;
}

// Função singleton para garantir uma única instância do PrismaClient
export const getDb = () => {
  // Se já existe uma instância global, retorna ela
  if (global.prismaGlobal) {
    return global.prismaGlobal;
  }

  // Cria nova instância do PrismaClient
  const prismaInstance = new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

  // Em produção, armazena na variável global para reutilização
  // Em desenvolvimento, também armazena para evitar múltiplas instâncias em hot-reloads
  global.prismaGlobal = prismaInstance;

  return global.prismaGlobal;
};