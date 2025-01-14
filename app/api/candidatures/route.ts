import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { supabase } from '@/utils/supabase';

const CANDIDATURES_FILE = path.join(process.cwd(), 'data', 'candidatures.json');

// Assure-toi que le dossier data existe
if (!fs.existsSync(path.join(process.cwd(), 'data'))) {
  fs.mkdirSync(path.join(process.cwd(), 'data'));
}

// Crée le fichier s'il n'existe pas
if (!fs.existsSync(CANDIDATURES_FILE)) {
  fs.writeFileSync(CANDIDATURES_FILE, '[]');
}

// Fonction pour s'assurer que le fichier existe
function ensureFileExists() {
  const dir = path.dirname(CANDIDATURES_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(CANDIDATURES_FILE)) {
    fs.writeFileSync(CANDIDATURES_FILE, '[]', 'utf-8');
  }
}

export async function GET() {
  try {
    const candidatures = JSON.parse(fs.readFileSync(CANDIDATURES_FILE, 'utf-8'));
    return NextResponse.json(candidatures);
  } catch (error) {
    console.error('Erreur lors de la lecture des candidatures:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la lecture des candidatures' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Insertion dans la table students
    const { data: student, error } = await supabase
      .from('students')
      .insert([
        {
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
          availability: data.availability
        }
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ 
      success: true, 
      message: 'Inscription réussie',
      data: student 
    });

  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Erreur lors de l\'inscription' 
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { index, status, type, notes } = data;

    ensureFileExists();
    const candidatures = JSON.parse(fs.readFileSync(CANDIDATURES_FILE, 'utf-8'));

    if (index < 0 || index >= candidatures.length) {
      return NextResponse.json({ error: 'Index invalide' }, { status: 400 });
    }

    if (type === 'status') {
      candidatures[index].status = status;
    } else if (type === 'notes') {
      candidatures[index].notes = notes;
    }

    fs.writeFileSync(CANDIDATURES_FILE, JSON.stringify(candidatures, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error);
    return NextResponse.json({ error: 'Erreur lors de la mise à jour' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { index } = await request.json();
    
    // Lecture du fichier JSON
    const candidatures = JSON.parse(fs.readFileSync(CANDIDATURES_FILE, 'utf-8'));
    
    // Suppression de la candidature à l'index spécifié
    if (index >= 0 && index < candidatures.length) {
      candidatures.splice(index, 1);
      
      // Écriture du fichier mis à jour
      fs.writeFileSync(CANDIDATURES_FILE, JSON.stringify(candidatures, null, 2));
      
      return NextResponse.json({ message: 'Candidature supprimée avec succès' });
    } else {
      return NextResponse.json({ error: 'Index invalide' }, { status: 400 });
    }
  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
    return NextResponse.json({ error: 'Erreur lors de la suppression' }, { status: 500 });
  }
} 