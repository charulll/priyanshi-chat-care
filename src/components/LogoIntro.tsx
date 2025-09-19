import { useEffect, useState } from 'react';

interface LogoIntroProps {
  onComplete: () => void;
}

const LogoIntro = ({ onComplete }: LogoIntroProps) => {
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    // Start logo animation after a brief delay
    const logoTimer = setTimeout(() => {
      setShowLogo(true);
    }, 300);

    // Complete intro after animation
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-background to-secondary flex items-center justify-center z-50">
      <div className="text-center">
        {/* Logo Container */}
        <div 
          className={`
            w-32 h-32 mx-auto mb-6 rounded-full bg-card border-4 border-primary 
            flex items-center justify-center transition-all duration-1000 ease-out
            ${showLogo ? 'animate-bounce-in' : 'opacity-0 scale-0'}
          `}
        >
          {/* Medical Cross Icon */}
          <div className="relative">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center animate-logo-pulse">
              <svg
                className="w-8 h-8 text-primary-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            {/* Pulsing Ring */}
            <div className="absolute inset-0 rounded-lg bg-primary opacity-20 animate-ping"></div>
          </div>
        </div>

        {/* App Name */}
        <div 
          className={`
            transition-all duration-1000 delay-500 ease-out
            ${showLogo ? 'animate-fade-slide-up' : 'opacity-0 translate-y-8'}
          `}
        >
          <h1 className="text-4xl font-bold text-primary mb-2">
            Dr. Priyanshi
          </h1>
          <p className="text-lg text-muted-foreground">
            Your AI Health Assistant
          </p>
          
          {/* Loading Dots */}
          <div className="flex justify-center space-x-2 mt-6">
            <div className="w-2 h-2 bg-primary rounded-full animate-typing"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-typing" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-typing" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoIntro;