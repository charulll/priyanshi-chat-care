export interface LanguageContent {
  // Onboarding
  welcomeTitle: string;
  loginTitle: string;
  nameLabel: string;
  phoneLabel: string;
  ageLabel: string;
  genderLabel: string;
  maleOption: string;
  femaleOption: string;
  otherOption: string;
  locationPermission: string;
  allowLocationButton: string;
  skipLocationButton: string;
  continueButton: string;
  
  // Chat Interface
  doctorGreeting: string;
  typingIndicator: string;
  chatInputPlaceholder: string;
  sendButton: string;
  startChatButton: string;
  
  // Navigation
  chatTab: string;
  healthTab: string;
  emergencyButton: string;
  
  // Health Tracking
  healthTrackingTitle: string;
  bloodPressureLabel: string;
  systolicLabel: string;
  diastolicLabel: string;
  insulinLabel: string;
  saveDataButton: string;
  todayReading: string;
  previousReading: string;
  normalReading: string;
  highReading: string;
  lowReading: string;
  
  // Health Status Messages
  normalBPMessage: string;
  highBPMessage: string;
  lowBPMessage: string;
  normalInsulinMessage: string;
  highInsulinMessage: string;
  lowInsulinMessage: string;
  
  // Common
  loading: string;
  error: string;
  success: string;
}

const englishContent: LanguageContent = {
  // Onboarding
  welcomeTitle: "Welcome to Dr. Priyanshi",
  loginTitle: "Let's Get Started",
  nameLabel: "Your Name",
  phoneLabel: "Phone Number",
  ageLabel: "Age",
  genderLabel: "Gender",
  maleOption: "Male",
  femaleOption: "Female", 
  otherOption: "Other",
  locationPermission: "Allow location access for better health recommendations?",
  allowLocationButton: "Allow Location",
  skipLocationButton: "Skip for Now",
  continueButton: "Continue to Chat",
  
  // Chat Interface
  doctorGreeting: "Hello {name}! 👋 I'm Dr. Priyanshi, your AI health assistant. How are you feeling today?",
  typingIndicator: "Dr. Priyanshi is typing...",
  chatInputPlaceholder: "Type your health concerns here...",
  sendButton: "Send",
  startChatButton: "Start Chat",
  
  // Navigation
  chatTab: "Chat",
  healthTab: "Health Tracker",
  emergencyButton: "Emergency",
  
  // Health Tracking
  healthTrackingTitle: "Daily Health Tracking",
  bloodPressureLabel: "Blood Pressure (mmHg)",
  systolicLabel: "Systolic",
  diastolicLabel: "Diastolic",
  insulinLabel: "Insulin Level (units)",
  saveDataButton: "Save Today's Reading",
  todayReading: "Today's Reading",
  previousReading: "Previous Reading",
  normalReading: "Normal",
  highReading: "High",
  lowReading: "Low",
  
  // Health Status Messages
  normalBPMessage: "Your blood pressure is within normal range. Keep up the good work! 🌟",
  highBPMessage: "Your blood pressure is slightly elevated. Consider reducing salt intake and try some gentle exercise. 💙",
  lowBPMessage: "Your blood pressure is on the lower side. Stay hydrated and consider eating smaller, frequent meals. 💧",
  normalInsulinMessage: "Your insulin level looks good! Continue with your current routine. ✨",
  highInsulinMessage: "Your insulin is elevated. Consider reviewing your diet with whole foods and regular meal times. 🥗",
  lowInsulinMessage: "Your insulin is low. Make sure you're eating regular, balanced meals. 🍎",
  
  // Common
  loading: "Loading...",
  error: "Something went wrong. Please try again.",
  success: "Success!"
};

const hindiContent: LanguageContent = {
  // Onboarding  
  welcomeTitle: "डॉ. प्रियांशी में आपका स्वागत है",
  loginTitle: "आइए शुरू करते हैं",
  nameLabel: "आपका नाम",
  phoneLabel: "फोन नंबर",
  ageLabel: "उम्र",
  genderLabel: "लिंग",
  maleOption: "पुरुष",
  femaleOption: "महिला",
  otherOption: "अन्य",
  locationPermission: "बेहतर स्वास्थ्य सुझाव के लिए लोकेशन की अनुमति दें?",
  allowLocationButton: "लोकेशन की अनुमति दें",
  skipLocationButton: "अभी छोड़ें",
  continueButton: "चैट पर जाएं",
  
  // Chat Interface
  doctorGreeting: "नमस्ते {name}! 👋 मैं डॉ. प्रियांशी हूँ, आपकी AI स्वास्थ्य सहायक। आज आप कैसा महसूस कर रहे हैं?",
  typingIndicator: "डॉ. प्रियांशी टाइप कर रही है...",
  chatInputPlaceholder: "यहाँ अपनी स्वास्थ्य समस्याएं लिखें...",
  sendButton: "भेजें",
  startChatButton: "चैट शुरू करें",
  
  // Navigation
  chatTab: "चैट",
  healthTab: "स्वास्थ्य ट्रैकर",
  emergencyButton: "आपातकाल",
  
  // Health Tracking
  healthTrackingTitle: "दैनिक स्वास्थ्य ट्रैकिंग",
  bloodPressureLabel: "रक्तचाप (mmHg)",
  systolicLabel: "सिस्टोलिक",
  diastolicLabel: "डायस्टोलिक", 
  insulinLabel: "इंसुलिन स्तर (यूनिट)",
  saveDataButton: "आज की रीडिंग सेव करें",
  todayReading: "आज की रीडिंग",
  previousReading: "पिछली रीडिंग",
  normalReading: "सामान्य",
  highReading: "उच्च",
  lowReading: "निम्न",
  
  // Health Status Messages
  normalBPMessage: "आपका रक्तचाप सामान्य सीमा में है। बेहतरीन काम! 🌟",
  highBPMessage: "आपका रक्तचाप थोड़ा बढ़ा हुआ है। नमक कम करें और हल्की एक्सरसाइज करें। 💙",
  lowBPMessage: "आपका रक्तचाप कम है। पानी पिएं और थोड़ा-थोड़ा खाना खाते रहें। 💧",
  normalInsulinMessage: "आपका इंसुलिन स्तर अच्छा है! ऐसे ही चलते रहें। ✨",
  highInsulinMessage: "आपका इंसुलिन बढ़ा है। संतुलित आहार लें और नियमित खाना खाएं। 🥗",
  lowInsulinMessage: "आपका इंसुलिन कम है। नियमित और संतुलित भोजन लेना सुनिश्चित करें। 🍎",
  
  // Common
  loading: "लोड हो रहा है...",
  error: "कुछ गलत हुआ। कृपया दोबारा कोशिश करें।",
  success: "सफल!"
};

export const getLanguageContent = (language: 'english' | 'hindi'): LanguageContent => {
  return language === 'hindi' ? hindiContent : englishContent;
};

export const formatGreeting = (content: LanguageContent, name: string): string => {
  return content.doctorGreeting.replace('{name}', name);
};