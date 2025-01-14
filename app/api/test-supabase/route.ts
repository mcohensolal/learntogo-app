import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Variables d\'environnement manquantes');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Test simple de connexion
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .limit(1);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: 'Connexion à Supabase réussie !',
      test_data: data,
      url: supabaseUrl // Pour vérification
    });

  } catch (error: any) {
    console.error('Erreur de connexion à Supabase:', error);
    return NextResponse.json({
      success: false,
      message: 'Erreur de connexion à Supabase',
      error: error.message
    }, { status: 500 });
  }
} 