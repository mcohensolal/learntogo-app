'use client';

import React, { useState, useEffect } from 'react';
import StudentsDashboard from '../components/StudentsDashboard';

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

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/dashboard');
        const result = await response.json();
        if (result.success && result.data) {
          setStudents(result.data.students || []);
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
        body: JSON.stringify({ type: 'student', id, status: newStatus }),
      });

      if (!response.ok) throw new Error('Erreur lors de la mise à jour du statut');

      setStudents(students.map(s => 
        s.id === id ? { ...s, status: newStatus } : s
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
    <StudentsDashboard 
      students={students} 
      updateStatus={updateStatus}
      updatingStatus={updatingStatus}
    />
  );
} 