'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

// Utility function for intersection observer animations
const useIntersectionObserver = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};

// Header Component
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass backdrop-blur-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-neon rounded-lg flex items-center justify-center">
              <span className="text-dark-bg font-bold text-lg">L</span>
            </div>
            <span className="text-xl font-bold font-space-grotesk">LearnToGo</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#pourquoi" className="text-text-secondary hover:text-text-primary transition-colors">
              Pourquoi LearnToGo
            </a>
            <a href="#approche" className="text-text-secondary hover:text-text-primary transition-colors">
              Notre approche
            </a>
            <button className="btn-outline text-sm">
              Rejoindre la bêta
            </button>
          </div>
          
          <button className="md:hidden text-text-primary">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
};

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative bg-gradient-dark bg-glow">
      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left animate-fadeInUp">
          <h1 className="text-4xl md:text-6xl font-bold font-space-grotesk mb-6 leading-tight">
            Le soutien scolaire,{' '}
            <span className="bg-gradient-neon bg-clip-text text-transparent">
              repensé pour ta génération.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary mb-8 leading-relaxed">
            Apprends instantanément avec les meilleurs étudiants. Gratuitement, sans engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="btn-primary px-8 py-4 text-lg">
              Rejoindre la bêta
            </button>
            <button className="btn-outline px-8 py-4 text-lg">
              Découvrir comment ça marche
            </button>
          </div>
        </div>
        
        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            <div className="w-64 h-96 md:w-80 md:h-[500px] bg-gradient-glass glass rounded-3xl p-6 animate-float">
              <div className="w-full h-full bg-dark-bg-secondary rounded-2xl flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-glass-border">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-neon-green rounded-full"></div>
                    <span className="text-sm font-medium">Tuteur disponible</span>
                  </div>
                  <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                </div>
                <div className="flex-1 p-4 space-y-4">
                  <div className="bg-glass rounded-lg p-3">
                    <p className="text-sm text-text-secondary">Je n&apos;arrive pas à résoudre cette équation du second degré...</p>
                  </div>
                  <div className="bg-neon-blue/20 rounded-lg p-3 ml-8">
                    <p className="text-sm">Pas de souci ! On va décomposer ça ensemble. Quelle est ton équation exactement ?</p>
                  </div>
                  <div className="bg-glass rounded-lg p-3">
                    <p className="text-sm text-text-secondary">2x² - 8x + 6 = 0</p>
                  </div>
                  <div className="bg-neon-blue/20 rounded-lg p-3 ml-8">
                    <p className="text-sm">Perfect ! On peut factoriser : 2(x² - 4x + 3) = 0...</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-neon-green/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-neon-blue/20 rounded-full blur-xl animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Problem Section Component
