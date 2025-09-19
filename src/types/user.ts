export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  language: 'english' | 'hindi';
  createdAt: Date;
  lastLogin: Date;
}

export interface HealthData {
  id: string;
  userId: string;
  date: string; // YYYY-MM-DD format
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
  insulinLevel: number;
  notes?: string;
  createdAt: Date;
}

export interface ChatMessage {
  id: string;
  userId: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type: 'text' | 'image' | 'voice';
  language: 'english' | 'hindi';
}

export interface AppState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  showIntro: boolean;
  currentLanguage: 'english' | 'hindi';
  chatMessages: ChatMessage[];
  healthData: HealthData[];
}