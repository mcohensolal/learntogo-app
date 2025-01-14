'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
  children?: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  icon?: ReactNode;
  title?: string;
  subtitle?: string;
}

export default function Card({
  children,
  className = '',
  hover = true,
  onClick,
  icon,
  title,
  subtitle
}: CardProps) {
  return (
    <motion.div
      className={`
        relative overflow-hidden bg-white rounded-xl p-6
        ${hover ? 'hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1' : ''}
        ${className}
      `}
      whileHover={hover ? { scale: 1.02 } : {}}
      onClick={onClick}
    >
      {/* Effet de brillance au hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
        style={{
          opacity: 0,
          transform: 'translateX(-100%)',
        }}
        whileHover={{
          opacity: 0.1,
          transform: 'translateX(100%)',
          transition: { duration: 0.8 }
        }}
      />

      {/* Contenu de la carte */}
      <div className="relative z-10">
        {icon && (
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            className="text-primary text-3xl mb-4"
          >
            {icon}
          </motion.div>
        )}
        
        {title && (
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {title}
          </h3>
        )}
        
        {subtitle && (
          <p className="text-gray-600 text-sm mb-4">
            {subtitle}
          </p>
        )}
        
        {children}
      </div>

      {/* Bordure animée */}
      <motion.div
        className="absolute inset-0 border-2 border-primary rounded-xl"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.1 }}
      />
    </motion.div>
  );
} 