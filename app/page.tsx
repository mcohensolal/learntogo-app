'use client';

import Image from "next/image";
import { AnimatedSection } from './components/AnimatedSection';
import { Button } from './components/Button';
import { Logo } from './components/Logo';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [chatKey, setChatKey] = useState(0);
  const [showMessage1, setShowMessage1] = useState(false);
  const [showTyping1, setShowTyping1] = useState(false);
  const [showMessage2, setShowMessage2] = useState(false);
  const [showTyping2, setShowTyping2] = useState(false);
  const [showMessage3, setShowMessage3] = useState(false);
  const [showTyping3, setShowTyping3] = useState(false);
  const [showMessage4, setShowMessage4] = useState(false);
  const [showSystemMessage, setShowSystemMessage] = useState(false);
  const [showTutorFound, setShowTutorFound] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [formStep, setFormStep] = useState(0);
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
      preferredDays: [] as string[],
      preferredTimes: [] as string[]
    },
    
    // Budget
    budget: '',
    
    // Photo et motivation
    photoLink: '',
    motivation: ''
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const scrollToBottom = () => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    };

    const resetChat = () => {
      setShowMessage1(false);
      setShowTyping1(false);
      setShowMessage2(false);
      setShowTyping2(false);
      setShowMessage3(false);
      setShowTyping3(false);
      setShowMessage4(false);
      setShowSystemMessage(false);
      setShowTutorFound(false);
      setChatKey(prev => prev + 1);
    };

    const startChat = () => {
      setTimeout(() => {
        setShowMessage1(true);
        scrollToBottom();
      }, 1000);
      setTimeout(() => {
        setShowSystemMessage(true);
        scrollToBottom();
      }, 3000);
      setTimeout(() => {
        setShowTutorFound(true);
        scrollToBottom();
      }, 6000);
      setTimeout(() => {
        setShowTyping1(true);
        scrollToBottom();
      }, 9000);
      setTimeout(() => {
        setShowTyping1(false);
        setShowMessage2(true);
        scrollToBottom();
      }, 12000);
      setTimeout(() => {
        setShowTyping2(true);
        scrollToBottom();
      }, 15000);
      setTimeout(() => {
        setShowTyping2(false);
        setShowMessage3(true);
        scrollToBottom();
      }, 18000);
      setTimeout(() => {
        setShowTyping3(true);
        scrollToBottom();
      }, 21000);
      setTimeout(() => {
        setShowTyping3(false);
        setShowMessage4(true);
        scrollToBottom();
      }, 24000);
    };

    startChat();
    const interval = setInterval(resetChat, 45000);
    return () => clearInterval(interval);
  }, [chatKey]);

  const scrollToElement = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = 80;
      const windowHeight = window.innerHeight;
      const elementHeight = element.offsetHeight;
      const additionalOffset = 40;
      
      const topOffset = elementHeight < windowHeight 
        ? (windowHeight - elementHeight) / 2 
        : 0;
      
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight - topOffset + additionalOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollToElement(id);
  };

  const scrollToTop = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formStep < 3) {
      setFormStep(formStep + 1);
      return;
    }
    
    try {
      const response = await fetch('/api/candidatures', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          type: 'etudiant',
          date: new Date().toISOString(),
          status: 'pending'
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi de la demande');
      }

      setShowConfirmation(true);
      setFormStep(0);
      setFormData({
        // Reset all form data
        firstName: '',
        lastName: '',
        age: '',
        email: '',
        phone: '',
        location: '',
        school: '',
        grade: '',
        section: '',
        average: '',
        difficulties: '',
        requestedSubjects: [],
        subjectLevels: {},
        urgencyLevel: '',
        goals: '',
        availability: {
          hoursPerWeek: '',
          preferredDays: [],
          preferredTimes: []
        },
        budget: '',
        photoLink: '',
        motivation: ''
      });

      setTimeout(() => {
        setShowConfirmation(false);
      }, 30000);
    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur est survenue lors de l\'envoi de votre demande. Veuillez réessayer.');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-violet-50">
      {/* Navigation */}
      <nav className="fixed w-full z-50 px-8 py-3 bg-white/80 backdrop-blur-xl border-b border-violet-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div onClick={scrollToTop} className="cursor-pointer">
            <Logo />
          </div>
          <div className="hidden md:flex items-center gap-12">
            <div className="flex items-center gap-8">
              <a href="#pourquoi" onClick={(e) => scrollToSection(e, 'pourquoi')} className="text-sm text-gray-500 hover:text-violet-600 transition-all duration-300">
                Pourquoi LearnToGo ?
              </a>
              <a href="#approche" onClick={(e) => scrollToSection(e, 'approche')} className="text-sm text-gray-500 hover:text-violet-600 transition-all duration-300">
                Notre approche
              </a>
              <a href="#tuteurs" onClick={(e) => scrollToSection(e, 'tuteurs')} className="text-sm text-gray-500 hover:text-violet-600 transition-all duration-300">
                L'excellence académique
              </a>
              <a href="#rejoindre" onClick={(e) => scrollToSection(e, 'rejoindre')} className="text-sm text-gray-500 hover:text-violet-600 transition-all duration-300">
                Rejoindre l'aventure
              </a>
            </div>
            <Link href="/devenir-tuteur">
              <Button variant="primary" size="sm">
                Devenir tuteur
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Introduction simple et claire */}
      <section className="min-h-screen pt-28 pb-24 px-8 bg-white flex items-center">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection animation="fadeIn">
              <div className="space-y-8">
                <div className="flex gap-4">
                  <span className="bg-violet-100 text-violet-800 text-sm font-medium px-6 py-3 rounded-full inline-flex items-center">
                    Lancement Bêta - Mi 2025
                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 text-sm font-medium px-6 py-3 rounded-full inline-flex items-center">
                    30 minutes offertes
                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
                <div>
                  <h1 className="text-6xl font-bold tracking-tight text-gray-900 mb-6">
                    Réinventer le soutien scolaire
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    L'excellence académique à portée de clic
                  </p>
                  <div className="mt-6 flex items-center gap-8">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-600">
                        <span className="font-medium" id="connexionsCount">7</span> tuteurs en ligne
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-violet-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      <span className="text-sm text-gray-600">
                        Lancement dans <span className="font-medium countdown">180</span> jours
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="flex-1 text-center justify-center"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToElement('rejoindre');
                    }}
                  >
                    Rejoindre la bêta →
                  </Button>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeIn" delay={0.2}>
              <div className="bg-white rounded-3xl shadow-xl border border-violet-100 overflow-hidden ml-8 w-[110%]">
                <div className="p-6 border-b border-violet-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-800">7 tuteurs en ligne</span>
                  </div>
                  <span className="text-sm bg-violet-100 text-violet-800 px-3 py-1 rounded-full font-medium">
                    Temps de réponse : ~5 min
                  </span>
                </div>
                
                <div className="p-8 space-y-6 h-[400px] overflow-y-auto" key={chatKey} ref={chatContainerRef}>
                  {showMessage1 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex justify-end"
                    >
                      <div className="bg-violet-50 text-gray-800 rounded-2xl rounded-tr-sm p-4 max-w-[80%]">
                        <p>Bonjour, j'ai besoin d'aide en maths 😅</p>
                      </div>
                    </motion.div>
                  )}

                  {showSystemMessage && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="flex justify-center"
                    >
                      <div className="bg-violet-100/50 text-violet-800 rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2">
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 4.75V6.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M17.1266 6.87347L16.0659 7.93413" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M19.25 12L17.75 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M17.1266 17.1265L16.0659 16.0659" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 19.25V17.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M6.87347 17.1265L7.93413 16.0659" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M4.75 12L6.25 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M6.87347 6.87347L7.93413 7.93413" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        LearnToGo recherche le meilleur tuteur pour vous...
                      </div>
                    </motion.div>
                  )}

                  {showTutorFound && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="flex justify-center"
                    >
                      <div className="bg-emerald-50 rounded-xl p-4 max-w-md w-full border border-emerald-100">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-emerald-600 font-medium">E</span>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Emma est disponible !</h4>
                            <p className="text-sm text-emerald-600">Note : 4.98/5 en mathématiques</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">
                          Étudiante à Centrale Paris, Emma excelle en mathématiques et aide régulièrement les élèves à préparer leurs examens.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {showTyping1 && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </motion.div>
                  )}
                  
                  {showMessage2 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex justify-start"
                    >
                      <div className="bg-gray-50 text-gray-800 rounded-2xl rounded-tl-sm p-4 max-w-[80%]">
                        <p>Salut ! Je suis Emma, je peux t'aider. C'est sur quel chapitre ?</p>
                      </div>
                    </motion.div>
                  )}

                  {showTyping2 && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-end"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </motion.div>
                  )}

                  {showMessage3 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex justify-end"
                    >
                      <div className="bg-violet-50 text-gray-800 rounded-2xl rounded-tr-sm p-4 max-w-[80%]">
                        <p>Les dérivées, j'ai un contrôle demain 🥲</p>
                      </div>
                    </motion.div>
                  )}

                  {showTyping3 && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </motion.div>
                  )}

                  {showMessage4 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex justify-start"
                    >
                      <div className="bg-gray-50 text-gray-800 rounded-2xl rounded-tl-sm p-4 max-w-[80%]">
                        <p>Super ! Choisis ta durée de cours</p>
                        <div className="mt-3 space-y-3">
                          <div className="bg-violet-50 rounded-xl p-3 border border-violet-100">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg className="w-5 h-5 text-violet-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                                </svg>
                              </div>
                              <div className="flex-grow">
                                <div className="flex items-center justify-between mb-2">
                                  <p className="text-sm font-medium text-violet-900">Cours de maths - Dérivées</p>
                                </div>
                                <div className="flex gap-3">
                                  <button className="flex-1 flex items-center justify-center gap-2 text-sm bg-violet-100 text-violet-600 px-3 py-2 rounded-lg hover:bg-violet-200 transition-colors">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                                      <path d="M12 6V12L8 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                                    </svg>
                                    15 min
                                  </button>
                                  <button className="flex-1 flex items-center justify-center gap-2 text-sm bg-violet-100 text-violet-600 px-3 py-2 rounded-lg hover:bg-violet-200 transition-colors">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                                      <path d="M12 6V12L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                                    </svg>
                                    30 min
                                  </button>
                                  <button className="flex-1 flex items-center justify-center gap-2 text-sm bg-violet-100 text-violet-600 px-3 py-2 rounded-lg hover:bg-violet-200 transition-colors">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                                      <path d="M12 6V12L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                                    </svg>
                                    1h
                                  </button>
                                </div>
                                <a href="#" className="text-violet-600 text-sm hover:underline mt-3 inline-block">
                                  meet.learntogo.fr/emma-derivees
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="px-8 pb-6">
                  <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 rounded-2xl p-4 shadow-sm border border-emerald-100 max-w-md mx-auto">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-emerald-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      <p className="text-emerald-600 text-sm font-bold">
                        Aussi simple que ça ! Un besoin = un tuteur disponible immédiatement
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Le Problème et Notre Solution */}
      <section id="pourquoi" className="min-h-screen py-24 px-8 bg-violet-50 flex items-center">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fadeIn">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Pourquoi LearnToGo ?</h2>
              <div className="text-xl text-gray-600 max-w-2xl mx-auto">
                <p className="mb-3">Le constat est simple : les lycéens ont souvent besoin d'aide la veille d'un contrôle ou lors de la révision d'un chapitre difficile.</p>
                <p>Les solutions traditionnelles de soutien scolaire ne répondent pas à ce besoin d'instantanéité.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Solutions actuelles</h3>
                
                <div className="space-y-6">
                  <div className="bg-red-50 rounded-2xl p-6">
                    <h4 className="font-semibold text-gray-800 mb-4">Tarification et engagement</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-gray-600">
                        <span>Prix par heure</span>
                        <span className="font-medium">35-50€/h</span>
                      </div>
                      <div className="flex items-center justify-between text-gray-600">
                        <span>Délai de réservation</span>
                        <span className="font-medium">24-48h</span>
                      </div>
                      <div className="flex items-center justify-between text-gray-600">
                        <span>Durée minimum</span>
                        <span className="font-medium">1h</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-50 rounded-2xl p-6">
                    <h4 className="font-semibold text-gray-800 mb-4">Contraintes</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="text-red-500 text-xl">✕</span>
                        <p className="text-gray-600">Engagement sur plusieurs mois</p>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-red-500 text-xl">✕</span>
                        <p className="text-gray-600">Frais d'inscription élevés</p>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-red-500 text-xl">✕</span>
                        <p className="text-gray-600">Pas de garantie de qualité</p>
          </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">LearnToGo</h3>
                
                <div className="space-y-6">
                  <div className="bg-emerald-50 rounded-2xl p-6">
                    <h4 className="font-semibold text-gray-800 mb-4">Tarification flexible</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-gray-600">
                        <span>Prix par 15 minutes</span>
                        <span className="font-medium">5€</span>
                      </div>
                      <div className="flex items-center justify-between text-gray-600">
                        <span>Délai de connexion</span>
                        <span className="font-medium">5 min</span>
                      </div>
                      <div className="flex items-center justify-between text-gray-600">
                        <span>Durée minimum</span>
                        <span className="font-medium">15 min</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-emerald-50 rounded-2xl p-6">
                    <h4 className="font-semibold text-gray-800 mb-4">Avantages</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="text-emerald-500 text-xl">✓</span>
                        <p className="text-gray-600">Sans engagement</p>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-emerald-500 text-xl">✓</span>
                        <p className="text-gray-600">7 jours d'essai pour 1€</p>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-emerald-500 text-xl">✓</span>
                        <p className="text-gray-600">Excellence garantie</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-16 max-w-3xl mx-auto">
              <div className="bg-gradient-to-r from-violet-50 via-white to-violet-50 rounded-3xl p-8 shadow-sm border border-violet-100 text-center">
                <h3 className="text-2xl font-bold text-violet-900 mb-3">Notre mission</h3>
                <p className="text-xl text-gray-700 leading-relaxed">
                  Rendre le soutien scolaire <span className="text-violet-700 font-medium">accessible</span>, 
                  <span className="text-violet-700 font-medium"> flexible</span> et 
                  <span className="text-violet-700 font-medium"> efficace</span> pour tous les lycéens.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Notre approche */}
      <section id="approche" className="min-h-screen py-24 px-8 bg-white flex items-center">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fadeIn">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Notre approche</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Une technologie au service de votre apprentissage
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-violet-100 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-violet-100 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-violet-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Décris ton besoin</h3>
                <p className="text-gray-600">
                  Explique ta difficulté et la matière concernée. Notre IA analyse ton besoin pour un matching optimal.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg border border-violet-100 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-violet-100 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-violet-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Matching intelligent</h3>
                <p className="text-gray-600">
                  Notre algorithme trouve le tuteur parfait selon ton profil et tes besoins spécifiques.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg border border-violet-100 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-violet-100 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-violet-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Démarre ton cours</h3>
                <p className="text-gray-600">
                  Connecte-toi avec ton tuteur et commence ta session personnalisée immédiatement.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Nos Tuteurs */}
      <section id="tuteurs" className="min-h-screen py-24 px-8 bg-gradient-to-br from-violet-50 via-white to-violet-50 flex items-center">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fadeIn">
            <div className="text-center mb-20">
              <span className="text-violet-600 font-semibold text-sm tracking-wider uppercase mb-4 block">Nos tuteurs</span>
              <h2 className="text-4xl font-bold mb-6">L'excellence académique</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Nos tuteurs sont rigoureusement sélectionnés parmi les meilleurs étudiants des grandes écoles
              </p>
            </div>

            {/* Bannière des écoles avec effet de dégradé sur les côtés */}
            <div className="relative mb-16">
              <div className="absolute left-0 w-32 h-full bg-gradient-to-r from-violet-50 to-transparent z-10"></div>
              <div className="absolute right-0 w-32 h-full bg-gradient-to-l from-violet-50 to-transparent z-10"></div>
              <div className="overflow-hidden">
                <div className="flex animate-infinite-scroll">
                  {[
                    { name: "Centrale Paris", url: "https://www.centralesupelec.fr/" },
                    { name: "École Polytechnique", url: "https://www.polytechnique.edu/" },
                    { name: "HEC Paris", url: "https://www.hec.edu/" },
                    { name: "Sciences Po Paris", url: "https://www.sciencespo.fr/" },
                    { name: "ENS Ulm", url: "https://www.ens.psl.eu/" },
                    { name: "ESSEC", url: "https://www.essec.edu/" },
                    { name: "ESCP", url: "https://escp.eu/" },
                    { name: "Mines Paris", url: "https://www.minesparis.psl.eu/" },
                    { name: "École des Ponts", url: "https://www.ecoledesponts.fr/" },
                    { name: "Paris-Saclay", url: "https://www.universite-paris-saclay.fr/" },
                    { name: "Oxford University", url: "https://www.ox.ac.uk/" },
                    { name: "Cambridge University", url: "https://www.cam.ac.uk/" },
                    { name: "ETH Zürich", url: "https://ethz.ch/" },
                    { name: "EPFL", url: "https://www.epfl.ch/" },
                    { name: "Imperial College London", url: "https://www.imperial.ac.uk/" }
                  ].map((school, index) => (
                    <a 
                      key={`${school.name}-${index}`}
                      href={school.url}
            target="_blank"
            rel="noopener noreferrer"
                      className="inline-block px-8 text-lg font-medium text-gray-600 transition-all hover:text-violet-600"
                    >
                      {school.name}
                    </a>
                  ))}
                  {[
                    { name: "Centrale Paris", url: "https://www.centralesupelec.fr/" },
                    { name: "École Polytechnique", url: "https://www.polytechnique.edu/" },
                    { name: "HEC Paris", url: "https://www.hec.edu/" },
                    { name: "Sciences Po Paris", url: "https://www.sciencespo.fr/" },
                    { name: "ENS Ulm", url: "https://www.ens.psl.eu/" },
                    { name: "ESSEC", url: "https://www.essec.edu/" },
                    { name: "ESCP", url: "https://escp.eu/" },
                    { name: "Mines Paris", url: "https://www.minesparis.psl.eu/" },
                    { name: "École des Ponts", url: "https://www.ecoledesponts.fr/" },
                    { name: "Paris-Saclay", url: "https://www.universite-paris-saclay.fr/" },
                    { name: "Oxford University", url: "https://www.ox.ac.uk/" },
                    { name: "Cambridge University", url: "https://www.cam.ac.uk/" },
                    { name: "ETH Zürich", url: "https://ethz.ch/" },
                    { name: "EPFL", url: "https://www.epfl.ch/" },
                    { name: "Imperial College London", url: "https://www.imperial.ac.uk/" }
                  ].map((school, index) => (
                    <a 
                      key={`${school.name}-repeat-${index}`}
                      href={school.url}
            target="_blank"
            rel="noopener noreferrer"
                      className="inline-block px-8 text-lg font-medium text-gray-600 transition-all hover:text-violet-600"
                    >
                      {school.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Processus de sélection */}
            <div className="mb-16">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-xl transition-all duration-300 border border-violet-100">
                  <div className="w-12 h-12 bg-violet-100 rounded-2xl flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-violet-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">Vérification des diplômes</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Nous vérifions rigoureusement le parcours académique et les diplômes de chaque candidat pour garantir leur excellence
                  </p>
                </div>

                <div className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-xl transition-all duration-300 border border-violet-100">
                  <div className="w-12 h-12 bg-violet-100 rounded-2xl flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-violet-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 6V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">Test de compétences</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Évaluation approfondie des connaissances dans les matières enseignées pour assurer un niveau d'excellence
                  </p>
                </div>

                <div className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-xl transition-all duration-300 border border-violet-100">
                  <div className="w-12 h-12 bg-violet-100 rounded-2xl flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-violet-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 8H19C20.1046 8 21 8.89543 21 10V16C21 17.1046 20.1046 18 19 18H5C3.89543 18 3 17.1046 3 16V10C3 8.89543 3.89543 8 5 8H7M17 8V6C17 4.89543 16.1046 4 15 4H9C7.89543 4 7 4.89543 7 6V8M17 8H7" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">Entretien pédagogique</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Évaluation des capacités d'enseignement et de la pédagogie pour garantir une transmission efficace du savoir
                  </p>
                </div>
              </div>
            </div>

            {/* Statistiques */}
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-xl transition-all duration-300 border border-violet-100 text-center">
                <div className="text-5xl font-bold text-violet-600 mb-4">30%</div>
                <p className="text-gray-600 font-medium">Taux de sélection des candidats</p>
              </div>
              
              <div className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-xl transition-all duration-300 border border-violet-100 text-center">
                <div className="text-5xl font-bold text-violet-600 mb-4">4.9/5</div>
                <p className="text-gray-600 font-medium">Note moyenne des tuteurs</p>
              </div>
              
              <div className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-xl transition-all duration-300 border border-violet-100 text-center">
                <div className="text-5xl font-bold text-violet-600 mb-4">98%</div>
                <p className="text-gray-600 font-medium">Taux de satisfaction des élèves</p>
              </div>
            </div>

            {/* Section Excellence académique */}
            <div className="grid grid-cols-3 gap-8 mb-8">
              {/* ... contenu existant des cartes de sélection ... */}
            </div>

            <div className="bg-gradient-to-r from-violet-600 to-violet-500 rounded-3xl p-10 text-center max-w-3xl mx-auto">
              <h3 className="text-3xl font-bold text-white mb-4">Seuls les meilleurs deviennent tuteurs<br/>LearnToGo</h3>
              <p className="text-lg text-white/90">Notre processus de sélection rigoureux garantit l'excellence de nos tuteurs</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Final + Newsletter */}
      <section id="rejoindre" className="min-h-screen py-24 px-8 bg-violet-50 flex items-center">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fadeIn">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Rejoignez l'aventure</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Faites partie des premiers à révolutionner le soutien scolaire
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-16">
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6">Je suis étudiant</h3>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <span className="text-emerald-500 text-xl">✓</span>
                    <p className="text-gray-600">30 minutes de cours offertes</p>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-emerald-500 text-xl">✓</span>
                    <p className="text-gray-600">Accès prioritaire à l'app en 2025</p>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-emerald-500 text-xl">✓</span>
                    <p className="text-gray-600">-20% à vie sur tous les cours</p>
                  </li>
                </ul>

                {formStep === 0 ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                      type="email"
                      placeholder="Ton email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-6 py-4 rounded-xl border border-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                      required
                    />
                    <Button variant="primary" className="w-full py-4">
                      Je m'inscris à la bêta →
                    </Button>
                  </form>
                ) : formStep === 1 ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h4 className="font-medium mb-4">Informations personnelles</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <input 
                        type="text"
                        placeholder="Prénom"
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        className="px-4 py-3 rounded-xl border border-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                        required
                      />
                      <input 
                        type="text"
                        placeholder="Nom"
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className="px-4 py-3 rounded-xl border border-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                        required
                      />
                    </div>
                    <input 
                      type="tel"
                      placeholder="Téléphone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                      required
                    />
                    <input 
                      type="text"
                      placeholder="Ville"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                      required
                    />
                    <div className="flex justify-between gap-4">
                      <Button 
                        variant="secondary" 
                        className="flex-1"
                        onClick={() => setFormStep(0)}
                      >
                        Retour
                      </Button>
                      <Button variant="primary" className="flex-1">
                        Suivant →
                      </Button>
                    </div>
                  </form>
                ) : formStep === 2 ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h4 className="font-medium mb-4">Scolarité</h4>
                    <input 
                      type="text"
                      placeholder="Établissement"
                      value={formData.school}
                      onChange={(e) => setFormData({...formData, school: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                      required
                    />
                    <select
                      value={formData.grade}
                      onChange={(e) => setFormData({...formData, grade: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                      required
                    >
                      <option value="">Niveau</option>
                      <option value="seconde">Seconde</option>
                      <option value="premiere">Première</option>
                      <option value="terminale">Terminale</option>
                    </select>
                    <select
                      value={formData.section}
                      onChange={(e) => setFormData({...formData, section: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                      required
                    >
                      <option value="">Section</option>
                      <option value="generale">Générale</option>
                      <option value="technologique">Technologique</option>
                    </select>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-600">Matières souhaitées (obligatoire)</label>
                      <div className="grid grid-cols-2 gap-3">
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={formData.requestedSubjects.includes('mathematiques')}
                            onChange={(e) => {
                              const newSubjects = e.target.checked 
                                ? [...formData.requestedSubjects, 'mathematiques']
                                : formData.requestedSubjects.filter(s => s !== 'mathematiques');
                              setFormData({...formData, requestedSubjects: newSubjects});
                            }}
                            className="rounded border-violet-200 text-violet-600 focus:ring-violet-500"
                          />
                          Mathématiques
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={formData.requestedSubjects.includes('physique-chimie')}
                            onChange={(e) => {
                              const newSubjects = e.target.checked 
                                ? [...formData.requestedSubjects, 'physique-chimie']
                                : formData.requestedSubjects.filter(s => s !== 'physique-chimie');
                              setFormData({...formData, requestedSubjects: newSubjects});
                            }}
                            className="rounded border-violet-200 text-violet-600 focus:ring-violet-500"
                          />
                          Physique-Chimie
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={formData.requestedSubjects.includes('svt')}
                            onChange={(e) => {
                              const newSubjects = e.target.checked 
                                ? [...formData.requestedSubjects, 'svt']
                                : formData.requestedSubjects.filter(s => s !== 'svt');
                              setFormData({...formData, requestedSubjects: newSubjects});
                            }}
                            className="rounded border-violet-200 text-violet-600 focus:ring-violet-500"
                          />
                          SVT
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={formData.requestedSubjects.includes('ses')}
                            onChange={(e) => {
                              const newSubjects = e.target.checked 
                                ? [...formData.requestedSubjects, 'ses']
                                : formData.requestedSubjects.filter(s => s !== 'ses');
                              setFormData({...formData, requestedSubjects: newSubjects});
                            }}
                            className="rounded border-violet-200 text-violet-600 focus:ring-violet-500"
                          />
                          SES
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={formData.requestedSubjects.includes('hggsp')}
                            onChange={(e) => {
                              const newSubjects = e.target.checked 
                                ? [...formData.requestedSubjects, 'hggsp']
                                : formData.requestedSubjects.filter(s => s !== 'hggsp');
                              setFormData({...formData, requestedSubjects: newSubjects});
                            }}
                            className="rounded border-violet-200 text-violet-600 focus:ring-violet-500"
                          />
                          HGGSP
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={formData.requestedSubjects.includes('anglais')}
                            onChange={(e) => {
                              const newSubjects = e.target.checked 
                                ? [...formData.requestedSubjects, 'anglais']
                                : formData.requestedSubjects.filter(s => s !== 'anglais');
                              setFormData({...formData, requestedSubjects: newSubjects});
                            }}
                            className="rounded border-violet-200 text-violet-600 focus:ring-violet-500"
                          />
                          Anglais
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={formData.requestedSubjects.includes('francais')}
                            onChange={(e) => {
                              const newSubjects = e.target.checked 
                                ? [...formData.requestedSubjects, 'francais']
                                : formData.requestedSubjects.filter(s => s !== 'francais');
                              setFormData({...formData, requestedSubjects: newSubjects});
                            }}
                            className="rounded border-violet-200 text-violet-600 focus:ring-violet-500"
                          />
                          Français
                        </label>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-600">Difficultés rencontrées (optionnel)</label>
                      <textarea
                        placeholder="Décris tes difficultés si tu le souhaites..."
                        value={formData.difficulties}
                        onChange={(e) => setFormData({...formData, difficulties: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                        rows={3}
                      />
                    </div>
                    <div className="flex justify-between gap-4">
                      <Button 
                        variant="secondary" 
                        className="flex-1"
                        onClick={() => setFormStep(1)}
                      >
                        Retour
                      </Button>
                      <Button variant="primary" className="flex-1">
                        Suivant →
                      </Button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h4 className="font-medium mb-4">Objectifs et urgence</h4>
                    <select
                      value={formData.urgencyLevel}
                      onChange={(e) => setFormData({...formData, urgencyLevel: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                      required
                    >
                      <option value="">Niveau d'urgence</option>
                      <option value="faible">Pas urgent</option>
                      <option value="moyen">Moyennement urgent</option>
                      <option value="eleve">Très urgent</option>
                    </select>
                    <textarea
                      placeholder="Objectifs (ex: améliorer mes notes, préparer un contrôle...)"
                      value={formData.goals}
                      onChange={(e) => setFormData({...formData, goals: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                      rows={3}
                      required
                    />
                    <div className="flex justify-between gap-4">
                      <Button 
                        variant="secondary" 
                        className="flex-1"
                        onClick={() => setFormStep(2)}
                      >
                        Retour
                      </Button>
                      <Button variant="primary" className="flex-1">
                        Terminer →
                      </Button>
                    </div>
                  </form>
                )}

                {showConfirmation && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-6 bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center"
                  >
                    <p className="text-emerald-800 font-medium">
                      Merci de vous être inscrit à la bêta ! Nous vous tiendrons informé du lancement.
                    </p>
                  </motion.div>
                )}
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6">Je suis tuteur</h3>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <span className="text-emerald-500 text-xl">✓</span>
                    <p className="text-gray-600">Rémunération attractive (jusqu'à 1000€/mois)</p>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-emerald-500 text-xl">✓</span>
                    <p className="text-gray-600">Flexibilité totale des horaires</p>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-emerald-500 text-xl">✓</span>
                    <p className="text-gray-600">Formation et accompagnement personnalisés</p>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-emerald-500 text-xl">✓</span>
                    <p className="text-gray-600">Bonus de performance et primes mensuelles</p>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-emerald-500 text-xl">✓</span>
                    <p className="text-gray-600">Communauté d'excellence et networking</p>
                  </li>
                </ul>
                <Link
                  href="/devenir-tuteur"
                  className="inline-flex items-center gap-2 px-6 py-3 text-white bg-violet-600 rounded-xl hover:bg-violet-700 transition-colors w-full justify-center"
                >
                  Postuler maintenant →
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-8 bg-gradient-to-br from-violet-50/50 via-white to-violet-50/50 border-t border-violet-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-12">
            {/* Section supérieure */}
            <div className="flex justify-between items-start">
              <div className="space-y-6">
                <div onClick={scrollToTop} className="cursor-pointer">
                  <Logo />
                </div>
                <p className="text-sm text-gray-500 max-w-xs">
                  Trouvez un tuteur d'excellence en 5 minutes, à n'importe quelle heure.
                </p>
                <div className="flex items-center gap-4">
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-violet-100 hover:bg-violet-200 flex items-center justify-center transition-all">
                    <svg className="w-5 h-5 text-violet-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 4.01C21 4.5 20.02 4.69 19 4.82C20.07 4.19 20.76 3.13 21.08 1.96C20.1 2.54 19.02 2.96 17.88 3.17C16.97 2.13 15.62 1.5 14.15 1.5C11.29 1.5 8.98 3.81 8.98 6.67C8.98 7.08 9.03 7.48 9.11 7.87C4.82 7.65 1.11 5.61 -1.75 2.61C-2.63 3.68 -3 4.75 -3 6C-3 8.08 -1.14 9.88 0.33 10.89C-0.58 10.86 -1.44 10.61 -2.23 10.21V10.27C-2.23 12.82 -0.44 14.95 1.5 15.43C1.09 15.54 0.67 15.6 0.24 15.6C-0.07 15.6 -0.37 15.57 -0.67 15.51C-0.06 17.6 1.82 19.15 4.06 19.19C2.31 20.64 0.14 21.5 -2.22 21.5C-2.61 21.5 -3 21.48 -3.38 21.44C-1.13 22.97 1.55 23.87 4.43 23.87C14.15 23.87 19.51 15.69 19.51 8.57C19.51 8.34 19.51 8.11 19.5 7.88C20.5 7.16 21.32 6.25 22 5.21V4.01Z" fill="currentColor"/>
                    </svg>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-violet-100 hover:bg-violet-200 flex items-center justify-center transition-all">
                    <svg className="w-5 h-5 text-violet-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" fill="currentColor"/>
                      <path d="M6 9H2V21H6V9Z" fill="currentColor"/>
                      <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" fill="currentColor"/>
                    </svg>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-violet-100 hover:bg-violet-200 flex items-center justify-center transition-all">
                    <svg className="w-5 h-5 text-violet-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="currentColor"/>
                      <path d="M17.5 0H6.5C2.91015 0 0 2.91015 0 6.5V17.5C0 21.0899 2.91015 24 6.5 24H17.5C21.0899 24 24 21.0899 24 17.5V6.5C24 2.91015 21.0899 0 17.5 0ZM12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18ZM19 6C18.4477 6 18 5.55228 18 5C18 4.44772 18.4477 4 19 4C19.5523 4 20 4.44772 20 5C20 5.55228 19.5523 6 19 6Z" fill="currentColor"/>
                    </svg>
                  </a>
                </div>
              </div>
              <div className="flex gap-24">
                <div className="space-y-6">
                  <h4 className="font-medium text-gray-900">Navigation</h4>
                  <div className="flex flex-col gap-3">
                    <a href="#pourquoi" 
                      onClick={(e) => scrollToSection(e, 'pourquoi')} 
                      className="text-sm text-gray-500 hover:text-violet-600 transition-colors"
                    >
                      Pourquoi LearnToGo ?
                    </a>
                    <a href="#approche" 
                      onClick={(e) => scrollToSection(e, 'approche')} 
                      className="text-sm text-gray-500 hover:text-violet-600 transition-colors"
                    >
                      Notre approche
                    </a>
                    <a href="#tuteurs" 
                      onClick={(e) => scrollToSection(e, 'tuteurs')} 
                      className="text-sm text-gray-500 hover:text-violet-600 transition-colors"
                    >
                      L'excellence académique
                    </a>
                    <a href="#rejoindre" 
                      onClick={(e) => scrollToSection(e, 'rejoindre')} 
                      className="text-sm text-gray-500 hover:text-violet-600 transition-colors"
                    >
                      Rejoindre l'aventure
                    </a>
                  </div>
                </div>
                <div className="space-y-6">
                  <h4 className="font-medium text-gray-900">Contact</h4>
                  <div className="flex flex-col gap-3">
                    <a href="mailto:mathis@astry.agency" className="text-sm text-gray-500 hover:text-violet-600 transition-colors">mathis@astry.agency</a>
                    <a href="tel:+33766031166" className="text-sm text-gray-500 hover:text-violet-600 transition-colors">+33 7 66 03 11 66</a>
                    <span className="text-sm text-gray-500">Paris, France</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Section inférieure */}
            <div className="flex justify-between items-center pt-8 border-t border-violet-100">
              <p className="text-sm text-gray-500">© 2024 LearnToGo. Tous droits réservés.</p>
              <div className="flex items-center gap-6">
                <a href="#" className="text-sm text-gray-500 hover:text-violet-600 transition-colors">Mentions légales</a>
                <a href="#" className="text-sm text-gray-500 hover:text-violet-600 transition-colors">CGU</a>
                <a href="https://astry.agency" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-violet-600 transition-colors">
                  Powered by Astry Agency
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

