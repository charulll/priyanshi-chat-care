import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { 
  Camera, 
  Mic, 
  Send, 
  AlertCircle,
  Upload,
  MicIcon,
  Globe,
  Activity
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { UserProfile, ChatMessage } from '@/types/user';
import { addChatMessage, getChatMessages } from '@/utils/storage';
import { getLanguageContent, formatGreeting } from '@/utils/language';
import { useToast } from '@/hooks/use-toast';
import drPriyanshiAvatar from '@/assets/dr-priyanshi-avatar.jpg';

interface ChatInterfaceProps {
  user: UserProfile;
  onNavigateToHealth: () => void;
  onLanguageChange: (language: 'english' | 'hindi') => void;
}

const ChatInterface = ({ user, onNavigateToHealth, onLanguageChange }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const content = getLanguageContent(user.language);

  useEffect(() => {
    // Load existing messages
    const existingMessages = getChatMessages().filter(msg => msg.userId === user.id);
    
    if (existingMessages.length === 0) {
      // Add welcome message if this is the first time
      const welcomeMessage = addChatMessage({
        userId: user.id,
        content: formatGreeting(content, user.name),
        sender: 'bot',
        type: 'text',
        language: user.language
      });
      setMessages([welcomeMessage]);
    } else {
      setMessages(existingMessages);
    }
  }, [user.id, content, user.name, user.language]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = addChatMessage({
      userId: user.id,
      content: inputMessage,
      sender: 'user',
      type: 'text',
      language: user.language
    });

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "I understand your concern. Can you tell me more about when these symptoms started?",
        "Thank you for sharing that with me. Based on what you've described, here are some gentle recommendations...",
        "That sounds manageable. Let's work together on some simple steps to help you feel better.",
        "I'm here to support you. Have you been taking your medications as prescribed?",
        "It's great that you're staying aware of your health. Consider tracking this in your Health Tracker.",
        "Remember, small lifestyle changes can make a big difference. You're doing wonderfully by staying proactive!"
      ];

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage = addChatMessage({
        userId: user.id,
        content: randomResponse,
        sender: 'bot',
        type: 'text',
        language: user.language
      });

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleEmergencyCall = () => {
    // Open dialer with emergency number
    window.open('tel:101', '_self');
    toast({
      title: "Emergency Services",
      description: "Calling emergency services (101)",
      variant: "destructive"
    });
  };

  const handleCameraAction = (action: 'upload' | 'camera') => {
    if (action === 'upload') {
      fileInputRef.current?.click();
    } else {
      // For camera access, we'd need to implement camera functionality
      toast({
        title: "Camera Feature",
        description: "Camera functionality will be available soon!",
      });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "Image Upload",
        description: `Uploaded: ${file.name}`,
      });
      
      // Add image message
      addChatMessage({
        userId: user.id,
        content: `Uploaded image: ${file.name}`,
        sender: 'user',
        type: 'image',
        language: user.language
      });
    }
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      toast({
        title: "Voice Recording",
        description: "Voice recording started...",
      });
      
      // Simulate recording for demo
      setTimeout(() => {
        setIsRecording(false);
        toast({
          title: "Voice Recording",
          description: "Recording completed and processed!",
        });
      }, 3000);
    } else {
      toast({
        title: "Voice Recording",
        description: "Recording stopped.",
      });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-background to-secondary">
      {/* Header */}
      <div className="bg-card border-b border-border p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10 border-2 border-primary">
            <AvatarImage src={drPriyanshiAvatar} alt="Dr. Priyanshi" />
            <AvatarFallback className="bg-primary text-primary-foreground">DP</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold text-primary">Dr. Priyanshi</h2>
            <p className="text-sm text-muted-foreground">
              {isTyping ? content.typingIndicator : 'Online'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Language Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 px-2">
                <Globe className="w-4 h-4 mr-1" />
                {user.language === 'hindi' ? 'हिंदी' : 'EN'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onLanguageChange('english')}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onLanguageChange('hindi')}>
                हिंदी (Hindi)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Health Tracker */}
          <Button 
            variant="outline" 
            size="sm"
            onClick={onNavigateToHealth}
            className="h-8 px-2"
          >
            <Activity className="w-4 h-4 mr-1" />
            {content.healthTab}
          </Button>

          {/* Emergency Button */}
          <Button 
            onClick={handleEmergencyCall}
            className="emergency-button h-8 px-2"
            size="sm"
          >
            <AlertCircle className="w-4 h-4 mr-1" />
            {content.emergencyButton}
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className="flex items-start space-x-2 max-w-xs lg:max-w-md">
              {message.sender === 'bot' && (
                <Avatar className="w-8 h-8 border border-primary">
                  <AvatarImage src={drPriyanshiAvatar} alt="Dr. Priyanshi" />
                  <AvatarFallback className="bg-primary text-primary-foreground">DP</AvatarFallback>
                </Avatar>
              )}
              
              <div 
                className={`
                  p-3 rounded-2xl max-w-full
                  ${message.sender === 'user' 
                    ? 'chat-bubble-user' 
                    : 'chat-bubble-bot'
                  }
                `}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2">
              <Avatar className="w-8 h-8 border border-primary">
                <AvatarImage src={drPriyanshiAvatar} alt="Dr. Priyanshi" />
                <AvatarFallback className="bg-primary text-primary-foreground">DP</AvatarFallback>
              </Avatar>
              <div className="chat-bubble-bot">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-typing"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-typing" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-typing" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-card border-t border-border">
        <div className="flex items-center space-x-2">
          {/* Camera Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0">
                <Camera className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleCameraAction('upload')}>
                <Upload className="w-4 h-4 mr-2" />
                Upload Image
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCameraAction('camera')}>
                <Camera className="w-4 h-4 mr-2" />
                Take Photo
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Message Input */}
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={content.chatInputPlaceholder}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />

          {/* Voice Button */}
          <Button 
            variant={isRecording ? "destructive" : "outline"}
            size="icon" 
            onClick={handleVoiceRecord}
            className="shrink-0"
          >
            <MicIcon className="w-4 h-4" />
          </Button>

          {/* Send Button */}
          <Button 
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
            className="medical-button-primary shrink-0"
            size="icon"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
};

export default ChatInterface;