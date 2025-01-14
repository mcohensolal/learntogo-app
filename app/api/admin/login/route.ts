import { NextResponse } from 'next/server';

const ADMIN_PASSWORD = 'admin123';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Mot de passe incorrect' },
        { status: 401 }
      );
    }

    const response = NextResponse.json(
      { success: true },
      { status: 200 }
    );

    response.cookies.set({
      name: 'admin_token',
      value: 'authenticated',
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600
    });

    return response;
  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { error: 'Erreur de connexion' },
      { status: 500 }
    );
  }
} 