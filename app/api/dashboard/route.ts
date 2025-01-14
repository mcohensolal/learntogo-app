import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Récupérer les données des étudiants
    const { data: students, error: studentsError } = await supabase
      .from('students')
      .select('*')
      .order('created_at', { ascending: false });

    if (studentsError) throw studentsError;

    // Récupérer les données des tuteurs
    const { data: tutors, error: tutorsError } = await supabase
      .from('tutors')
      .select('*')
      .order('created_at', { ascending: false });

    if (tutorsError) throw tutorsError;

    return NextResponse.json({
      success: true,
      data: {
        students,
        tutors
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la récupération des données' },
      { status: 500 }
    );
  }
} 