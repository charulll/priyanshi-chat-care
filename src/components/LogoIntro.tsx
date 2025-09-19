import { useEffect, useState } from 'react';
import avatarImage from '../assets/dr-priyanshi-new-avatar.jpg';

interface LogoIntroProps {
  onComplete: () => void;
}

const LogoIntro = ({ onComplete }: LogoIntroProps) => {
  const [showLogo, setShowLogo] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start logo animation immediately
    const logoTimer = setTimeout(() => {
      setShowLogo(true);
    }, 100);

    // Start fade out after 2.5 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2500);

    // Complete intro after full 3 seconds
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 bg-gradient-to-br from-medical-bg to-medical-light flex items-center justify-center z-50 transition-all duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="text-center">
        {/* Full Screen Avatar */}
        <div 
          className={`
            transition-all duration-1000 ease-out
            ${showLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}
          `}
        >
          <div className="w-64 h-64 mx-auto mb-8 relative">
            <img
              src={avatarImage}
              alt="Dr. Priyanshi Avatar"
              className="w-full h-full object-cover rounded-full shadow-2xl"
            />
            {/* Glowing Ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-medical-primary to-medical-accent opacity-20 animate-pulse"></div>
          </div>

          <h1 className="text-5xl font-bold text-medical-primary mb-4">
            DR. PRIYANSHI
          </h1>
          <p className="text-xl text-medical-secondary mb-6">
            Your AI Health Companion
          </p>
          
          {/* Loading Animation */}
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-medical-primary rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-medical-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-medical-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoIntro;