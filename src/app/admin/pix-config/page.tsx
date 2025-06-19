"use client";

import { useState, useEffect } from "react";

interface PixConfig {
  id: string;
  pixKey: string;
  pixValue: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function PixConfigPage() {
  const [pixKey, setPixKey] = useState("");
  const [pixValue, setPixValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  // Carregar configuração atual
  useEffect(() => {
    loadCurrentConfig();
  }, []);

  const loadCurrentConfig = async () => {
    try {
      const response = await fetch("/api/admin/pix-config");
      if (response.ok) {
        const config: PixConfig = await response.json();
        setPixKey(config.pixKey);
        setPixValue(config.pixValue || "");
      }
    } catch (error) {
      console.error("Erro ao carregar configuração:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/pix-config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pixKey,
          pixValue,
        }),
      });

      if (response.ok) {
        setMessage("Configuração PIX atualizada com sucesso!");
        setMessageType("success");
      } else {
        const error = await response.text();
        setMessage(`Erro ao atualizar: ${error}`);
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Erro de conexão. Tente novamente.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">
            Configuração PIX
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Configure a chave PIX e o valor que aparecerão no QR Code de pagamento.
          </p>
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="pixKey"
                className="block text-sm font-medium text-gray-700"
              >
                Chave PIX
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="pixKey"
                  value={pixKey}
                  onChange={(e) => setPixKey(e.target.value)}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Digite a chave PIX (CPF, CNPJ, email, telefone ou chave aleatória)"
                  required
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Esta chave será usada para gerar o QR Code PIX.
              </p>
            </div>

            <div>
              <label
                htmlFor="pixValue"
                className="block text-sm font-medium text-gray-700"
              >
                Valor (R$)
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  id="pixValue"
                  value={pixValue}
                  onChange={(e) => setPixValue(e.target.value)}
                  step="0.01"
                  min="0"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="0.00"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Valor fixo para o pagamento. Deixe em branco para usar valores dinâmicos.
              </p>
            </div>

            {message && (
              <div
                className={`rounded-md p-4 ${
                  messageType === "success"
                    ? "bg-green-50 text-green-800"
                    : "bg-red-50 text-red-800"
                }`}
              >
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm font-medium">{message}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                }`}
              >
                {loading ? "Salvando..." : "Salvar Configuração"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Prévia da configuração atual */}
      <div className="bg-gray-50 shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Configuração Atual
          </h3>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Chave PIX</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {pixKey || "Não configurada"}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Valor</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {pixValue ? `R$ ${parseFloat(pixValue).toFixed(2)}` : "Dinâmico"}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

