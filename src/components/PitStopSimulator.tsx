import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Play, RotateCcw, Timer, Trophy, Zap, Wrench, CheckCircle } from 'lucide-react';

const PitStopSimulator = () => {
  const [gameState, setGameState] = useState<'ready' | 'running' | 'finished'>('ready');
  const [currentStep, setCurrentStep] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [stepTimes, setStepTimes] = useState<number[]>([]);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [isWaiting, setIsWaiting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const pitStopSteps = [
    { name: 'Car Arrives', description: 'Driver enters pit box', icon: Zap, target: 0.5 },
    { name: 'Jack Up Front', description: 'Lift front of car', icon: Wrench, target: 0.8 },
    { name: 'Remove Front Wheels', description: 'Remove both front wheels', icon: RotateCcw, target: 1.2 },
    { name: 'Fit New Front Wheels', description: 'Install fresh front tires', icon: CheckCircle, target: 1.0 },
    { name: 'Jack Up Rear', description: 'Lift rear of car', icon: Wrench, target: 0.8 },
    { name: 'Remove Rear Wheels', description: 'Remove both rear wheels', icon: RotateCcw, target: 1.2 },
    { name: 'Fit New Rear Wheels', description: 'Install fresh rear tires', icon: CheckCircle, target: 1.0 },
    { name: 'Drop Car & Go!', description: 'Release car and signal driver', icon: Zap, target: 0.5 }
  ];

  const startSimulation = () => {
    setGameState('running');
    setCurrentStep(0);
    setStepTimes([]);
    setTotalTime(0);
    setStartTime(Date.now());
    setIsWaiting(true);
    
    // Random delay before first step (0.5-2 seconds)
    const delay = Math.random() * 1500 + 500;
    timeoutRef.current = setTimeout(() => {
      setIsWaiting(false);
    }, delay);
  };

  const handleStepClick = () => {
    if (gameState !== 'running' || isWaiting) return;
    
    const stepTime = (Date.now() - startTime - stepTimes.reduce((sum, time) => sum + time, 0)) / 1000;
    const newStepTimes = [...stepTimes, stepTime];
    setStepTimes(newStepTimes);
    
    if (currentStep < pitStopSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      setIsWaiting(true);
      
      // Random delay before next step (0.2-1 second)
      const delay = Math.random() * 800 + 200;
      timeoutRef.current = setTimeout(() => {
        setIsWaiting(false);
      }, delay);
    } else {
      // Simulation finished
      const total = newStepTimes.reduce((sum, time) => sum + time, 0);
      setTotalTime(total);
      setGameState('finished');
    }
  };

  const resetSimulation = () => {
    setGameState('ready');
    setCurrentStep(0);
    setStepTimes([]);
    setTotalTime(0);
    setIsWaiting(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const getPerformanceRating = (time: number) => {
    if (time < 3.0) return { text: 'World Record!', color: 'bg-yellow-500', icon: Trophy };
    if (time < 4.0) return { text: 'Elite Performance', color: 'bg-green-500', icon: Trophy };
    if (time < 6.0) return { text: 'Good Job!', color: 'bg-blue-500', icon: CheckCircle };
    if (time < 8.0) return { text: 'Keep Practicing', color: 'bg-orange-500', icon: Timer };
    return { text: 'Try Again!', color: 'bg-red-500', icon: RotateCcw };
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
          F1 Pit Stop Simulator
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Experience the high-pressure world of Formula 1 pit stops. React quickly to complete each step!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Simulator */}
        <Card className="card-racing">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Timer className="h-6 w-6 text-primary" />
              <span>Pit Stop Challenge</span>
            </CardTitle>
            <CardDescription>
              Click the button as soon as each step appears. Aim for under 3 seconds total!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {gameState === 'ready' && (
              <div className="text-center space-y-4">
                <div className="text-6xl">🏎️</div>
                <p className="text-muted-foreground">
                  Ready to pit? Click start and watch for each step to appear.
                </p>
                <Button onClick={startSimulation} className="btn-hero">
                  <Play className="mr-2 h-5 w-5" />
                  Start Pit Stop
                </Button>
              </div>
            )}

            {gameState === 'running' && (
              <div className="text-center space-y-6">
                <div className="text-4xl mb-4">
                  {currentStep + 1} / {pitStopSteps.length}
                </div>
                
                <Progress value={(currentStep / pitStopSteps.length) * 100} className="h-3" />
                
                {isWaiting ? (
                  <div className="space-y-4">
                    <div className="text-2xl text-muted-foreground">Get Ready...</div>
                    <div className="animate-pulse text-4xl">⏱️</div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-6 bg-primary/10 rounded-xl border-2 border-primary">
                      <div className="text-2xl font-bold text-primary mb-2">
                        {pitStopSteps[currentStep].name}
                      </div>
                      <div className="text-muted-foreground">
                        {pitStopSteps[currentStep].description}
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleStepClick}
                      className="btn-hero text-2xl py-8 px-12 animate-race-pulse"
                      size="lg"
                    >
                      <CheckCircle className="mr-3 h-8 w-8" />
                      COMPLETE STEP
                    </Button>
                  </div>
                )}
              </div>
            )}

            {gameState === 'finished' && (
              <div className="text-center space-y-6">
                <div className="text-6xl mb-4">🏁</div>
                
                <div className="space-y-4">
                  <div className="text-4xl font-bold text-primary">
                    {totalTime.toFixed(2)}s
                  </div>
                  
                  {(() => {
                    const rating = getPerformanceRating(totalTime);
                    const RatingIcon = rating.icon;
                    return (
                      <Badge className={`${rating.color} text-white text-lg px-6 py-2`}>
                        <RatingIcon className="mr-2 h-5 w-5" />
                        {rating.text}
                      </Badge>
                    );
                  })()}
                  
                  <p className="text-muted-foreground">
                    Real F1 teams average 2.3-3.5 seconds for a complete pit stop!
                  </p>
                </div>

                <div className="flex justify-center space-x-4">
                  <Button onClick={resetSimulation} variant="outline">
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Try Again
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Information Panel */}
        <div className="space-y-6">
          {/* Pit Stop Steps */}
          <Card className="card-racing">
            <CardHeader>
              <CardTitle>Pit Stop Breakdown</CardTitle>
              <CardDescription>Each step in a perfect pit stop</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pitStopSteps.map((step, index) => {
                  const StepIcon = step.icon;
                  const isCompleted = stepTimes[index] !== undefined;
                  const isCurrent = gameState === 'running' && currentStep === index && !isWaiting;
                  
                  return (
                    <div 
                      key={index}
                      className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 ${
                        isCurrent ? 'bg-primary/10 border-primary' : 
                        isCompleted ? 'bg-green-500/10 border-green-500' : 
                        'bg-muted/30 border-border'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${
                        isCurrent ? 'bg-primary text-primary-foreground' :
                        isCompleted ? 'bg-green-500 text-white' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        <StepIcon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{step.name}</div>
                        <div className="text-sm text-muted-foreground">{step.description}</div>
                      </div>
                      {isCompleted && (
                        <Badge variant="secondary">
                          {stepTimes[index].toFixed(2)}s
                        </Badge>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card className="card-racing">
            <CardHeader>
              <CardTitle>Pro Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-3">
                <Zap className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <div className="font-medium">Stay Focused</div>
                  <div className="text-sm text-muted-foreground">Watch for the step to appear and react immediately</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Timer className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <div className="font-medium">Real World Record</div>
                  <div className="text-sm text-muted-foreground">Red Bull holds the record at 1.82 seconds (2019)</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Trophy className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <div className="font-medium">Team Effort</div>
                  <div className="text-sm text-muted-foreground">Real pit stops involve 12+ crew members working in perfect sync</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PitStopSimulator;