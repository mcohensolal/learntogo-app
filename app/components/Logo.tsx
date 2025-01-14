'use client';

interface LogoProps {
  className?: string;
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        className="w-8 h-8"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Graduation cap base */}
        <path
          d="M2 9L12 4L22 9L12 14L2 9Z"
          className="fill-violet-600"
        />
        
        {/* Graduation cap string */}
        <path
          d="M22 9V16"
          className="stroke-violet-600"
          strokeWidth="2"
          strokeLinecap="round"
        />
        
        {/* Book pages */}
        <path
          d="M7 10.5V16.5C7 16.5 9 15 12 15C15 15 17 16.5 17 16.5V10.5"
          className="stroke-violet-600"
          strokeWidth="2"
          strokeLinecap="round"
        />
        
        {/* Connection dots */}
        <circle cx="12" cy="15" r="1" className="fill-violet-600" />
        <circle cx="9" cy="16" r="1" className="fill-violet-600" />
        <circle cx="15" cy="16" r="1" className="fill-violet-600" />
      </svg>
      <span className="text-xl font-bold tracking-tight">
        LearnToGo
      </span>
    </div>
  );
} 