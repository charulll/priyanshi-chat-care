import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, UserPlus, ArrowRight } from 'lucide-react';
import { UserProfile } from '@/types/user';
import { saveUserProfile, generateUserId, requestLocationPermission } from '@/utils/storage';
import { getLanguageContent } from '@/utils/language';

interface UserOnboardingProps {
  onComplete: (user: UserProfile) => void;
}

const UserOnboarding = ({ onComplete }: UserOnboardingProps) => {
  const [step, setStep] = useState<'details' | 'location'>('details');
  const [loading, setLoading] = useState(false);
  const [language] = useState<'english' | 'hindi'>('english'); // Default to English initially
  const content = getLanguageContent(language);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    age: '',
    gender: '' as '' | 'male' | 'female' | 'other',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [locationGranted, setLocationGranted] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.age || parseInt(formData.age) < 1 || parseInt(formData.age) > 150) {
      newErrors.age = 'Please enter a valid age';
    }
    if (!formData.gender) {
      newErrors.gender = 'Please select your gender';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      setStep('location');
    }
  };

  const handleLocationRequest = async () => {
    setLoading(true);
    try {
      await requestLocationPermission();
      setLocationGranted(true);
      completeOnboarding(true);
    } catch (error) {
      console.error('Location permission denied:', error);
      completeOnboarding(false);
    } finally {
      setLoading(false);
    }
  };

  const completeOnboarding = async (withLocation: boolean) => {
    const userId = generateUserId();
    const now = new Date();

    let location;
    if (withLocation && locationGranted) {
      try {
        const position = await requestLocationPermission();
        location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
      } catch (error) {
        console.error('Error getting location:', error);
      }
    }

    const user: UserProfile = {
      id: userId,
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      age: parseInt(formData.age),
      gender: formData.gender as 'male' | 'female' | 'other',
      location,
      language,
      createdAt: now,
      lastLogin: now,
    };

    saveUserProfile(user);
    onComplete(user);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {step === 'details' && (
          <Card className="medical-card animate-fade-slide-up">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <UserPlus className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl text-primary">{content.loginTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{content.nameLabel}</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">{content.phoneLabel}</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className={errors.phone ? 'border-destructive' : ''}
                />
                {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">{content.ageLabel}</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="25"
                    value={formData.age}
                    onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                    className={errors.age ? 'border-destructive' : ''}
                  />
                  {errors.age && <p className="text-sm text-destructive">{errors.age}</p>}
                </div>

                <div className="space-y-2">
                  <Label>{content.genderLabel}</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value as '' | 'male' | 'female' | 'other' }))}
                  >
                    <SelectTrigger className={errors.gender ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">{content.maleOption}</SelectItem>
                      <SelectItem value="female">{content.femaleOption}</SelectItem>
                      <SelectItem value="other">{content.otherOption}</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && <p className="text-sm text-destructive">{errors.gender}</p>}
                </div>
              </div>

              <Button
                onClick={handleContinue}
                className="w-full medical-button-primary"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 'location' && (
          <Card className="medical-card animate-fade-slide-up">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-accent-foreground" />
              </div>
              <CardTitle className="text-xl text-primary">{content.locationPermission}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center text-muted-foreground">
                This helps us provide personalized health recommendations based on your local environment and healthcare facilities.
              </p>

              <div className="space-y-3">
                <Button
                  onClick={handleLocationRequest}
                  disabled={loading}
                  className="w-full medical-button-primary"
                >
                  {loading ? content.loading : content.allowLocationButton}
                  <MapPin className="w-4 h-4 ml-2" />
                </Button>

                <Button
                  onClick={() => completeOnboarding(false)}
                  variant="outline"
                  className="w-full"
                >
                  {content.skipLocationButton}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default UserOnboarding;