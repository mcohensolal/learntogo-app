'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Tutor {
  id: string;
  first_name: string;
  last_name: string;
  age: number;
  email: string;
  phone: string;
  location: string;
  school: string;
  level: string;
  specialization: string;
  subjects_levels: { [key: string]: string[] };
  availability: { format: string; hoursPerWeek: string };
  teaching_format: string;
  is_auto_entrepreneur: boolean;
  cv_link?: string;
  photo_link?: string;
  motivation: string;
  status: 'pending' | 'accepted' | 'rejected';
}

interface StatusSelectProps {
  currentStatus: 'pending' | 'accepted' | 'rejected';
  onStatusChange: (newStatus: 'pending' | 'accepted' | 'rejected') => void;
  isUpdating: boolean;
}

function StatusSelect({ currentStatus, onStatusChange, isUpdating }: StatusSelectProps) {
  return (
    <select
      value={currentStatus}
      onChange={(e) => onStatusChange(e.target.value as 'pending' | 'accepted' | 'rejected')}
      className={`rounded-md text-sm font-medium px-2 py-1 ${
        isUpdating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      } ${
        currentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
        currentStatus === 'accepted' ? 'bg-green-100 text-green-800' :
        'bg-red-100 text-red-800'
      }`}
      disabled={isUpdating}
    >
      <option value="pending">En attente</option>
      <option value="accepted">Accepté</option>
      <option value="rejected">Refusé</option>
    </select>
  );
}

interface Props {
  tutors: Tutor[];
  updateStatus: (id: string, newStatus: 'pending' | 'accepted' | 'rejected') => Promise<void>;
  updatingStatus: string | null;
}

export default function TutorsDashboard({ tutors, updateStatus, updatingStatus }: Props) {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

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

  const filteredTutors = tutors
    .filter(tutor => 
      (statusFilter === 'all' || tutor.status === statusFilter) &&
      (searchQuery === '' || 
        Object.values(tutor).some(value => 
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        ))
    );

  const sortData = (data: Tutor[], key: keyof Tutor) => {
    const direction = sortConfig?.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
    return [...data].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];
      if (aValue === undefined && bValue === undefined) return 0;
      if (aValue === undefined) return direction === 'asc' ? 1 : -1;
      if (bValue === undefined) return direction === 'asc' ? -1 : 1;
      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const exportToCSV = () => {
    const headers = ['Nom', 'Prénom', 'Age', 'Email', 'Téléphone', 'Ville', 'École', 'Niveau', 'Spécialisation', 'Matières', 'Format', 'Auto-entrepreneur', 'Motivation', 'Statut'];
    
    const csvContent = [
      headers.join(','),
      ...filteredTutors.map(tutor => [
        tutor.last_name,
        tutor.first_name,
        tutor.age,
        tutor.email,
        tutor.phone,
        tutor.location,
        tutor.school,
        tutor.level,
        tutor.specialization,
        Object.entries(tutor.subjects_levels || {}).map(([subject, levels]) => `${subject}(${levels})`).join(';'),
        tutor.teaching_format,
        tutor.is_auto_entrepreneur ? 'Oui' : 'Non',
        tutor.motivation,
        tutor.status
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `tuteurs_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tuteurs</h1>
        <div className="flex items-center space-x-4">
          <Link 
            href="/admin" 
            className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
          >
            Retour à la Vue Générale
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
        >
          <option value="all">Tous les statuts</option>
          <option value="pending">En attente</option>
          <option value="accepted">Accepté</option>
          <option value="rejected">Refusé</option>
        </select>
        <button
          onClick={exportToCSV}
          className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
        >
          Exporter CSV
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => sortData(filteredTutors, 'last_name')}
              >
                Nom {sortConfig?.key === 'last_name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Téléphone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ville</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">École</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Niveau</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spécialisation</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Matières</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Format</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Auto-entrepreneur</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CV</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Motivation</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTutors.map((tutor) => (
              <tr key={tutor.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-violet-100 flex items-center justify-center">
                      <span className="text-sm font-medium text-violet-700">
                        {tutor.first_name?.[0]}{tutor.last_name?.[0]}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {tutor.first_name} {tutor.last_name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tutor.age}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tutor.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tutor.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tutor.location}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tutor.school}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tutor.level}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tutor.specialization}</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {Object.entries(tutor.subjects_levels || {}).map(([subject, levels]) => (
                    `${subject} (${Array.isArray(levels) ? levels.join(', ') : levels})`
                  )).join(', ')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tutor.teaching_format}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${tutor.is_auto_entrepreneur ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {tutor.is_auto_entrepreneur ? 'Oui' : 'Non'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {tutor.cv_link && (
                    <a href={tutor.cv_link} target="_blank" rel="noopener noreferrer" 
                       className="text-violet-600 hover:text-violet-900 transition-colors">
                      Voir CV
                    </a>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {tutor.photo_link && (
                    <a href={tutor.photo_link} target="_blank" rel="noopener noreferrer" 
                       className="text-violet-600 hover:text-violet-900 transition-colors">
                      Voir Photo
                    </a>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{tutor.motivation}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusSelect
                    currentStatus={tutor.status}
                    onStatusChange={(newStatus) => updateStatus(tutor.id, newStatus)}
                    isUpdating={updatingStatus === tutor.id}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 