import React, { useState } from 'react';

const StudentForm: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [school, setSchool] = useState('');
  const [grade, setGrade] = useState('');
  const [section, setSection] = useState('');
  const [difficulties, setDifficulties] = useState('');
  const [requestedSubjects, setRequestedSubjects] = useState('');
  const [urgencyLevel, setUrgencyLevel] = useState('');
  const [goals, setGoals] = useState('');
  const [availability, setAvailability] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/etudiant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          location,
          school,
          grade,
          section,
          difficulties,
          requestedSubjects,
          urgencyLevel,
          goals,
          availability
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmissionStatus('success');
        resetForm();
      } else {
        setSubmissionStatus('error');
        setErrorMessage('Une erreur est survenue lors de l\'envoi du formulaire.');
      }
    } catch (error) {
      setSubmissionStatus('error');
      setErrorMessage('Une erreur est survenue lors de l\'envoi du formulaire.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setLocation('');
    setSchool('');
    setGrade('');
    setSection('');
    setDifficulties('');
    setRequestedSubjects('');
    setUrgencyLevel('');
    setGoals('');
    setAvailability('');
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ... existing form fields ... */}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
      </button>
      {submissionStatus === 'success' && <p>Formulaire envoyé avec succès!</p>}
      {submissionStatus === 'error' && <p>Erreur: {errorMessage}</p>}
    </form>
  );
};

export default StudentForm; 