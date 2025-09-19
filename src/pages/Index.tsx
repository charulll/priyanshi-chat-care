// Update this page (the content is just a fallback if you fail to update the page)

import { useState, useEffect } from 'react';
import LogoIntro from '../components/LogoIntro';
import UserOnboarding from '../components/UserOnboarding';
import Homepage from '../components/Homepage';
import ChatInterface from '../components/ChatInterface';
import HealthTracker from '../components/HealthTracker';
import { UserProfile } from '../types/user';
import { getUserProfile, saveUserProfile } from '../utils/storage';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<'intro' | 'onboarding' | 'homepage' | 'chat' | 'health'>('intro');
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Check if user is already registered
    const existingUser = getUserProfile();
    if (existingUser) {
      // Update last login time
      const updatedUser = { ...existingUser, lastLogin: new Date() };
      saveUserProfile(updatedUser);
      setUser(updatedUser);
      setCurrentScreen('homepage');
    } else {
      // Show intro animation for new users
      setCurrentScreen('intro');
    }
  }, []);

  const handleIntroComplete = () => {
    setCurrentScreen('onboarding');
  };

  const handleOnboardingComplete = (newUser: UserProfile) => {
    setUser(newUser);
    setCurrentScreen('homepage');
  };

  const handleStartChat = () => {
    setCurrentScreen('chat');
  };

  const handleNavigateToHealth = () => {
    setCurrentScreen('health');
  };

  const handleBackToHomepage = () => {
    setCurrentScreen('homepage');
  };

  const handleLanguageChange = (language: 'english' | 'hindi') => {
    if (user) {
      const updatedUser = { ...user, language };
      setUser(updatedUser);
      saveUserProfile(updatedUser);
    }
  };

  if (currentScreen === 'intro') {
    return <LogoIntro onComplete={handleIntroComplete} />;
  }
  
  if (currentScreen === 'onboarding') {
    return <UserOnboarding onComplete={handleOnboardingComplete} />;
  }

  if (currentScreen === 'homepage' && user) {
    return (
      <Homepage 
        user={user}
        onStartChat={handleStartChat}
        onHealthTracking={handleNavigateToHealth}
        onLanguageChange={handleLanguageChange}
      />
    );
  }
  
  if (currentScreen === 'chat' && user) {
    return (
      <ChatInterface 
        user={user}
        onNavigateToHealth={handleNavigateToHealth}
        onLanguageChange={handleLanguageChange}
        onBackToHome={handleBackToHomepage}
      />
    );
  }
  
  if (currentScreen === 'health' && user) {
    return (
      <HealthTracker 
        user={user}
        onBack={handleBackToHomepage}
      />
    );
  }

  return null;
};

export default Index;
