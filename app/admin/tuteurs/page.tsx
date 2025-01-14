'use client';

import React, { useState, useEffect } from 'react';
import TutorsDashboard from '../components/TutorsDashboard';

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

export default function TutorsPage() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/dashboard');
        const result = await response.json();
        if (result.success && result.data) {
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

  const updateStatus = async (id: string, newStatus: 'pending' | 'accepted' | 'rejected') => {
    setUpdatingStatus(id);
    try {
      const response = await fetch('/api/update-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: 'tutor', id, status: newStatus }),
      });

      if (!response.ok) throw new Error('Erreur lors de la mise à jour du statut');

      setTutors(tutors.map(t => 
        t.id === id ? { ...t, status: newStatus } : t
      ));
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la mise à jour du statut');
    } finally {
      setUpdatingStatus(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
      </div>
    );
  }

  return (
    <TutorsDashboard 
      tutors={tutors} 
      updateStatus={updateStatus}
      updatingStatus={updatingStatus}
    />
  );
} 