'use client';

import React, { useState, useEffect } from 'react';

interface Student {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  location: string;
  school: string;
  grade: string;
  section: string;
  difficulties: string;
  requested_subjects: string[];
  urgency_level: string;
  goals: string;
  status: 'pending' | 'accepted' | 'rejected';
}

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

export default function AdminDashboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  
  // Nouveaux états pour le filtrage et la recherche
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  // Fonction de tri
  const sortData = (data: any[], key: string) => {
    const direction = sortConfig?.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });

    return [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  // Fonction pour l'export CSV
  const exportToCSV = (type: 'students' | 'tutors') => {
    const data = type === 'students' ? filteredStudents : filteredTutors;
    const headers = type === 'students' ? 
      ['Nom', 'Prénom', 'Email', 'Téléphone', 'Ville', 'École', 'Niveau', 'Section', 'Matières', 'Difficultés', 'Urgence', 'Objectifs', 'Statut'] :
      ['Nom', 'Prénom', 'Age', 'Email', 'Téléphone', 'Ville', 'École', 'Niveau', 'Spécialisation', 'Matières', 'Format', 'Auto-entrepreneur', 'Motivation', 'Statut'];

    const csvContent = [
      headers.join(','),
      ...data.map(item => {
        if (type === 'students' && 'grade' in item) {
          const student = item as Student;
          return [
            student.last_name,
            student.first_name,
            student.email,
            student.phone,
            student.location,
            student.school,
            student.grade,
            student.section,
            student.requested_subjects?.join(';'),
            student.difficulties,
            student.urgency_level,
            student.goals,
            student.status
          ].join(',');
        } else if (type === 'tutors' && 'teaching_format' in item) {
          const tutor = item as Tutor;
          return [
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
          ].join(',');
        }
        return '';
      })
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${type}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  // Filtrage des données
  const filteredStudents = students
    .filter(student => 
      (statusFilter === 'all' || student.status === statusFilter) &&
      (searchQuery === '' || 
        Object.values(student).some(value => 
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        ))
    );

  const filteredTutors = tutors
    .filter(tutor => 
      (statusFilter === 'all' || tutor.status === statusFilter) &&
      (searchQuery === '' || 
        Object.values(tutor).some(value => 
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        ))
    );

  const updateStatus = async (type: 'student' | 'tutor', id: string, newStatus: 'pending' | 'accepted' | 'rejected') => {
    setUpdatingStatus(id);
    try {
      const response = await fetch('/api/update-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, id, status: newStatus }),
      });

      if (!response.ok) throw new Error('Erreur lors de la mise à jour du statut');

      if (type === 'student') {
        setStudents(students.map(s => 
          s.id === id ? { ...s, status: newStatus } : s
        ));
      } else {
        setTutors(tutors.map(t => 
          t.id === id ? { ...t, status: newStatus } : t
        ));
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la mise à jour du statut');
    } finally {
      setUpdatingStatus(null);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/dashboard');
        const result = await response.json();
        if (result.success && result.data) {
          setStudents(result.data.students || []);
          setTutors(result.data.tutors || []);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calcul des statistiques
  const stats: Stats = {
    totalStudents: students.length,
    totalTutors: tutors.length,
    pendingStudents: students.filter(s => s.status === 'pending').length,
    pendingTutors: tutors.filter(t => t.status === 'pending').length,
    acceptedStudents: students.filter(s => s.status === 'accepted').length,
    acceptedTutors: tutors.filter(t => t.status === 'accepted').length,
    subjectsDistribution: tutors.reduce((acc: { [key: string]: number }, tutor) => {
      Object.keys(tutor.subjects_levels || {}).forEach(subject => {
        acc[subject] = (acc[subject] || 0) + 1;
      });
      return acc;
    }, {}),
    teachingFormats: tutors.reduce((acc: { [key: string]: number }, tutor) => {
      acc[tutor.teaching_format] = (acc[tutor.teaching_format] || 0) + 1;
      return acc;
    }, {})
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Tableau de Bord Administrateur</h1>
      
      {/* Barre de recherche et filtres */}
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
      </div>

      {/* Cartes de statistiques */}
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
              .sort(([, a], [, b]) => (b as number) - (a as number))
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

      {/* Tableaux avec tri et export */}
      <div className="space-y-8">
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Étudiants</h2>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => exportToCSV('students')}
                className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
              >
                Exporter CSV
              </button>
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                  {stats.pendingStudents} en attente
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {stats.acceptedStudents} acceptés
                </span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => setStudents(sortData(students, 'last_name'))}
                  >
                    Nom {sortConfig?.key === 'last_name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Téléphone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ville</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">École</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Niveau</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Section</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Matières</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficultés</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Urgence</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Objectifs</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student: any) => (
                  <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-violet-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-violet-700">
                            {student.first_name?.[0]}{student.last_name?.[0]}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {student.first_name} {student.last_name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.school}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.grade}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.section}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{student.requested_subjects?.join(', ')}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{student.difficulties}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.urgency_level}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{student.goals}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusSelect
                        currentStatus={student.status}
                        onStatusChange={(newStatus) => updateStatus('student', student.id, newStatus)}
                        isUpdating={updatingStatus === student.id}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Tuteurs</h2>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => exportToCSV('tutors')}
                className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
              >
                Exporter CSV
              </button>
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                  {stats.pendingTutors} en attente
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {stats.acceptedTutors} acceptés
                </span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => setTutors(sortData(tutors, 'last_name'))}
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
                {filteredTutors.map((tutor: any) => (
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
                        onStatusChange={(newStatus) => updateStatus('tutor', tutor.id, newStatus)}
                        isUpdating={updatingStatus === tutor.id}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 