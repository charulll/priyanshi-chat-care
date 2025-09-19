import { UserProfile, HealthData, ChatMessage } from '@/types/user';

const STORAGE_KEYS = {
  USER_PROFILE: 'dr_priyanshi_user_profile',
  HEALTH_DATA: 'dr_priyanshi_health_data',
  CHAT_MESSAGES: 'dr_priyanshi_chat_messages',
  APP_STATE: 'dr_priyanshi_app_state'
};

// User Profile Management
export const saveUserProfile = (profile: UserProfile): void => {
  localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
};

export const getUserProfile = (): UserProfile | null => {
  const stored = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
  if (!stored) return null;
  
  try {
    const profile = JSON.parse(stored);
    // Convert date strings back to Date objects
    profile.createdAt = new Date(profile.createdAt);
    profile.lastLogin = new Date(profile.lastLogin);
    return profile;
  } catch (error) {
    console.error('Error parsing user profile:', error);
    return null;
  }
};

// Health Data Management
export const saveHealthData = (healthData: HealthData[]): void => {
  localStorage.setItem(STORAGE_KEYS.HEALTH_DATA, JSON.stringify(healthData));
};

export const getHealthData = (): HealthData[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.HEALTH_DATA);
  if (!stored) return [];
  
  try {
    const data = JSON.parse(stored);
    return data.map((item: any) => ({
      ...item,
      createdAt: new Date(item.createdAt)
    }));
  } catch (error) {
    console.error('Error parsing health data:', error);
    return [];
  }
};

export const addHealthData = (data: Omit<HealthData, 'id' | 'createdAt'>): HealthData => {
  const existingData = getHealthData();
  const newEntry: HealthData = {
    ...data,
    id: `health_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date()
  };
  
  existingData.push(newEntry);
  saveHealthData(existingData);
  return newEntry;
};

// Chat Messages Management
export const saveChatMessages = (messages: ChatMessage[]): void => {
  localStorage.setItem(STORAGE_KEYS.CHAT_MESSAGES, JSON.stringify(messages));
};

export const getChatMessages = (): ChatMessage[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.CHAT_MESSAGES);
  if (!stored) return [];
  
  try {
    const messages = JSON.parse(stored);
    return messages.map((msg: any) => ({
      ...msg,
      timestamp: new Date(msg.timestamp)
    }));
  } catch (error) {
    console.error('Error parsing chat messages:', error);
    return [];
  }
};

export const addChatMessage = (message: Omit<ChatMessage, 'id' | 'timestamp'>): ChatMessage => {
  const existingMessages = getChatMessages();
  const newMessage: ChatMessage = {
    ...message,
    id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date()
  };
  
  existingMessages.push(newMessage);
  saveChatMessages(existingMessages);
  return newMessage;
};

// Location Management
export const requestLocationPermission = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (error) => reject(error),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 600000 }
    );
  });
};

// Clear all data (for logout)
export const clearAllData = (): void => {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
};

// Generate unique user ID
export const generateUserId = (): string => {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};