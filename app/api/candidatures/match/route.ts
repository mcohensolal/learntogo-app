import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CANDIDATURES_FILE = path.join(process.cwd(), 'data', 'candidatures.json');

export async function PUT(request: Request) {
  try {
    const { candidatureId, matchId } = await request.json();
    
    // Lit le fichier existant
    const candidatures = JSON.parse(fs.readFileSync(CANDIDATURES_FILE, 'utf-8'));
    
    // Vérifie que les deux candidatures existent et sont de types différents
    if (candidatures[candidatureId] && candidatures[matchId]) {
      const candidature1 = candidatures[candidatureId];
      const candidature2 = candidatures[matchId];
      
      if (candidature1.type !== candidature2.type) {
        // Met à jour les matchs
        candidatures[candidatureId].matchedWith = matchId;
        candidatures[matchId].matchedWith = candidatureId;
        
        // Écrit dans le fichier
        fs.writeFileSync(CANDIDATURES_FILE, JSON.stringify(candidatures, null, 2));
        
        return NextResponse.json({ success: true });
      } else {
        return NextResponse.json(
          { error: 'Les candidatures doivent être de types différents' },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { error: 'Candidature non trouvée' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Erreur lors du matching:', error);
    return NextResponse.json(
      { error: 'Erreur lors du matching' },
      { status: 500 }
    );
  }
} 