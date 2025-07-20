import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Timer, Flag, Users, ChevronsRight, Repeat, Trophy, Clock, Zap } from 'lucide-react';

interface Driver {
  id: number;
  name: string;
  team: string;
  bestTime: number | null;
  currentTime: number | null;
  eliminated: boolean;
  position: number;
}

const QualifyingSimulator = () => {
  const [currentSession, setCurrentSession] = useState<'Q1' | 'Q2' | 'Q3'>('Q1');
  const [sessionActive, setSessionActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(60); // Changed from 18 * 60 to 60 seconds
  const [playerTime, setPlayerTime] = useState<number | null>(null);
  const [playerPosition, setPlayerPosition] = useState<number>(20);
  const [lapInProgress, setLapInProgress] = useState(false);
  const [lapStartTime, setLapStartTime] = useState<number>(0);
  const [sessionComplete, setSessionComplete] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout>();
  const lapTimerRef = useRef<NodeJS.Timeout>();

  // Initialize drivers
  const [drivers, setDrivers] = useState<Driver[]>([
    { id: 1, name: 'Max Verstappen', team: 'Red Bull Racing', bestTime: null, currentTime: null, eliminated: false, position: 1 },
    { id: 2, name: 'Sergio Perez', team: 'Red Bull Racing', bestTime: null, currentTime: null, eliminated: false, position: 2 },
    { id: 3, name: 'Lewis Hamilton', team: 'Mercedes', bestTime: null, currentTime: null, eliminated: false, position: 3 },
    { id: 4, name: 'George Russell', team: 'Mercedes', bestTime: null, currentTime: null, eliminated: false, position: 4 },
    { id: 5, name: 'Charles Leclerc', team: 'Ferrari', bestTime: null, currentTime: null, eliminated: false, position: 5 },
    { id: 6, name: 'Carlos Sainz', team: 'Ferrari', bestTime: null, currentTime: null, eliminated: false, position: 6 },
    { id: 7, name: 'Lando Norris', team: 'McLaren', bestTime: null, currentTime: null, eliminated: false, position: 7 },
    { id: 8, name: 'Oscar Piastri', team: 'McLaren', bestTime: null, currentTime: null, eliminated: false, position: 8 },
    { id: 9, name: 'Fernando Alonso', team: 'Aston Martin', bestTime: null, currentTime: null, eliminated: false, position: 9 },
    { id: 10, name: 'Lance Stroll', team: 'Aston Martin', bestTime: null, currentTime: null, eliminated: false, position: 10 },
    { id: 11, name: 'Pierre Gasly', team: 'Alpine', bestTime: null, currentTime: null, eliminated: false, position: 11 },
    { id: 12, name: 'Esteban Ocon', team: 'Alpine', bestTime: null, currentTime: null, eliminated: false, position: 12 },
    { id: 13, name: 'Alexander Albon', team: 'Williams', bestTime: null, currentTime: null, eliminated: false, position: 13 },
    { id: 14, name: 'Logan Sargeant', team: 'Williams', bestTime: null, currentTime: null, eliminated: false, position: 14 },
    { id: 15, name: 'Valtteri Bottas', team: 'Alfa Romeo', bestTime: null, currentTime: null, eliminated: false, position: 15 },
    { id: 16, name: 'Zhou Guanyu', team: 'Alfa Romeo', bestTime: null, currentTime: null, eliminated: false, position: 16 },
    { id: 17, name: 'Kevin Magnussen', team: 'Haas', bestTime: null, currentTime: null, eliminated: false, position: 17 },
    { id: 18, name: 'Nico Hulkenberg', team: 'Haas', bestTime: null, currentTime: null, eliminated: false, position: 18 },
    { id: 19, name: 'Yuki Tsunoda', team: 'AlphaTauri', bestTime: null, currentTime: null, eliminated: false, position: 19 },
    { id: 20, name: 'YOU', team: 'Player', bestTime: null, currentTime: null, eliminated: false, position: 20 }
  ]);

  // Session durations and elimination rules - MUCH FASTER
  const sessionConfig = {
    Q1: { duration: 60, eliminateCount: 5 }, // Changed from 18 * 60 to 60
    Q2: { duration: 45, eliminateCount: 5 }, // Changed from 15 * 60 to 45  
    Q3: { duration: 30, eliminateCount: 0 } // Changed from 12 * 60 to 30
  };

  // Enhanced realistic lap time generation with more variation
  const generateLapTime = (driverId: number, session: string): number => {
    // Base times for different track types (using Monaco as reference - tight street circuit)
    const baseTimes = {
      Q1: 76.5,  // Slower in Q1 (traffic, fuel loads)
      Q2: 75.8,  // Medium pace
      Q3: 75.0   // Fastest (low fuel, fresh tires)
    };
    
    const baseTime = baseTimes[session];
    
    // More realistic driver skill differences
    const skillFactors = {
      1: -1.8,   // Max Verstappen (top tier)
      2: -1.4,   // Sergio Perez
      3: -1.6,   // Lewis Hamilton (top tier)
      4: -1.2,   // George Russell
      5: -1.5,   // Charles Leclerc (top tier)
      6: -1.1,   // Carlos Sainz
      7: -1.3,   // Lando Norris
      8: -0.9,   // Oscar Piastri
      9: -1.0,   // Fernando Alonso
      10: -0.7,  // Lance Stroll
      11: -0.5,  // Pierre Gasly
      12: -0.3,  // Esteban Ocon
      13: -0.1,  // Alexander Albon
      14: 0.3,   // Logan Sargeant
      15: 0.1,   // Valtteri Bottas
      16: 0.5,   // Zhou Guanyu
      17: 0.4,   // Kevin Magnussen
      18: 0.6,   // Nico Hulkenberg
      19: 0.8,   // Yuki Tsunoda
      20: 0      // Player (neutral)
    };
    
    // Add more randomness for realistic variation
    const randomFactor = (Math.random() - 0.5) * 1.2; // Increased from 0.8
    
    // Track evolution factor (times get faster as session progresses)
    const evolutionFactor = Math.random() * -0.3;
    
    // Tire degradation/improvement factor
    const tireFactor = (Math.random() - 0.5) * 0.4;
    
    // Weather/wind factor
    const conditionsFactor = (Math.random() - 0.5) * 0.6;
    
    return Math.max(baseTime + (skillFactors[driverId] || 0) + randomFactor + evolutionFactor + tireFactor + conditionsFactor, 72.0);
  };

  // Generate initial demo lap times when session starts
  const generateInitialTimes = () => {
    setDrivers(prevDrivers => {
      return prevDrivers.map(driver => {
        if (driver.id === 20) return driver; // Skip player
        
        // 60% chance to have an initial time (some drivers start with banker laps)
        if (Math.random() < 0.6) {
          const lapTime = generateLapTime(driver.id, currentSession);
          return {
            ...driver,
            bestTime: lapTime,
            currentTime: lapTime
          };
        }
        return driver;
      });
    });
  };

  // Start session
  const startSession = () => {
    setSessionActive(true);
    setSessionComplete(false);
    setTimeRemaining(sessionConfig[currentSession].duration);
    
    // Generate some initial times for realism
    setTimeout(() => {
      generateInitialTimes();
    }, 1000);
    
    // Start countdown timer
    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          endSession();
          return 0;
        }
        return prev - 1;
      });
    }, 500);

    // Simulate AI drivers setting times
    simulateAIDrivers();
  };

  // End session
  const endSession = () => {
    setSessionActive(false);
    setSessionComplete(true);
    if (timerRef.current) clearInterval(timerRef.current);
    if (lapTimerRef.current) clearInterval(lapTimerRef.current);
    
    // Eliminate drivers
    eliminateDrivers();
  };

  // Simulate AI drivers
  const simulateAIDrivers = () => {
    const interval = setInterval(() => {
      if (!sessionActive) {
        clearInterval(interval);
        return;
      }

      setDrivers(prevDrivers => {
        return prevDrivers.map(driver => {
          if (driver.id === 20 || driver.eliminated) return driver;
          
          // Different probabilities based on session time remaining
          let probability = 0.4; // Base probability
          if (timeRemaining < 30) probability = 0.8; // More aggressive in final moments
          else if (timeRemaining < 60) probability = 0.6; // Increased activity
          
          if (Math.random() < probability) {
            const lapTime = generateLapTime(driver.id, currentSession);
            
            // Sometimes drivers improve, sometimes they don't
            const shouldUpdate = !driver.bestTime || lapTime < driver.bestTime || Math.random() < 0.3;
            
            if (shouldUpdate) {
              return {
                ...driver,
                currentTime: lapTime,
                bestTime: driver.bestTime ? Math.min(driver.bestTime, lapTime) : lapTime
              };
            }
          }
          return driver;
        });
      });
    }, 800);

    return () => clearInterval(interval);
  };

  // Eliminate drivers
  const eliminateDrivers = () => {
    const eliminateCount = sessionConfig[currentSession].eliminateCount;
    if (eliminateCount === 0) return;

    setDrivers(prevDrivers => {
      const sortedDrivers = [...prevDrivers]
        .filter(d => !d.eliminated)
        .sort((a, b) => {
          if (!a.bestTime && !b.bestTime) return 0;
          if (!a.bestTime) return 1;
          if (!b.bestTime) return -1;
          return a.bestTime - b.bestTime;
        });

      const toEliminate = sortedDrivers.slice(-eliminateCount);
      
      return prevDrivers.map(driver => {
        if (toEliminate.find(d => d.id === driver.id)) {
          return { ...driver, eliminated: true };
        }
        return driver;
      });
    });
  };

  // Start player lap - FASTER LAP TIMES
  const startLap = () => {
    if (!sessionActive || lapInProgress) return;
    
    setLapInProgress(true);
    setLapStartTime(Date.now());
    
    // Simulate lap time - MUCH FASTER (1-2 seconds instead of 3-5)
    const lapDuration = 1000 + Math.random() * 1000; // Changed from 3000 + Math.random() * 2000
    
    lapTimerRef.current = setTimeout(() => {
      completeLap();
    }, lapDuration);
  };

  // Complete player lap
  const completeLap = () => {
    if (!lapInProgress) return;
    
    // More realistic player lap time generation
    const basePlayerTime = 75.5; // Slightly slower than top drivers
    const skillVariation = (Math.random() - 0.5) * 2.5; // Larger variation for player
    const consistencyFactor = (Math.random() - 0.5) * 1.0; // Player consistency varies
    
    const lapTime = Math.max(basePlayerTime + skillVariation + consistencyFactor, 72.0);
    
    setPlayerTime(lapTime);
    setLapInProgress(false);
    
    // Update player driver
    setDrivers(prevDrivers => {
      return prevDrivers.map(driver => {
        if (driver.id === 20) {
          return {
            ...driver,
            currentTime: lapTime,
            bestTime: driver.bestTime ? Math.min(driver.bestTime, lapTime) : lapTime
          };
        }
        return driver;
      });
    });
  };

  // Advance to next session
  const nextSession = () => {
    if (currentSession === 'Q1') {
      setCurrentSession('Q2');
    } else if (currentSession === 'Q2') {
      setCurrentSession('Q3');
    }
    setSessionComplete(false);
    setPlayerTime(null);
  };

  // Reset qualifying
  const resetQualifying = () => {
    setCurrentSession('Q1');
    setSessionActive(false);
    setSessionComplete(false);
    setTimeRemaining(60);
    setPlayerTime(null);
    setLapInProgress(false);
    
    if (timerRef.current) clearInterval(timerRef.current);
    if (lapTimerRef.current) clearInterval(lapTimerRef.current);
    
    // Reset all drivers with fresh randomization
    setDrivers(prevDrivers => 
      prevDrivers.map(driver => ({
        ...driver,
        bestTime: null,
        currentTime: null,
        eliminated: false
      }))
    );
  };

  // Format time
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Format lap time
  const formatLapTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = (time % 60).toFixed(3);
    return `${minutes}:${seconds.padStart(6, '0')}`;
  };

  // Get current standings
  const getCurrentStandings = () => {
    return [...drivers]
      .filter(d => !d.eliminated)
      .sort((a, b) => {
        if (!a.bestTime && !b.bestTime) return a.id - b.id;
        if (!a.bestTime) return 1;
        if (!b.bestTime) return -1;
        return a.bestTime - b.bestTime;
      })
      .map((driver, index) => ({ ...driver, position: index + 1 }));
  };

  const standings = getCurrentStandings();
  const playerStanding = standings.find(d => d.id === 20);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (lapTimerRef.current) clearInterval(lapTimerRef.current);
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
          Qualifying Simulator
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Experience the pressure of F1 qualifying with the knockout format
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Session Control */}
        <Card className="card-racing">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Timer className="h-5 w-5 text-primary" />
              <span>Session Control</span>
            </CardTitle>
            <CardDescription>
              Current session: {currentSession}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Time Remaining</span>
                <Badge variant={timeRemaining < 60 ? "destructive" : "default"}>
                  {formatTime(timeRemaining)}
                </Badge>
              </div>
              <Progress 
                value={(timeRemaining / sessionConfig[currentSession].duration) * 100} 
                className="h-2"
              />
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Your Position</div>
              <div className="flex items-center space-x-2">
                <Badge variant={playerStanding?.position <= 10 ? "default" : "destructive"}>
                  P{playerStanding?.position || 20}
                </Badge>
                {playerTime && (
                  <span className="text-sm text-muted-foreground">
                    {formatLapTime(playerTime)}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              {!sessionActive && !sessionComplete && (
                <Button onClick={startSession} className="w-full">
                  <Flag className="h-4 w-4 mr-2" />
                  Start {currentSession}
                </Button>
              )}
              
              {sessionActive && (
                <Button 
                  onClick={startLap} 
                  disabled={lapInProgress}
                  className="w-full"
                  variant={lapInProgress ? "secondary" : "default"}
                >
                  {lapInProgress ? (
                    <>
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      Lap in Progress...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Start Flying Lap
                    </>
                  )}
                </Button>
              )}
              
              {sessionComplete && currentSession !== 'Q3' && (
                <Button onClick={nextSession} className="w-full">
                  <ChevronsRight className="h-4 w-4 mr-2" />
                  Advance to {currentSession === 'Q1' ? 'Q2' : 'Q3'}
                </Button>
              )}
              
              <Button onClick={resetQualifying} variant="outline" className="w-full">
                <Repeat className="h-4 w-4 mr-2" />
                Reset Qualifying
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Live Standings */}
        <Card className="card-racing lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Live Standings - {currentSession}</CardTitle>
                <CardDescription>
                  {sessionConfig[currentSession].eliminateCount > 0 && 
                    `Bottom ${sessionConfig[currentSession].eliminateCount} drivers eliminated`
                  }
                </CardDescription>
              </div>
              <Badge variant="outline" className="flex items-center space-x-1">
                <Users className="h-3 w-3" />
                <span>{standings.length} drivers</span>
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="max-h-96 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Pos</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead>Best Time</TableHead>
                    <TableHead>Gap</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {standings.map((driver, index) => {
                    const isPlayer = driver.id === 20;
                    const isEliminated = sessionComplete && 
                      index >= standings.length - sessionConfig[currentSession].eliminateCount;
                    const gap = driver.bestTime && standings[0].bestTime ? 
                      driver.bestTime - standings[0].bestTime : null;
                    
                    return (
                      <TableRow 
                        key={driver.id} 
                        className={`${
                          isPlayer ? 'bg-primary/10' : ''
                        } ${
                          isEliminated ? 'bg-destructive/10' : ''
                        }`}
                      >
                        <TableCell className="font-medium">
                          <Badge variant={isEliminated ? "destructive" : "outline"}>
                            {index + 1}
                          </Badge>
                        </TableCell>
                        <TableCell className={`font-medium ${
                          isPlayer ? 'text-primary' : ''
                        }`}>
                          {driver.name}
                          {isPlayer && <Trophy className="h-4 w-4 inline ml-1" />}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {driver.team}
                        </TableCell>
                        <TableCell className="font-mono">
                          {driver.bestTime ? formatLapTime(driver.bestTime) : '-'}
                        </TableCell>
                        <TableCell className="font-mono text-muted-foreground">
                          {gap ? `+${gap.toFixed(3)}` : '-'}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Educational Info */}
      <div className="mt-16 bg-secondary rounded-xl p-8 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-secondary-foreground mb-6 text-center">
          How F1 Qualifying Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <Flag className="h-5 w-5 text-red-500" />
              </div>
              <h3 className="font-semibold">Q1 (18 minutes)</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              All 20 drivers compete. The slowest 5 drivers are eliminated and start the race in positions 16-20.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <Flag className="h-5 w-5 text-yellow-500" />
              </div>
              <h3 className="font-semibold">Q2 (15 minutes)</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Remaining 15 drivers compete. The slowest 5 are eliminated and start in positions 11-15. Top 10 must start on their Q2 tires.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Trophy className="h-5 w-5 text-green-500" />
              </div>
              <h3 className="font-semibold">Q3 (12 minutes)</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Final 10 drivers battle for pole position. The fastest driver starts from pole position (P1) on race day.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualifyingSimulator;