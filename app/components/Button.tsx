'use client';

import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'secondary';
  size?: 'sm' | 'lg';
  className?: string;
}

export function Button({ variant = 'primary', size, className = '', ...props }: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors duration-300 rounded-xl';
  
  const variants = {
    primary: 'bg-violet-600 text-white hover:bg-violet-700',
    outline: 'border-2 border-violet-600 text-violet-600 hover:bg-violet-50',
    secondary: 'bg-violet-100 text-violet-600 hover:bg-violet-200'
  };

  const sizes = {
    sm: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3'
  };

  const variantStyles = variants[variant];
  const sizeStyles = size ? sizes[size] : sizes.lg;

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
      {...props}
    />
  );
} 