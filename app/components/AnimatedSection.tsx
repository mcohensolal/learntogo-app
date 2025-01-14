'use client';

import { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: 'fadeIn' | 'slideIn';
  delay?: number;
}

export function AnimatedSection({ children, animation = 'fadeIn', delay = 0 }: AnimatedSectionProps) {
  const animationClasses = {
    fadeIn: 'animate-fade-in',
    slideIn: 'animate-slide-in'
  };

  const style = {
    animationDelay: `${delay}s`
  };

  return (
    <div className={animationClasses[animation]} style={style}>
      {children}
    </div>
  );
} 