'use client';

import React, { useState, useEffect } from 'react';
import GeneralDashboard from './components/GeneralDashboard';

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

export default function AdminPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
      </div>
    );
  }

  const stats = {
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

  return <GeneralDashboard stats={stats} />;
} 