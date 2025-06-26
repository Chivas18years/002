import { redirect } from "next/navigation";

export default function AdminPage() {
  // Redirecionamento automático para a página de logs
  redirect("/ignite/logs");
}

