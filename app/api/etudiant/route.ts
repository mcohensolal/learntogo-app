import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Insérer directement dans la table students
    const { data: student, error } = await supabase
      .from('students')
      .insert([{
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        location: data.location,
        school: data.school,
        grade: data.grade,
        section: data.section,
        difficulties: data.difficulties,
        requested_subjects: data.requestedSubjects,
        urgency_level: data.urgencyLevel,
        goals: data.goals,
        availability: data.availability,
        status: 'pending'
      }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data: student });
  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors de l\'enregistrement de l\'étudiant' },
      { status: 500 }
    );
  }
} 