'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Stats {
  totalStudents: number;
  totalTutors: number;
  pendingStudents: number;
  pendingTutors: number;
  acceptedStudents: number;
  acceptedTutors: number;
  subjectsDistribution: { [key: string]: number };
  teachingFormats: { [key: string]: number };
}

interface Props {
  stats: Stats;
}

export default function GeneralDashboard({ stats }: Props) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
      });
      
      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Vue Générale</h1>
        <div className="flex items-center space-x-4">
          <Link 
            href="/admin/etudiants" 
            className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
          >
            Voir les Étudiants
          </Link>
          <Link 
            href="/admin/tuteurs" 
            className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
          >
            Voir les Tuteurs
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-gray-500 text-sm font-medium">Total Étudiants</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalStudents}</p>
          <div className="flex items-center mt-4">
            <span className="text-green-500 text-sm font-medium">{stats.acceptedStudents} acceptés</span>
            <span className="mx-2 text-gray-300">•</span>
            <span className="text-yellow-500 text-sm font-medium">{stats.pendingStudents} en attente</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-gray-500 text-sm font-medium">Total Tuteurs</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalTutors}</p>
          <div className="flex items-center mt-4">
            <span className="text-green-500 text-sm font-medium">{stats.acceptedTutors} acceptés</span>
            <span className="mx-2 text-gray-300">•</span>
            <span className="text-yellow-500 text-sm font-medium">{stats.pendingTutors} en attente</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-gray-500 text-sm font-medium">Matières les plus demandées</h3>
          <div className="mt-4 space-y-2">
            {Object.entries(stats.subjectsDistribution)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 3)
              .map(([subject, count]) => (
                <div key={subject} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{subject}</span>
                  <span className="text-sm font-medium text-violet-600">{count} tuteurs</span>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-gray-500 text-sm font-medium">Format d'enseignement</h3>
          <div className="mt-4 space-y-2">
            {Object.entries(stats.teachingFormats).map(([format, count]) => (
              <div key={format} className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{format}</span>
                <span className="text-sm font-medium text-violet-600">{count} tuteurs</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 