import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Récupérer les données de la vue d'ensemble
    const { data: overview, error: overviewError } = await supabase
      .from('applications_overview')
      .select('*')
      .order('created_at', { ascending: false });

    if (overviewError) throw overviewError;

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
        overview,
        students,
        tutors
      }
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    return NextResponse.json({
      success: false,
      error: 'Erreur lors de la récupération des données'
    }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { table, id, updates } = await request.json();
    
    const { data, error } = await supabase
      .from(table)
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la mise à jour' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { table, id } = await request.json();
    
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la suppression' },
      { status: 500 }
    );
  }
} 