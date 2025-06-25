import { db } from "~/server/db";

export default async function LogsPage() {
  // Buscar todos os clientes do banco de dados
  const clients = await db.client.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">
            Logs de Clientes
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Lista de todas as solicitações de CNH enviadas pelos clientes.
          </p>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {clients.length === 0 ? (
            <li className="px-6 py-4 text-center text-gray-500">
              Nenhuma solicitação encontrada.
            </li>
          ) : (
            clients.map((client) => (
              <li key={client.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-medium text-sm">
                            {client.name?.charAt(0)?.toUpperCase() || "?"}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {client.name || "Nome não informado"}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {client.email || "Email não informado"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      <div>
                        <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          CPF
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {client.cpf || "Não informado"}
                        </dd>
                      </div>
                      
                      <div>
                        <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Telefone
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {client.phone || "Não informado"}
                        </dd>
                      </div>
                      
                      <div>
                        <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Data de Nascimento
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {client.birthDate || "Não informado"}
                        </dd>
                      </div>
                      
                      <div>
                        <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Tipo de CNH
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {client.cnhType || "Não informado"}
                        </dd>
                      </div>
                      
                      <div>
                        <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Categoria
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {client.cnhCategory || "Não informado"}
                        </dd>
                      </div>
                      
                      <div>
                        <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Endereço
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {client.address || "Não informado"}
                        </dd>
                      </div>
                      
                      <div>
                        <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          CEP
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {client.cep || "Não informado"}
                        </dd>
                      </div>
                      
                      <div>
                        <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Cidade/UF
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {client.city && client.uf 
                            ? `${client.city}/${client.uf}` 
                            : "Não informado"}
                        </dd>
                      </div>
                      
                      <div>
                        <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Status do Pagamento
                        </dt>
                        <dd className="mt-1">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            client.paymentStatus === "paid" 
                              ? "bg-green-100 text-green-800"
                              : client.paymentStatus === "failed"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {client.paymentStatus === "paid" 
                              ? "Pago"
                              : client.paymentStatus === "failed"
                              ? "Falhou"
                              : "Pendente"}
                          </span>
                        </dd>
                      </div>
                      
                      <div>
                        <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          IP Address
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {client.ipAddress || "Não capturado"}
                        </dd>
                      </div>
                      
                      <div>
                        <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Data da Solicitação
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {new Date(client.createdAt).toLocaleString("pt-BR")}
                        </dd>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
      
      {clients.length > 0 && (
        <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-700">
              Total de <span className="font-medium">{clients.length}</span> solicitações
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

