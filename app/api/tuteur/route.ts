import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('Données reçues du formulaire tuteur:', data);
    
    // Insérer directement dans la table tutors
    const { data: tutor, error } = await supabase
      .from('tutors')
      .insert([{
        first_name: data.firstName,
        last_name: data.lastName,
        age: data.age,
        email: data.email,
        phone: data.phone,
        location: data.location,
        school: data.school,
        level: data.level,
        specialization: data.specialization,
        subjects_levels: data.subjects_levels,
        availability: data.availability,
        teaching_format: data.teaching_format,
        is_auto_entrepreneur: data.is_auto_entrepreneur,
        cv_link: data.cv_link,
        photo_link: data.photo_link,
        motivation: data.motivation,
        status: 'pending'
      }])
      .select()
      .single();

    if (error) {
      console.error('Erreur Supabase:', error);
      throw error;
    }

    console.log('Tuteur enregistré avec succès:', tutor);
    return NextResponse.json({ success: true, data: tutor });
  } catch (error) {
    console.error('Erreur détaillée:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors de l\'enregistrement du tuteur', error: error },
      { status: 500 }
    );
  }
} 