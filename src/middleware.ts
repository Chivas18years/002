import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Verificar se é uma rota admin (exceto login)
  if (request.nextUrl.pathname.startsWith("/admin") && 
      !request.nextUrl.pathname.startsWith("/admin/login")) {
    
    // Verificar se existe cookie de autenticação
    const authCookie = request.cookies.get("admin-auth");
    
    if (!authCookie || authCookie.value !== "authenticated") {
      // Redirecionar para login se não autenticado
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*"
  ]
};

