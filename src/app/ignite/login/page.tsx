"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // MUDANÇA #1: Apontar para a nova API de login
      const response = await fetch("/api/ignite/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // MUDANÇA #2: Redirecionar para o novo painel
        router.push("/ignite/dashboard");
        router.refresh();
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Credenciais inválidas");
      }
    } catch (error) {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // ... (todo o seu HTML/JSX continua igual aqui)
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Acesso Administrativo
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Faça login para acessar o painel administrativo
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {/* ... todo o seu formulário ... */}
        </form>
        <div className="text-center">
            {/* ... seu link de voltar ... */}
        </div>
      </div>
    </div>
  );
}