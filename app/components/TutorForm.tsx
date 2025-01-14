import React, { useState } from 'react';

const TutorForm: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [school, setSchool] = useState('');
  const [level, setLevel] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [subjectsLevels, setSubjectsLevels] = useState({});
  const [availability, setAvailability] = useState('');
  const [teachingFormat, setTeachingFormat] = useState('');
  const [isAutoEntrepreneur, setIsAutoEntrepreneur] = useState(false);
  const [cvLink, setCvLink] = useState('');
  const [photoLink, setPhotoLink] = useState('');
  const [motivation, setMotivation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/tuteur', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          age,
          email,
          phone,
          location,
          school,
          level,
          specialization,
          subjectsLevels,
          availability,
          teachingFormat,
          isAutoEntrepreneur,
          cvLink,
          photoLink,
          motivation
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
    setAge('');
    setEmail('');
    setPhone('');
    setLocation('');
    setSchool('');
    setLevel('');
    setSpecialization('');
    setSubjectsLevels({});
    setAvailability('');
    setTeachingFormat('');
    setIsAutoEntrepreneur(false);
    setCvLink('');
    setPhotoLink('');
    setMotivation('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Informations personnelles */}
      <div className="space-y-4">
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Prénom"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Nom"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Âge"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Téléphone"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Ville"
          required
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Informations académiques */}
      <div className="space-y-4">
        <input
          type="text"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
          placeholder="École/Université"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          placeholder="Niveau d'études"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          placeholder="Spécialisation"
          required
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Informations d'enseignement */}
      <div className="space-y-4">
        <textarea
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          placeholder="Disponibilités"
          required
          className="w-full p-2 border rounded"
        />
        <select
          value={teachingFormat}
          onChange={(e) => setTeachingFormat(e.target.value)}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Format d'enseignement préféré</option>
          <option value="presentiel">Présentiel</option>
          <option value="distanciel">Distanciel</option>
          <option value="hybride">Hybride</option>
        </select>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={isAutoEntrepreneur}
            onChange={(e) => setIsAutoEntrepreneur(e.target.checked)}
            className="mr-2"
          />
          <label>Auto-entrepreneur</label>
        </div>
      </div>

      {/* Liens et motivation */}
      <div className="space-y-4">
        <input
          type="url"
          value={cvLink}
          onChange={(e) => setCvLink(e.target.value)}
          placeholder="Lien vers votre CV"
          className="w-full p-2 border rounded"
        />
        <input
          type="url"
          value={photoLink}
          onChange={(e) => setPhotoLink(e.target.value)}
          placeholder="Lien vers votre photo"
          className="w-full p-2 border rounded"
        />
        <textarea
          value={motivation}
          onChange={(e) => setMotivation(e.target.value)}
          placeholder="Votre motivation"
          required
          className="w-full p-2 border rounded h-32"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-violet-600 text-white py-2 px-4 rounded hover:bg-violet-700 disabled:opacity-50"
      >
        {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
      </button>

      {submissionStatus === 'success' && (
        <p className="text-green-600">Formulaire envoyé avec succès!</p>
      )}
      {submissionStatus === 'error' && (
        <p className="text-red-600">Erreur: {errorMessage}</p>
      )}
    </form>
  );
};

export default TutorForm; 