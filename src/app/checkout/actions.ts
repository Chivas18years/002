"use server";

import { getDb } from "~/server/db"; // <-- CORRIGIDO AQUI: Importamos getDb
// REMOVIDO: import { clients } from "~/server/db/schema"; // Esta importação é do Drizzle ORM e não será usada com PrismaClient
import { headers } from "next/headers"; // Adicionado para capturar o IP

export async function submitCheckoutForm(formData: FormData) { // Removido ipAddress do parâmetro, será capturado internamente
  // Acessar diretamente os campos do FormData
  const nome = formData.get("name") as string; // 'name' é o nome do campo no formulário
  const cpf = formData.get("cpf") as string;
  const nascimento = formData.get("birthDate") as string; // 'birthDate' é o nome do campo no formulário
  const email = formData.get("email") as string;
  const telefone = formData.get("phone") as string;
  const tipo = formData.get("cnhType") as string; // 'cnhType' é o nome do campo no formulário
  const categoria = formData.get("cnhCategory") as string; // 'cnhCategory' é o nome do campo no formulário
  const endereco = formData.get("address") as string; // 'address' é o nome do campo no formulário
  const cep = formData.get("cep") as string;
  const uf = formData.get("uf") as string;
  const cidade = formData.get("city") as string;
  const ipAddress = headers().get("x-forwarded-for") ?? "N/A"; // Captura o IP dentro da Server Action

  try {
    // CORRIGIDO: Usando a sintaxe do Prisma para criar um cliente
    // E incluindo TODOS os novos campos que você adicionou no schema.prisma
    await getDb().client.create({ // <-- CORRIGIDO AQUI: getDb()
      data: {
        name: nome,
        cpf: cpf,
        birthDate: nascimento,
        email: email,
        phone: telefone,
        cnhType: tipo,
        cnhCategory: categoria,
        address: endereco,
        cep: cep,
        uf: uf,
        city: cidade,
        ipAddress: ipAddress,
        serviceRequested: `${tipo} - ${categoria}`, // Exemplo de serviço
        paymentStatus: "pending", // Status inicial
      },
    });
    console.log("Cliente salvo no banco de dados:", email);
    return { success: true };
  } catch (error) {
    console.error("Erro ao salvar cliente:", error);
    return { success: false, error: "Falha ao salvar os dados. Tente novamente." };
  }
}