const ProblemSection = () => {
  const problems = [
    {
      icon: '💰',
      title: 'Cher et rigide',
      description: '40€/h, à planifier à l\'avance'
    },
    {
      icon: '🕐',
      title: 'Pas dispo quand t\'en as besoin',
      description: 'Besoin d\'aide à 22h ? Bonne chance'
    },
    {
      icon: '❌',
      title: 'Pas toujours utile',
      description: 'Visios trop longues, sans lien avec ton problème'
    }
  ];

  return (
    <section id="pourquoi" className="py-20 bg-dark-bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-3xl md:text-5xl font-bold font-space-grotesk mb-6">
            Le soutien scolaire est devenu{' '}
            <span className="text-red-400">un luxe.</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <div key={index} className="fade-in glass rounded-2xl p-8 text-center hover:bg-glass-border transition-all duration-300">
              <div className="text-4xl mb-4">{problem.icon}</div>
              <h3 className="text-xl font-semibold font-space-grotesk mb-3 text-text-primary">
                {problem.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Solution Section Component
const SolutionSection = () => {
  return (
    <section className="py-20 bg-gradient-dark relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="slide-in-left">
            <h2 className="text-3xl md:text-5xl font-bold font-space-grotesk mb-6">
              <span className="bg-gradient-neon bg-clip-text text-transparent">
                LearnToGo,
              </span>{' '}
              la bonne réponse au bon moment.
            </h2>
            <p className="text-lg text-text-secondary mb-8 leading-relaxed">
              Matching intelligent, réponse rapide, humaine et claire. 24h/24.
            </p>
            <button className="btn-primary px-8 py-4">
              Découvrir notre approche
            </button>
          </div>
          
          <div className="slide-in-right">
            <div className="glass rounded-3xl p-8 relative">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse"></div>
                  <span className="text-sm text-text-secondary">Connexion instantanée</span>
                </div>
                
                <div className="bg-dark-bg rounded-xl p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-neon rounded-full"></div>
                    <span className="font-medium">Sarah - ENS Ulm</span>
                    <span className="text-xs bg-neon-green/20 text-neon-green px-2 py-1 rounded-full">
                      En ligne
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary">
                    Spécialiste en mathématiques • Note 4.9/5 • 200+ élèves aidés
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center space-x-2 bg-neon-green/10 rounded-lg px-4 py-2">
                    <span className="text-neon-green text-sm font-medium">Temps de réponse moyen</span>
                    <span className="text-neon-green font-bold">2 min</span>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-2 -right-2 w-16 h-16 bg-neon-blue/20 rounded-full blur-md animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Steps Section Component
const StepsSection = () => {
  const steps = [
    {
      number: '01',
      title: 'Tu décris ton problème.',
      description: 'Prends une photo, écris ta question, on s\'occupe du reste.'
    },
    {
      number: '02',
      title: 'On te connecte à un tuteur dispo immédiatement.',
      description: 'Matching intelligent basé sur ta matière et ton niveau.'
    },
    {
      number: '03',
      title: 'Tu reçois une réponse claire et rapide.',
      description: 'Explication personnalisée, exemples concrets, suivi si besoin.'
    }
  ];

  return (
    <section id="approche" className="py-20 bg-dark-bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-3xl md:text-5xl font-bold font-space-grotesk mb-6">
            <span className="bg-gradient-neon bg-clip-text text-transparent">3 étapes</span> simples
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="fade-in text-center group">
              <div className="glass rounded-2xl p-8 hover:bg-glass-border transition-all duration-300 relative">
                <div className="text-6xl font-bold text-neon-blue/30 mb-4 font-space-grotesk">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold font-space-grotesk mb-4 text-text-primary">
                  {step.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {step.description}
                </p>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-neon-blue to-transparent"></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Tutors Section Component
const TutorsSection = () => {
  const schools = [
    { name: 'ENS', logo: 'E' },
    { name: 'X', logo: 'X' },
    { name: 'HEC', logo: 'H' },
    { name: 'Sciences Po', logo: 'S' }
  ];

  const stats = [
    { value: 'Top 5%', label: 'Sélectionnés dans le' },
    { value: '4.9/5', label: 'Note moyenne' },
    { value: '100%', label: 'Bienveillance' }
  ];

  const testimonials = [
    {
      name: 'Emma, Terminale S',
      content: 'J\'ai eu ma réponse en 3 minutes à 23h. Impossible avec un prof particulier !',
      avatar: 'E'
    },
    {
      name: 'Lucas, 1ère ES',
      content: 'Les explications sont claires et adaptées à mon niveau. Je comprends enfin !',
      avatar: 'L'
    }
  ];

  return (
    <section className="py-20 bg-gradient-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-3xl md:text-5xl font-bold font-space-grotesk mb-6">
            Des tuteurs{' '}
            <span className="bg-gradient-neon bg-clip-text text-transparent">
              d&apos;exception
            </span>
          </h2>
        </div>
        
        {/* Schools */}
        <div className="flex justify-center items-center space-x-8 mb-16 fade-in">
          {schools.map((school, index) => (
            <div key={index} className="glass rounded-lg w-16 h-16 flex items-center justify-center">
              <span className="text-xl font-bold text-neon-blue">{school.logo}</span>
            </div>
          ))}
        </div>
        
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="fade-in text-center">
              <div className="text-3xl md:text-4xl font-bold text-neon-green font-space-grotesk mb-2">
                {stat.value}
              </div>
              <div className="text-text-secondary">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        
        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="fade-in glass rounded-2xl p-6">
              <p className="text-text-secondary mb-4 italic">
                &quot;{testimonial.content}&quot;
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-neon rounded-full flex items-center justify-center">
                  <span className="text-dark-bg font-bold">{testimonial.avatar}</span>
                </div>
                <span className="text-text-primary font-medium">
                  {testimonial.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Free Offer Section Component
const FreeOfferSection = () => {
  return (
    <section className="py-20 bg-dark-bg-secondary relative">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="fade-in">
          <h2 className="text-3xl md:text-5xl font-bold font-space-grotesk mb-6">
            Commence{' '}
            <span className="bg-gradient-neon bg-clip-text text-transparent">
              gratuitement.
            </span>
          </h2>
          <p className="text-lg text-text-secondary mb-8 leading-relaxed">
            30 minutes offertes sans CB. Juste pour t&apos;aider.
          </p>
          <button className="btn-primary px-12 py-4 text-lg neon-glow">
            Créer mon compte gratuitement
          </button>
        </div>
      </div>
    </section>
  );
};

// Tutor CTA Section Component
const TutorCTASection = () => {
  return (
    <section className="py-20 bg-gradient-dark">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="fade-in">
          <h2 className="text-3xl md:text-5xl font-bold font-space-grotesk mb-6">
            Deviens tuteur{' '}
            <span className="bg-gradient-neon bg-clip-text text-transparent">
              LearnToGo
            </span>
          </h2>
          <p className="text-lg text-text-secondary mb-8 leading-relaxed">
            Tu es en école top niveau ? Transmets ton savoir à ton rythme.
          </p>
          <button className="btn-outline px-8 py-4 text-lg">
            Candidater comme tuteur
          </button>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="py-12 bg-dark-bg border-t border-glass-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-neon rounded-lg flex items-center justify-center">
              <span className="text-dark-bg font-bold text-lg">L</span>
            </div>
            <span className="text-xl font-bold font-space-grotesk">LearnToGo</span>
          </div>
          
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-text-secondary hover:text-text-primary transition-colors">
              Mentions légales
            </a>
            <a href="#" className="text-text-secondary hover:text-text-primary transition-colors">
              Candidater
            </a>
            <a href="#" className="text-text-secondary hover:text-text-primary transition-colors">
              Contact
            </a>
          </div>
          
          <div className="flex justify-end items-center space-x-4">
            <span className="text-text-secondary">mathis@astry.agency</span>
            <div className="flex space-x-3">
              <a href="#" className="w-8 h-8 glass rounded-lg flex items-center justify-center hover:bg-glass-border transition-colors">
                <span className="text-sm">Li</span>
              </a>
              <a href="#" className="w-8 h-8 glass rounded-lg flex items-center justify-center hover:bg-glass-border transition-colors">
                <span className="text-sm">Ig</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main Page Component
export default function Home() {
  useIntersectionObserver();

  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <StepsSection />
      <TutorsSection />
      <FreeOfferSection />
      <TutorCTASection />
      <Footer />
    </main>
  );
}

