import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { type, id, status } = await request.json();

    if (!type || !id || !status) {
      return NextResponse.json(
        { success: false, message: 'Données manquantes' },
        { status: 400 }
      );
    }

    // Vérifier que le statut est valide
    const validStatuses = ['pending', 'accepted', 'rejected'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: 'Statut invalide' },
        { status: 400 }
      );
    }

    // Mettre à jour le statut dans la table appropriée
    const table = type === 'student' ? 'students' : 'tutors';
    const { error } = await supabase
      .from(table)
      .update({ status })
      .eq('id', id);

    if (error) {
      console.error('Erreur Supabase:', error);
      return NextResponse.json(
        { success: false, message: 'Erreur lors de la mise à jour du statut' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Statut mis à jour avec succès'
    });

  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    );
  }
} 