import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // 1. Verifica se a rota é uma área protegida
  // (Começa com "/ignite", mas NÃO é a própria página de login "/ignite/login")
  if (
    request.nextUrl.pathname.startsWith("/ignite") &&
    !request.nextUrl.pathname.startsWith("/ignite/login")
  ) {
    // 2. Procura pelo cookie de autenticação (mantivemos o mesmo nome "admin-auth")
    const authCookie = request.cookies.get("admin-auth");

    // 3. Se o cookie não existir ou for inválido, redireciona para a NOVA página de login
    if (!authCookie || authCookie.value !== "authenticated") {
      const loginUrl = new URL("/ignite/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Permite o acesso se for a página de login ou se o usuário estiver autenticado
  return NextResponse.next();
}

// 4. Define que este middleware deve ser executado para TODAS as rotas dentro de "/ignite/"
export const config = {
  matcher: ["/ignite/:path*"],
};