import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("admin-auth");
  const isAuthenticated = authCookie?.value === "authenticated";
  const { pathname } = request.nextUrl;

  // CASO 1: Se o usuário já está logado e tenta acessar a página de login,
  // não faz sentido. Vamos mandá-lo para a página principal do painel (logs).
  if (isAuthenticated && pathname === "/ignite/login") {
    return NextResponse.redirect(new URL("/ignite/logs", request.url));
  }

  // CASO 2: Se o usuário já está logado e acessa a raiz do painel ("/ignite"),
  // que é uma página vazia, vamos mandá-lo para a primeira página útil (logs).
  if (isAuthenticated && pathname === "/ignite") {
    return NextResponse.redirect(new URL("/ignite/logs", request.url));
  }

  // CASO 3: Se o usuário NÃO está logado e tenta acessar qualquer página protegida
  // (que não seja a de login), aí sim, mandamos para o login.
  if (!isAuthenticated && pathname.startsWith("/ignite") && pathname !== "/ignite/login") {
    return NextResponse.redirect(new URL("/ignite/login", request.url));
  }

  // Se nenhuma das regras acima se aplicar, permite que o acesso continue normalmente.
  return NextResponse.next();
}

export const config = {
  matcher: ["/ignite/:path*"],
};