import { Logo } from '../../components/Logo';
import Link from 'next/link';

export default function Merci() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
      <nav className="fixed w-full z-50 px-8 py-3 bg-white/80 backdrop-blur-sm border-b border-violet-100">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-8 pt-32 pb-24">
        <div className="bg-white rounded-xl shadow-sm border border-violet-100 overflow-hidden">
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">✨</span>
            </div>
            
            <h1 className="text-2xl font-bold mb-4">
              Merci pour votre candidature !
            </h1>
            
            <p className="text-gray-600 mb-8">
              Nous avons bien reçu votre candidature et nous vous contacterons très prochainement par email.
            </p>

            <div className="bg-violet-50 rounded-lg p-6 mb-8">
              <h2 className="font-semibold mb-4">Prochaines étapes :</h2>
              <ol className="text-sm text-violet-700 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-violet-100 flex-shrink-0 flex items-center justify-center">1</span>
                  <span>Nous examinerons votre profil sous 24-48h</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-violet-100 flex-shrink-0 flex items-center justify-center">2</span>
                  <span>Vous recevrez un test rapide pour chaque matière sélectionnée (15-20 min par test)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-violet-100 flex-shrink-0 flex items-center justify-center">3</span>
                  <span>Un entretien de 15 minutes sera planifié pour faire connaissance</span>
                </li>
              </ol>
            </div>

            <Link 
              href="/"
              className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-violet-600 bg-violet-50 rounded-lg hover:bg-violet-100 transition-colors"
            >
              ← Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
} 