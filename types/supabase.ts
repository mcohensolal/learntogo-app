export interface Student {
  id: number;
  created_at: string;
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
  availability: string;
  status: 'pending' | 'accepted' | 'rejected';
  admin_notes?: string;
}

export interface Tutor {
  id: number;
  created_at: string;
  first_name: string;
  last_name: string;
  age: number;
  email: string;
  phone: string;
  location: string;
  school: string;
  level: string;
  specialization: string;
  subjects: string[];
  subjects_levels: { [key: string]: string };
  availability: string;
  teaching_format: string;
  is_auto_entrepreneur: boolean;
  cv_link?: string;
  photo_link?: string;
  motivation: string;
  status: 'pending' | 'accepted' | 'rejected';
  hourly_rate: number;
  linkedin_url?: string;
  admin_notes?: string;
}

export interface ApplicationOverview {
  id: number;
  created_at: string;
  type: 'student' | 'tutor';
  first_name: string;
  last_name: string;
  email: string;
  status: 'pending' | 'accepted' | 'rejected';
  admin_notes?: string;
} 