import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { BarChart3, Clock, RotateCcw, Play, Sun, Cloud, CloudRain } from 'lucide-react';

const RaceStrategyTool = () => {
  // Tire compounds
  const compounds = [
    { name: 'Soft', color: 'bg-red-500', wear: 0.8, grip: 0.9, laps: '15-20' },
    { name: 'Medium', color: 'bg-yellow-500', wear: 0.5, grip: 0.7, laps: '25-35' },
    { name: 'Hard', color: 'bg-white', wear: 0.3, grip: 0.5, laps: '35-45' },
    { name: 'Intermediate', color: 'bg-green-500', wear: 0.6, grip: 0.6, laps: '20-30' },
    { name: 'Wet', color: 'bg-blue-500', wear: 0.4, grip: 0.4, laps: '30-40' }
  ];

  // Race parameters
  const [raceLength, setRaceLength] = useState(50); // laps
  const [weather, setWeather] = useState('dry');
  const [strategy, setStrategy] = useState<{stint: number, compound: string, laps: number}[]>([
    { stint: 1, compound: 'Soft', laps: 15 },
    { stint: 2, compound: 'Medium', laps: 35 }
  ]);
  
  // Add a new stint
  const addStint = () => {
    const newStintNumber = strategy.length + 1;
    const remainingLaps = raceLength - strategy.reduce((total, stint) => total + stint.laps, 0);
    
    if (remainingLaps <= 0) return;
    
    setStrategy([
      ...strategy,
      { stint: newStintNumber, compound: 'Medium', laps: remainingLaps }
    ]);
  };
  
  // Remove a stint
  const removeStint = (stintIndex: number) => {
    if (strategy.length <= 1) return;
    
    const newStrategy = strategy.filter((_, index) => index !== stintIndex);
    // Redistribute laps to last stint
    const removedLaps = strategy[stintIndex].laps;
    const lastStintIndex = newStrategy.length - 1;
    newStrategy[lastStintIndex].laps += removedLaps;
    
    setStrategy(newStrategy);
  };
  
  // Update stint compound
  const updateStintCompound = (stintIndex: number, compound: string) => {
    const newStrategy = [...strategy];
    newStrategy[stintIndex].compound = compound;
    setStrategy(newStrategy);
  };
  
  // Update stint laps
  const updateStintLaps = (stintIndex: number, laps: number) => {
    // Ensure minimum 5 laps per stint
    if (laps < 5) laps = 5;
    
    const newStrategy = [...strategy];
    const oldLaps = newStrategy[stintIndex].laps;
    const difference = laps - oldLaps;
    
    // Adjust the next stint to maintain total race length
    if (stintIndex < newStrategy.length - 1) {
      const nextStintLaps = newStrategy[stintIndex + 1].laps - difference;
      if (nextStintLaps < 5) return; // Don't allow next stint to go below 5 laps
      newStrategy[stintIndex + 1].laps = nextStintLaps;
    } else {
      // If it's the last stint, check if we're exceeding race length
      const totalOtherLaps = newStrategy.reduce((total, stint, idx) => {
        return idx !== stintIndex ? total + stint.laps : total;
      }, 0);
      if (totalOtherLaps + laps > raceLength) return;
    }
    
    newStrategy[stintIndex].laps = laps;
    setStrategy(newStrategy);
  };
  
  // Calculate total race time (simplified model)
  const calculateRaceTime = () => {
    let totalTime = 0;
    let position = 5; // Starting position
    
    strategy.forEach((stint, index) => {
      const compound = compounds.find(c => c.name === stint.compound)!;
      
      // Base lap time (90 seconds)
      const baseLapTime = 90;
      
      // Tire performance factor
      const tireFactor = compound.grip;
      
      // Weather impact
      const weatherFactor = weather === 'dry' ? 1 :
                           weather === 'damp' ? 1.05 :
                           1.15; // wet
      
      // Tire degradation over stint
      const avgDegradation = 1 + (compound.wear * stint.laps / 20) / 2;
      
      // Pit stop time (except for first stint)
      const pitTime = index > 0 ? 25 : 0; // 25 seconds for pit stop
      
      // Calculate stint time
      const stintTime = (baseLapTime * tireFactor * weatherFactor * avgDegradation * stint.laps) + pitTime;
      totalTime += stintTime;
      
      // Position changes based on strategy (simplified)
      if (index === 0 && compound.name === 'Soft') {
        position = Math.max(1, position - 1); // Gain position with aggressive start
      } else if (compound.name === 'Hard' && stint.laps > 30) {
        position = Math.min(20, position + 1); // Lose position with very long hard stint
      } else if (weather === 'wet' && compound.name === 'Wet') {
        position = Math.max(1, position - 2); // Gain positions in wet with right tires
      } else if (weather === 'wet' && compound.name !== 'Wet' && compound.name !== 'Intermediate') {
        position = Math.min(20, position + 3); // Lose positions with wrong tires in wet
      }
    });
    
    // Convert to minutes:seconds format
    const minutes = Math.floor(totalTime / 60);
    const seconds = Math.floor(totalTime % 60);
    
    return {
      time: `${minutes}:${seconds.toString().padStart(2, '0')}`,
      position
    };
  };
  
  const raceResult = calculateRaceTime();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
          Race Strategy Simulator
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Plan your perfect race strategy with different tire compounds and conditions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Race Setup */}
        <Card className="card-racing lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span>Race Parameters</span>
            </CardTitle>
            <CardDescription>
              Configure race length and conditions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Race Length</label>
                <span className="text-sm text-muted-foreground">{raceLength} laps</span>
              </div>
              <Slider 
                value={[raceLength]} 
                min={20} 
                max={80} 
                step={1} 
                onValueChange={(value) => setRaceLength(value[0])}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Weather Conditions</label>
              <div className="grid grid-cols-3 gap-2">
                <Button 
                  variant={weather === 'dry' ? 'default' : 'outline'} 
                  className="flex flex-col items-center py-3 h-auto"
                  onClick={() => setWeather('dry')}
                >
                  <Sun className="h-5 w-5 mb-1" />
                  <span className="text-xs">Dry</span>
                </Button>
                <Button 
                  variant={weather === 'damp' ? 'default' : 'outline'} 
                  className="flex flex-col items-center py-3 h-auto"
                  onClick={() => setWeather('damp')}
                >
                  <Cloud className="h-5 w-5 mb-1" />
                  <span className="text-xs">Damp</span>
                </Button>
                <Button 
                  variant={weather === 'wet' ? 'default' : 'outline'} 
                  className="flex flex-col items-center py-3 h-auto"
                  onClick={() => setWeather('wet')}
                >
                  <CloudRain className="h-5 w-5 mb-1" />
                  <span className="text-xs">Wet</span>
                </Button>
              </div>
            </div>
            
            <div className="pt-4">
              <h3 className="text-sm font-medium mb-2">Tire Compounds</h3>
              <div className="space-y-3">
                {compounds.map((compound, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${compound.color} border border-border`}></div>
                      <span>{compound.name}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{compound.laps} laps</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Strategy Builder */}
        <Card className="card-racing lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Strategy Builder</CardTitle>
                <CardDescription>Plan your pit stops and tire choices</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => setStrategy([{ stint: 1, compound: 'Medium', laps: raceLength }])}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Stints */}
            <div className="space-y-4">
              {strategy.map((stint, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
                  <div className="font-bold text-lg">{index + 1}</div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Select 
                        value={stint.compound} 
                        onValueChange={(value) => updateStintCompound(index, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Tire" />
                        </SelectTrigger>
                        <SelectContent>
                          {compounds.map((compound) => (
                            <SelectItem key={compound.name} value={compound.name}>
                              <div className="flex items-center space-x-2">
                                <div className={`w-3 h-3 rounded-full ${compound.color} border border-border`}></div>
                                <span>{compound.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateStintLaps(index, stint.laps - 5)}
                          disabled={stint.laps <= 5}
                        >
                          -
                        </Button>
                        <span className="w-12 text-center">{stint.laps} laps</span>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateStintLaps(index, stint.laps + 5)}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${compounds.find(c => c.name === stint.compound)?.color}`}
                        style={{ width: `${(stint.laps / raceLength) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {strategy.length > 1 && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removeStint(index)}
                    >
                      ×
                    </Button>
                  )}
                </div>
              ))}
              
              {strategy.reduce((total, stint) => total + stint.laps, 0) < raceLength && (
                <Button 
                  variant="outline" 
                  className="w-full border-dashed"
                  onClick={addStint}
                >
                  Add Pit Stop
                </Button>
              )}
            </div>
            
            {/* Race Simulation Result */}
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Race Simulation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Estimated Race Time</div>
                    <div className="text-2xl font-bold">{raceResult.time}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Projected Position</div>
                    <div className="text-2xl font-bold">{raceResult.position}{raceResult.position === 1 ? 'st' : raceResult.position === 2 ? 'nd' : raceResult.position === 3 ? 'rd' : 'th'}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
      
      {/* Strategy Tips */}
      <div className="mt-16 bg-secondary rounded-xl p-8 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-secondary-foreground mb-6 text-center">
          Strategy Tips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h3 className="font-semibold">One-Stop Strategy</h3>
            <p className="text-sm text-muted-foreground">
              Start on mediums and switch to hards. Minimizes time lost in the pit lane but requires careful tire management.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Two-Stop Strategy</h3>
            <p className="text-sm text-muted-foreground">
              More aggressive approach using softer compounds. Can be faster on high-degradation circuits but requires clean overtaking.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Weather Considerations</h3>
            <p className="text-sm text-muted-foreground">
              Be prepared to switch to wet or intermediate tires if rain is expected. Timing is crucial for changing conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RaceStrategyTool;