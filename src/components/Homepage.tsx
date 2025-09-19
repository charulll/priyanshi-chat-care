import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Activity, 
  Home, 
  Languages,
  Stethoscope,
  Heart
} from 'lucide-react';
import { UserProfile } from '@/types/user';
import { getLanguageContent } from '@/utils/language';
import avatarImage from '../assets/dr-priyanshi-new-avatar.jpg';

interface HomepageProps {
  user: UserProfile;
  onStartChat: () => void;
  onHealthTracking: () => void;
  onLanguageChange: (language: 'english' | 'hindi') => void;
}

const Homepage = ({ user, onStartChat, onHealthTracking, onLanguageChange }: HomepageProps) => {
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const content = getLanguageContent(user.language);

  const welcomeMessages = {
    english: `Welcome to Sehat Bot, ${user.name}! 👩‍⚕️ I'm Dr. Priyanshi, here to guide you toward a healthier day.`,
    hindi: `सेहत बॉट में आपका स्वागत है, ${user.name}! 👩‍⚕️ मैं डॉ. प्रियांशी हूं, यहाँ आपके स्वस्थ दिन के लिए मार्गदर्शन करने के लिए।`
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-bg to-medical-light">
      {/* Header with Navigation */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-medical-border p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-medical-primary rounded-lg flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-semibold text-medical-text">Sehat Bot</h1>
          </div>
          
          {/* Language Toggle */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="flex items-center space-x-2"
            >
              <Languages className="w-4 h-4" />
              <span>{user.language === 'english' ? 'EN' : 'हि'}</span>
            </Button>
            
            {showLanguageMenu && (
              <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-medical-border z-10">
                <Button
                  variant="ghost"
                  className="w-full justify-start px-4 py-2"
                  onClick={() => {
                    onLanguageChange('english');
                    setShowLanguageMenu(false);
                  }}
                >
                  English
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start px-4 py-2"
                  onClick={() => {
                    onLanguageChange('hindi');
                    setShowLanguageMenu(false);
                  }}
                >
                  हिंदी
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Welcome Section */}
        <Card className="medical-card">
          <CardContent className="p-8 text-center">
            {/* Avatar */}
            <div className="w-32 h-32 mx-auto mb-6 relative">
              <img
                src={avatarImage}
                alt="Dr. Priyanshi"
                className="w-full h-full object-cover rounded-full shadow-lg"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-medical-primary/20 to-medical-accent/20"></div>
            </div>

            {/* Welcome Message */}
            <h2 className="text-2xl font-bold text-medical-primary mb-4">
              {user.language === 'english' ? 'Welcome Back!' : 'वापस स्वागत है!'}
            </h2>
            <p className="text-lg text-medical-secondary mb-6 leading-relaxed">
              {welcomeMessages[user.language]}
            </p>

            {/* User Info */}
            <div className="flex justify-center space-x-4 mb-6">
              <Badge variant="secondary" className="px-3 py-1">
                {user.name}
              </Badge>
              <Badge variant="outline" className="px-3 py-1">
                Age: {user.age}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Start Chat */}
          <Card className="medical-card hover:shadow-lg transition-shadow cursor-pointer" onClick={onStartChat}>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-medical-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-medical-text mb-2">
                {content.startChatButton || 'Start Chat'}
              </h3>
              <p className="text-medical-secondary">
                {user.language === 'english' 
                  ? 'Begin your health consultation with Dr. Priyanshi' 
                  : 'डॉ. प्रियांशी के साथ अपना स्वास्थ्य परामर्श शुरू करें'
                }
              </p>
            </CardContent>
          </Card>

          {/* Health Tracking */}
          <Card className="medical-card hover:shadow-lg transition-shadow cursor-pointer" onClick={onHealthTracking}>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-medical-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-medical-text mb-2">
                {content.healthTrackingTitle || 'Health Tracking'}
              </h3>
              <p className="text-medical-secondary">
                {user.language === 'english' 
                  ? 'Log your daily BP and insulin readings' 
                  : 'अपने दैनिक बीपी और इंसुलिन रीडिंग लॉग करें'
                }
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats or Recent Activity */}
        <Card className="medical-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Stethoscope className="w-5 h-5 text-medical-primary" />
              <h3 className="text-lg font-semibold text-medical-text">
                {user.language === 'english' ? 'Your Health Journey' : 'आपकी स्वास्थ्य यात्रा'}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-medical-bg rounded-lg">
                <Heart className="w-8 h-8 text-medical-primary mx-auto mb-2" />
                <p className="text-sm text-medical-secondary">
                  {user.language === 'english' ? 'Daily Check-ins' : 'दैनिक जाँच'}
                </p>
                <p className="text-2xl font-bold text-medical-primary">0</p>
              </div>
              
              <div className="text-center p-4 bg-medical-bg rounded-lg">
                <Activity className="w-8 h-8 text-medical-accent mx-auto mb-2" />
                <p className="text-sm text-medical-secondary">
                  {user.language === 'english' ? 'Health Records' : 'स्वास्थ्य रिकॉर्ड'}
                </p>
                <p className="text-2xl font-bold text-medical-accent">0</p>
              </div>
              
              <div className="text-center p-4 bg-medical-bg rounded-lg">
                <MessageCircle className="w-8 h-8 text-medical-secondary mx-auto mb-2" />
                <p className="text-sm text-medical-secondary">
                  {user.language === 'english' ? 'Consultations' : 'परामर्श'}
                </p>
                <p className="text-2xl font-bold text-medical-secondary">0</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Homepage;