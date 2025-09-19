import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Activity, 
  TrendingUp, 
  TrendingDown,
  Heart,
  Droplets
} from 'lucide-react';
import { UserProfile, HealthData } from '@/types/user';
import { getHealthData, addHealthData } from '@/utils/storage';
import { getLanguageContent } from '@/utils/language';
import { useToast } from '@/hooks/use-toast';

interface HealthTrackerProps {
  user: UserProfile;
  onBack: () => void;
}

const HealthTracker = ({ user, onBack }: HealthTrackerProps) => {
  const [healthHistory, setHealthHistory] = useState<HealthData[]>([]);
  const [todayData, setTodayData] = useState<HealthData | null>(null);
  const [formData, setFormData] = useState({
    systolic: '',
    diastolic: '',
    insulin: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  
  const { toast } = useToast();
  const content = getLanguageContent(user.language);
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    loadHealthData();
  }, [user.id]);

  const loadHealthData = () => {
    const allHealthData = getHealthData().filter(data => data.userId === user.id);
    setHealthHistory(allHealthData);
    
    // Check if there's data for today
    const todayEntry = allHealthData.find(data => data.date === today);
    if (todayEntry) {
      setTodayData(todayEntry);
      setFormData({
        systolic: todayEntry.bloodPressure.systolic.toString(),
        diastolic: todayEntry.bloodPressure.diastolic.toString(),
        insulin: todayEntry.insulinLevel.toString(),
        notes: todayEntry.notes || ''
      });
    }
  };

  const handleSaveData = async () => {
    const systolic = parseInt(formData.systolic);
    const diastolic = parseInt(formData.diastolic);
    const insulin = parseFloat(formData.insulin);

    if (isNaN(systolic) || isNaN(diastolic) || isNaN(insulin)) {
      toast({
        title: content.error,
        description: "Please enter valid numbers for all fields",
        variant: "destructive"
      });
      return;
    }

    if (systolic < 50 || systolic > 250 || diastolic < 30 || diastolic > 150) {
      toast({
        title: content.error,
        description: "Blood pressure values seem unusual. Please check and try again.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const healthEntry = addHealthData({
        userId: user.id,
        date: today,
        bloodPressure: {
          systolic,
          diastolic
        },
        insulinLevel: insulin,
        notes: formData.notes.trim()
      });

      setTodayData(healthEntry);
      loadHealthData();

      toast({
        title: content.success,
        description: "Health data saved successfully!",
      });

      // Provide health insights
      setTimeout(() => {
        showHealthInsights(systolic, diastolic, insulin);
      }, 1000);

    } catch (error) {
      toast({
        title: content.error,
        description: "Failed to save health data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const showHealthInsights = (systolic: number, diastolic: number, insulin: number) => {
    // Blood pressure assessment
    let bpMessage = content.normalBPMessage;
    let bpStatus: 'normal' | 'high' | 'low' = 'normal';

    if (systolic >= 140 || diastolic >= 90) {
      bpMessage = content.highBPMessage;
      bpStatus = 'high';
    } else if (systolic < 90 || diastolic < 60) {
      bpMessage = content.lowBPMessage;
      bpStatus = 'low';
    }

    // Insulin assessment (general ranges, not medical advice)
    let insulinMessage = content.normalInsulinMessage;
    let insulinStatus: 'normal' | 'high' | 'low' = 'normal';

    if (insulin > 25) {
      insulinMessage = content.highInsulinMessage;
      insulinStatus = 'high';
    } else if (insulin < 2) {
      insulinMessage = content.lowInsulinMessage;
      insulinStatus = 'low';
    }

    toast({
      title: "Health Insights",
      description: bpMessage,
    });

    setTimeout(() => {
      toast({
        title: "Insulin Insights",
        description: insulinMessage,
      });
    }, 2000);
  };

  const getHealthStatus = (current: number, previous: number, type: 'bp' | 'insulin') => {
    const difference = current - previous;
    const percentChange = (difference / previous) * 100;

    if (Math.abs(percentChange) < 5) {
      return { status: 'stable', icon: '→', color: 'bg-muted' };
    } else if (difference > 0) {
      return { status: 'increased', icon: '↗', color: 'bg-destructive' };
    } else {
      return { status: 'decreased', icon: '↘', color: 'bg-accent' };
    }
  };

  const getPreviousReading = () => {
    if (healthHistory.length < 2) return null;
    
    const sortedHistory = healthHistory.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    return sortedHistory[1]; // Second most recent (excluding today)
  };

  const previousReading = getPreviousReading();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="icon" onClick={onBack}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-accent-foreground" />
              </div>
              <h1 className="text-xl font-semibold text-primary">
                {content.healthTrackingTitle}
              </h1>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Welcome back,</p>
            <p className="font-medium text-primary">{user.name}</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Today's Entry Form */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-primary" />
              <span>{content.todayReading}</span>
              <Badge variant="outline" className="ml-auto">
                {new Date().toLocaleDateString()}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <Label className="text-base font-medium">
                  {content.bloodPressureLabel}
                </Label>
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <Label htmlFor="systolic" className="text-sm text-muted-foreground">
                      {content.systolicLabel}
                    </Label>
                    <Input
                      id="systolic"
                      type="number"
                      placeholder="120"
                      value={formData.systolic}
                      onChange={(e) => setFormData(prev => ({ ...prev, systolic: e.target.value }))}
                    />
                  </div>
                  <div className="flex items-end">
                    <span className="text-2xl text-muted-foreground pb-2">/</span>
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="diastolic" className="text-sm text-muted-foreground">
                      {content.diastolicLabel}
                    </Label>
                    <Input
                      id="diastolic"
                      type="number"
                      placeholder="80"
                      value={formData.diastolic}
                      onChange={(e) => setFormData(prev => ({ ...prev, diastolic: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="insulin" className="text-base font-medium">
                  {content.insulinLabel}
                </Label>
                <div className="flex items-center space-x-2">
                  <Droplets className="w-5 h-5 text-primary" />
                  <Input
                    id="insulin"
                    type="number"
                    step="0.1"
                    placeholder="15.5"
                    value={formData.insulin}
                    onChange={(e) => setFormData(prev => ({ ...prev, insulin: e.target.value }))}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes" className="text-sm text-muted-foreground">
                Notes (Optional)
              </Label>
              <Input
                id="notes"
                placeholder="How are you feeling today?"
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              />
            </div>

            <Button
              onClick={handleSaveData}
              disabled={loading || !formData.systolic || !formData.diastolic || !formData.insulin}
              className="w-full medical-button-primary"
            >
              {loading ? content.loading : content.saveDataButton}
            </Button>
          </CardContent>
        </Card>

        {/* Comparison with Previous Reading */}
        {todayData && previousReading && (
          <Card className="medical-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                <span>Trend Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Blood Pressure</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Previous</span>
                    <span className="font-mono">
                      {previousReading.bloodPressure.systolic}/{previousReading.bloodPressure.diastolic}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Today</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono">
                        {todayData.bloodPressure.systolic}/{todayData.bloodPressure.diastolic}
                      </span>
                      {(() => {
                        const avgPrevious = (previousReading.bloodPressure.systolic + previousReading.bloodPressure.diastolic) / 2;
                        const avgCurrent = (todayData.bloodPressure.systolic + todayData.bloodPressure.diastolic) / 2;
                        const trend = getHealthStatus(avgCurrent, avgPrevious, 'bp');
                        return (
                          <Badge className={`${trend.color} text-white`}>
                            {trend.icon}
                          </Badge>
                        );
                      })()}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Insulin Level</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Previous</span>
                    <span className="font-mono">{previousReading.insulinLevel}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Today</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono">{todayData.insulinLevel}</span>
                      {(() => {
                        const trend = getHealthStatus(todayData.insulinLevel, previousReading.insulinLevel, 'insulin');
                        return (
                          <Badge className={`${trend.color} text-white`}>
                            {trend.icon}
                          </Badge>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent History */}
        {healthHistory.length > 0 && (
          <Card className="medical-card">
            <CardHeader>
              <CardTitle>Recent Readings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {healthHistory
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .slice(0, 5)
                  .map((data) => (
                    <div 
                      key={data.id}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">
                          {new Date(data.date).toLocaleDateString()}
                        </p>
                        {data.notes && (
                          <p className="text-sm text-muted-foreground">{data.notes}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-sm">
                          BP: {data.bloodPressure.systolic}/{data.bloodPressure.diastolic}
                        </p>
                        <p className="font-mono text-sm text-muted-foreground">
                          Insulin: {data.insulinLevel}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default HealthTracker;