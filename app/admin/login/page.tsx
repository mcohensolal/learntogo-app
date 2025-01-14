'use client';

import { useState } from 'react';

export default function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    console.log('1. Début de la soumission du formulaire');
    console.log('2. Mot de passe saisi:', password);
    
    try {
      console.log('3. Envoi de la requête POST à /api/admin/login');
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
        credentials: 'include'
      });

      console.log('4. Statut de la réponse:', response.status);
      const data = await response.json();
      console.log('5. Données reçues:', data);

      if (response.ok) {
        console.log('6. Connexion réussie, tentative de redirection...');
        window.location.href = '/admin';
        return;
      } else {
        console.log('6. Erreur:', data.error);
        setError(data.error || 'Erreur lors de la connexion');
      }
    } catch (err) {
      console.error('Erreur complète:', err);
      setError('Erreur de connexion');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Connexion Admin
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="password" className="sr-only">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
} 