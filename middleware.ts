import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Si l'URL commence par /admin mais n'est pas /admin/login
  if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
    // Récupérer le cookie admin_token
    const token = request.cookies.get('admin_token');
    console.log('Cookie trouvé:', token);

    // Si pas de token ou token invalide, rediriger vers la page de login
    if (!token || token.value !== 'authenticated') {
      console.log('Redirection vers login car non authentifié');
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
}; 