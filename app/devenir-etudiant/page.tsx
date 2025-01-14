'use client';

import { useState } from 'react';
import { Logo } from '../components/Logo';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DevenirEtudiant() {
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
    
    // Scolarité
    school: '',
    grade: '',
    section: '',
    average: '',
    difficulties: '',
    
    // Matières souhaitées
    requestedSubjects: [] as string[],
    subjectLevels: {} as { [key: string]: string },
    urgencyLevel: '',
    goals: '',
    
    // Disponibilités
    availability: {
      hoursPerWeek: '',
      format: '',
      preferredDays: [] as string[],
      preferredTimes: [] as string[]
    },
    
    // Budget
    budget: '',
    
    // Photo et motivation
    photoLink: '',
    motivation: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/etudiant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          school: formData.school,
          grade: formData.grade,
          section: formData.section,
          difficulties: formData.difficulties,
          requestedSubjects: formData.requestedSubjects,
          urgencyLevel: formData.urgencyLevel,
          goals: formData.goals,
          availability: formData.availability
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi de la demande');
      }

      router.push('/devenir-etudiant/merci');
    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur est survenue lors de l\'envoi de votre demande. Veuillez réessayer.');
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
        <h1 className="text-3xl font-bold text-center mb-2">Inscription étudiant</h1>
        <p className="text-gray-600 text-center mb-8">
          Trouvez le tuteur idéal pour réussir vos études
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
                    {stepNum === 1 ? 'Profil' : stepNum === 2 ? 'Scolarité' : stepNum === 3 ? 'Matières' : 'Préférences'}
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
                      min="14"
                      placeholder="16"
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
                  <h2 className="text-xl font-semibold mb-4">Scolarité</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Établissement
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nom de votre lycée"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                      value={formData.school}
                      onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Niveau
                    </label>
                    <select
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                      value={formData.grade}
                      onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    >
                      <option value="">Sélectionnez votre niveau</option>
                      <option value="2nde">Seconde</option>
                      <option value="1ere">Première</option>
                      <option value="Tle">Terminale</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Section
                    </label>
                    <select
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                      value={formData.section}
                      onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                    >
                      <option value="">Sélectionnez votre section</option>
                      <option value="generale">Générale</option>
                      <option value="techno">Technologique</option>
                      <option value="pro">Professionnelle</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Moyenne générale approximative
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      max="20"
                      step="0.5"
                      placeholder="Ex: 12.5"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                      value={formData.average}
                      onChange={(e) => setFormData({ ...formData, average: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Difficultés rencontrées
                    </label>
                    <textarea
                      required
                      placeholder="Décrivez brièvement vos principales difficultés scolaires"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 h-32"
                      value={formData.difficulties}
                      onChange={(e) => setFormData({ ...formData, difficulties: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-4">Matières souhaitées</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Sélectionnez les matières pour lesquelles vous souhaitez du soutien
                    </label>
                    
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
                                  checked={formData.requestedSubjects.includes(subject)}
                                  onChange={(e) => {
                                    const newSubjects = e.target.checked
                                      ? [...formData.requestedSubjects, subject]
                                      : formData.requestedSubjects.filter(s => s !== subject);
                                    setFormData({
                                      ...formData,
                                      requestedSubjects: newSubjects
                                    });
                                  }}
                                  className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                                />
                                <span className="ml-2">{subject}</span>
                              </label>
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
                                  checked={formData.requestedSubjects.includes(subject)}
                                  onChange={(e) => {
                                    const newSubjects = e.target.checked
                                      ? [...formData.requestedSubjects, subject]
                                      : formData.requestedSubjects.filter(s => s !== subject);
                                    setFormData({
                                      ...formData,
                                      requestedSubjects: newSubjects
                                    });
                                  }}
                                  className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                                />
                                <span className="ml-2">{subject}</span>
                              </label>
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
                                  checked={formData.requestedSubjects.includes(subject)}
                                  onChange={(e) => {
                                    const newSubjects = e.target.checked
                                      ? [...formData.requestedSubjects, subject]
                                      : formData.requestedSubjects.filter(s => s !== subject);
                                    setFormData({
                                      ...formData,
                                      requestedSubjects: newSubjects
                                    });
                                  }}
                                  className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                                />
                                <span className="ml-2">{subject}</span>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Niveau d'urgence
                    </label>
                    <select
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                      value={formData.urgencyLevel}
                      onChange={(e) => setFormData({ ...formData, urgencyLevel: e.target.value })}
                    >
                      <option value="">Sélectionnez le niveau d'urgence</option>
                      <option value="faible">Faible - Préparation à long terme</option>
                      <option value="moyen">Moyen - Besoin d'amélioration progressive</option>
                      <option value="eleve">Élevé - Examens/contrôles proches</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Objectifs
                    </label>
                    <textarea
                      required
                      placeholder="Quels sont vos objectifs ? (Ex: Améliorer mes notes, préparer le bac, etc.)"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 h-32"
                      value={formData.goals}
                      onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-4">Préférences</h2>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Disponibilités (heures par semaine)
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      max="20"
                      placeholder="Ex: 2"
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
                      Format préféré
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Jours préférés
                    </label>
                    <div className="space-y-2">
                      {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'].map((day) => (
                        <label key={day} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.availability.preferredDays.includes(day)}
                            onChange={(e) => {
                              const newDays = e.target.checked
                                ? [...formData.availability.preferredDays, day]
                                : formData.availability.preferredDays.filter(d => d !== day);
                              setFormData({
                                ...formData,
                                availability: {
                                  ...formData.availability,
                                  preferredDays: newDays
                                }
                              });
                            }}
                            className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                          />
                          <span className="ml-2">{day}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Créneaux horaires préférés
                    </label>
                    <div className="space-y-2">
                      {[
                        'Matin (8h-12h)',
                        'Midi (12h-14h)',
                        'Après-midi (14h-17h)',
                        'Fin d\'après-midi (17h-19h)',
                        'Soirée (19h-21h)'
                      ].map((time) => (
                        <label key={time} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.availability.preferredTimes.includes(time)}
                            onChange={(e) => {
                              const newTimes = e.target.checked
                                ? [...formData.availability.preferredTimes, time]
                                : formData.availability.preferredTimes.filter(t => t !== time);
                              setFormData({
                                ...formData,
                                availability: {
                                  ...formData.availability,
                                  preferredTimes: newTimes
                                }
                              });
                            }}
                            className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                          />
                          <span className="ml-2">{time}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Budget par heure
                    </label>
                    <select
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    >
                      <option value="">Sélectionnez votre budget</option>
                      <option value="20-25">20-25€/h</option>
                      <option value="25-30">25-30€/h</option>
                      <option value="30-35">30-35€/h</option>
                      <option value="35+">Plus de 35€/h</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Lien Google Drive vers votre photo
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
                      Une photo récente de vous
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Motivation
                    </label>
                    <textarea
                      required
                      placeholder="Pourquoi souhaitez-vous prendre des cours particuliers ?"
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
                    if (step === 3 && formData.requestedSubjects.length === 0) {
                      alert('Veuillez sélectionner au moins une matière');
                      return;
                    }
                    if (step < 4) setStep(step + 1);
                  }}
                  className="ml-auto px-6 py-2 text-sm font-medium text-white bg-violet-600 rounded-lg hover:bg-violet-700 transition-colors"
                >
                  {step === 4 ? 'Envoyer ma demande' : 'Suivant'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
} 