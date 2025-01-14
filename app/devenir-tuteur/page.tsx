'use client';

import { useState } from 'react';
import { Logo } from '../components/Logo';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DevenirTuteur() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Informations personnelles
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    phone: '',
    location: '',
    
    // Formation
    school: '',
    level: '',
    specialization: '',
    
    // Enseignement
    subjects: [] as string[],
    subjectLevels: {} as { [key: string]: string[] },
    
    // Disponibilités
    availability: {
      hoursPerWeek: '',
      format: ''
    },
    
    // Documents et statut
    isAutoEntrepreneur: false,
    cvLink: '',
    photoLink: '',
    
    // Motivation
    motivation: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/tuteur', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          age: formData.age,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          school: formData.school,
          level: formData.level,
          specialization: formData.specialization,
          subjects_levels: formData.subjectLevels,
          availability: formData.availability,
          teaching_format: formData.availability.format,
          is_auto_entrepreneur: formData.isAutoEntrepreneur,
          cv_link: formData.cvLink,
          photo_link: formData.photoLink,
          motivation: formData.motivation
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi de la candidature');
      }

      // Redirection vers la page de remerciement
      router.push('/devenir-tuteur/merci');
    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur est survenue lors de l\'envoi de votre candidature. Veuillez réessayer.');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
      <nav className="fixed w-full z-50 px-8 py-3 bg-white/80 backdrop-blur-sm border-b border-violet-100">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-8 pt-32 pb-24">
        <h1 className="text-3xl font-bold text-center mb-2">Devenir tuteur</h1>
        <p className="text-gray-600 text-center mb-8">
          Rejoignez notre communauté de tuteurs d'excellence
        </p>

        <div className="bg-white rounded-xl shadow-sm border border-violet-100 overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              {[1, 2, 3, 4].map((stepNum) => (
                <div
                  key={stepNum}
                  className={`flex items-center ${
                    stepNum < step ? 'text-violet-600' : stepNum === step ? 'text-violet-900' : 'text-gray-400'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    stepNum < step ? 'bg-violet-100' : stepNum === step ? 'bg-violet-200' : 'bg-gray-100'
                  }`}>
                    {stepNum}
                  </div>
                  <span className="ml-2 text-sm font-medium">
                    {stepNum === 1 ? 'Profil' : stepNum === 2 ? 'Formation' : stepNum === 3 ? 'Enseignement' : 'Documents'}
                  </span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-4">Informations personnelles</h2>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Prénom
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Jean"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nom
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Dupont"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Âge
                    </label>
                    <input
                      type="number"
                      required
                      min="18"
                      placeholder="20"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jean.dupont@email.com"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="06 12 34 56 78"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ville
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Paris"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-4">Formation</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      École / Université
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: École Polytechnique, ENS Ulm..."
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                      value={formData.school}
                      onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Niveau d'études
                    </label>
                    <select
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                      value={formData.level}
                      onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    >
                      <option value="">Sélectionnez votre niveau</option>
                      <optgroup label="Classes préparatoires">
                        <option value="CPGE 1">CPGE 1ère année</option>
                        <option value="CPGE 2">CPGE 2ème année</option>
                      </optgroup>
                      <optgroup label="Licence">
                        <option value="L1">Licence 1</option>
                        <option value="L2">Licence 2</option>
                        <option value="L3">Licence 3</option>
                      </optgroup>
                      <optgroup label="Master">
                        <option value="M1">Master 1</option>
                        <option value="M2">Master 2</option>
                      </optgroup>
                      <optgroup label="Grandes Écoles">
                        <option value="GE1">1ère année</option>
                        <option value="GE2">2ème année</option>
                        <option value="GE3">3ème année</option>
                      </optgroup>
                      <optgroup label="Autres">
                        <option value="PHD">Doctorat</option>
                        <option value="ALUMNI">Alumni</option>
                      </optgroup>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Spécialisation
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Mathématiques, Physique..."
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                      value={formData.specialization}
                      onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-4">Enseignement</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Matières et niveaux d'enseignement
                    </label>
                    <div className="bg-violet-50 rounded-lg p-4 mb-4">
                      <p className="text-sm text-violet-700 mb-2">
                        <strong>Important :</strong> Sélectionnez uniquement les matières dans lesquelles vous excellez.
                      </p>
                      <ul className="text-sm text-violet-600 list-disc list-inside space-y-1">
                        <li>Un test rapide (15-20 min) sera effectué pour chaque matière sélectionnée</li>
                        <li>Ce test validera votre capacité à enseigner à des lycéens</li>
                        <li>Vous pourrez commencer à donner des cours après validation</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-6">
                      {/* Matières scientifiques */}
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                          <h3 className="font-medium">🔬 Matières scientifiques</h3>
                        </div>
                        <div className="p-4 space-y-4">
                          {['Mathématiques', 'Physique-Chimie', 'SVT', 'NSI'].map((subject) => (
                            <div key={subject} className="space-y-2">
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={formData.subjects.includes(subject)}
                                  onChange={(e) => {
                                    const newSubjects = e.target.checked
                                      ? [...formData.subjects, subject]
                                      : formData.subjects.filter(s => s !== subject);
                                    setFormData({
                                      ...formData,
                                      subjects: newSubjects,
                                      subjectLevels: e.target.checked
                                        ? { ...formData.subjectLevels, [subject]: [] }
                                        : Object.fromEntries(
                                            Object.entries(formData.subjectLevels)
                                              .filter(([key]) => key !== subject)
                                        )
                                    });
                                  }}
                                  className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                                />
                                <span className="ml-2">{subject}</span>
                              </label>
                              
                              {formData.subjects.includes(subject) && (
                                <div className="ml-6 flex flex-wrap gap-2">
                                  {['Seconde', 'Première', 'Terminale'].map((level) => (
                                    <label key={`${subject}-${level}`} className="flex items-center bg-gray-50 px-3 py-1 rounded-full">
                                      <input
                                        type="checkbox"
                                        checked={formData.subjectLevels[subject]?.includes(level)}
                                        onChange={(e) => {
                                          const newLevels = e.target.checked
                                            ? [...(formData.subjectLevels[subject] || []), level]
                                            : formData.subjectLevels[subject].filter(l => l !== level);
                                          setFormData({
                                            ...formData,
                                            subjectLevels: {
                                              ...formData.subjectLevels,
                                              [subject]: newLevels
                                            }
                                          });
                                        }}
                                        className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                                      />
                                      <span className="ml-2 text-sm">{level}</span>
                                    </label>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Matières littéraires */}
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                          <h3 className="font-medium">📚 Matières littéraires</h3>
                        </div>
                        <div className="p-4 space-y-4">
                          {['Français', 'Philosophie', 'Histoire-Géographie'].map((subject) => (
                            <div key={subject} className="space-y-2">
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={formData.subjects.includes(subject)}
                                  onChange={(e) => {
                                    const newSubjects = e.target.checked
                                      ? [...formData.subjects, subject]
                                      : formData.subjects.filter(s => s !== subject);
                                    setFormData({
                                      ...formData,
                                      subjects: newSubjects,
                                      subjectLevels: e.target.checked
                                        ? { ...formData.subjectLevels, [subject]: [] }
                                        : Object.fromEntries(
                                            Object.entries(formData.subjectLevels)
                                              .filter(([key]) => key !== subject)
                                        )
                                    });
                                  }}
                                  className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                                />
                                <span className="ml-2">{subject}</span>
                              </label>
                              
                              {formData.subjects.includes(subject) && (
                                <div className="ml-6 flex flex-wrap gap-2">
                                  {['Seconde', 'Première', 'Terminale'].map((level) => (
                                    <label key={`${subject}-${level}`} className="flex items-center bg-gray-50 px-3 py-1 rounded-full">
                                      <input
                                        type="checkbox"
                                        checked={formData.subjectLevels[subject]?.includes(level)}
                                        onChange={(e) => {
                                          const newLevels = e.target.checked
                                            ? [...(formData.subjectLevels[subject] || []), level]
                                            : formData.subjectLevels[subject].filter(l => l !== level);
                                          setFormData({
                                            ...formData,
                                            subjectLevels: {
                                              ...formData.subjectLevels,
                                              [subject]: newLevels
                                            }
                                          });
                                        }}
                                        className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                                      />
                                      <span className="ml-2 text-sm">{level}</span>
                                    </label>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Langues */}
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                          <h3 className="font-medium">🌍 Langues</h3>
                        </div>
                        <div className="p-4 space-y-4">
                          {['Anglais', 'Espagnol', 'Allemand'].map((subject) => (
                            <div key={subject} className="space-y-2">
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={formData.subjects.includes(subject)}
                                  onChange={(e) => {
                                    const newSubjects = e.target.checked
                                      ? [...formData.subjects, subject]
                                      : formData.subjects.filter(s => s !== subject);
                                    setFormData({
                                      ...formData,
                                      subjects: newSubjects,
                                      subjectLevels: e.target.checked
                                        ? { ...formData.subjectLevels, [subject]: [] }
                                        : Object.fromEntries(
                                            Object.entries(formData.subjectLevels)
                                              .filter(([key]) => key !== subject)
                                        )
                                    });
                                  }}
                                  className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                                />
                                <span className="ml-2">{subject}</span>
                              </label>
                              
                              {formData.subjects.includes(subject) && (
                                <div className="ml-6 flex flex-wrap gap-2">
                                  {['Seconde', 'Première', 'Terminale'].map((level) => (
                                    <label key={`${subject}-${level}`} className="flex items-center bg-gray-50 px-3 py-1 rounded-full">
                                      <input
                                        type="checkbox"
                                        checked={formData.subjectLevels[subject]?.includes(level)}
                                        onChange={(e) => {
                                          const newLevels = e.target.checked
                                            ? [...(formData.subjectLevels[subject] || []), level]
                                            : formData.subjectLevels[subject].filter(l => l !== level);
                                          setFormData({
                                            ...formData,
                                            subjectLevels: {
                                              ...formData.subjectLevels,
                                              [subject]: newLevels
                                            }
                                          });
                                        }}
                                        className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                                      />
                                      <span className="ml-2 text-sm">{level}</span>
                                    </label>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Disponibilités (heures par semaine)
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      max="40"
                      placeholder="Ex: 10"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                      value={formData.availability.hoursPerWeek}
                      onChange={(e) => setFormData({
                        ...formData,
                        availability: { ...formData.availability, hoursPerWeek: e.target.value }
                      })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Format d'enseignement préféré
                    </label>
                    <select
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                      value={formData.availability.format}
                      onChange={(e) => setFormData({
                        ...formData,
                        availability: { ...formData.availability, format: e.target.value }
                      })}
                    >
                      <option value="">Sélectionnez un format</option>
                      <option value="presentiel">Présentiel uniquement</option>
                      <option value="distanciel">Distanciel uniquement</option>
                      <option value="hybride">Les deux possibles</option>
                    </select>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-4">Documents et statut</h2>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Êtes-vous auto-entrepreneur ?
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          required
                          name="isAutoEntrepreneur"
                          value="true"
                          checked={formData.isAutoEntrepreneur === true}
                          onChange={(e) => setFormData({
                            ...formData,
                            isAutoEntrepreneur: e.target.value === 'true'
                          })}
                          className="mr-2"
                        />
                        Oui
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          required
                          name="isAutoEntrepreneur"
                          value="false"
                          checked={formData.isAutoEntrepreneur === false}
                          onChange={(e) => setFormData({
                            ...formData,
                            isAutoEntrepreneur: e.target.value === 'true'
                          })}
                          className="mr-2"
                        />
                        Non
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Lien Google Drive vers votre CV
                    </label>
                    <input
                      type="url"
                      required
                      placeholder="https://drive.google.com/..."
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                      value={formData.cvLink}
                      onChange={(e) => setFormData({ ...formData, cvLink: e.target.value })}
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Merci de partager votre CV via Google Drive et de vous assurer que le lien est accessible
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Lien Google Drive vers votre photo professionnelle
                    </label>
                    <input
                      type="url"
                      required
                      placeholder="https://drive.google.com/..."
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                      value={formData.photoLink}
                      onChange={(e) => setFormData({ ...formData, photoLink: e.target.value })}
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Une photo professionnelle récente sur fond neutre
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Motivation
                    </label>
                    <textarea
                      required
                      placeholder="Pourquoi souhaitez-vous devenir tuteur ?"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 h-32"
                      value={formData.motivation}
                      onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                    />
                  </div>
                </div>
              )}

              <div className="mt-8 flex justify-between">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-2 text-sm font-medium text-violet-600 bg-violet-50 rounded-lg hover:bg-violet-100 transition-colors"
                  >
                    Précédent
                  </button>
                )}
                <button
                  type={step === 4 ? 'submit' : 'button'}
                  onClick={() => {
                    if (step === 3 && formData.subjects.length === 0) {
                      alert('Veuillez sélectionner au moins une matière');
                      return;
                    }
                    if (step === 3) {
                      const hasInvalidSubject = formData.subjects.some(
                        subject => !formData.subjectLevels[subject] || formData.subjectLevels[subject].length === 0
                      );
                      if (hasInvalidSubject) {
                        alert('Veuillez sélectionner au moins un niveau pour chaque matière');
                        return;
                      }
                    }
                    if (step < 4) setStep(step + 1);
                  }}
                  className="ml-auto px-6 py-2 text-sm font-medium text-white bg-violet-600 rounded-lg hover:bg-violet-700 transition-colors"
                >
                  {step === 4 ? 'Envoyer ma candidature' : 'Suivant'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
} 