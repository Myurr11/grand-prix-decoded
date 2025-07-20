import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wind, Play, Pause, RotateCcw, Info, Zap, Car, ArrowRight } from 'lucide-react';

const DRSVisualizer = () => {
  // Track selection
  const [selectedTrack, setSelectedTrack] = useState('monza');
  
  // Animation state
  const [isPlaying, setIsPlaying] = useState(false);
  const [carPosition, setCarPosition] = useState(0); // 0-100% around the track
  const [drsActive, setDrsActive] = useState(false);
  const [speed, setSpeed] = useState(280); // km/h
  const [baseSpeed, setBaseSpeed] = useState(280); // km/h
  
  // Canvas refs
  const trackCanvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  
  // Track data
  const tracks = [
    {
      id: 'monza',
      name: 'Monza',
      country: 'Italy',
      drsZones: [
        { start: 15, end: 25, detectionPoint: 10 }, // percentages around track
        { start: 70, end: 85, detectionPoint: 65 }
      ],
      layout: [
        [0.1, 0.5], [0.3, 0.3], [0.5, 0.2], [0.7, 0.3], [0.9, 0.5], 
        [0.7, 0.7], [0.5, 0.8], [0.3, 0.7], [0.1, 0.5]
      ] // simplified track layout points
    },
    {
      id: 'spa',
      name: 'Spa-Francorchamps',
      country: 'Belgium',
      drsZones: [
        { start: 10, end: 20, detectionPoint: 5 },
        { start: 75, end: 90, detectionPoint: 70 }
      ],
      layout: [
        [0.1, 0.5], [0.2, 0.3], [0.4, 0.2], [0.6, 0.3], [0.8, 0.4],
        [0.9, 0.6], [0.7, 0.7], [0.5, 0.8], [0.3, 0.7], [0.1, 0.5]
      ]
    },
    {
      id: 'baku',
      name: 'Baku',
      country: 'Azerbaijan',
      drsZones: [
        { start: 20, end: 30, detectionPoint: 15 },
        { start: 60, end: 80, detectionPoint: 55 }
      ],
      layout: [
        [0.1, 0.5], [0.3, 0.3], [0.5, 0.2], [0.7, 0.2], [0.9, 0.3],
        [0.8, 0.5], [0.9, 0.7], [0.7, 0.8], [0.5, 0.8], [0.3, 0.7], [0.1, 0.5]
      ]
    }
  ];
  
  // Get current track data
  const currentTrack = tracks.find(track => track.id === selectedTrack) || tracks[0];
  
  // Check if car is in DRS detection zone
  const checkDRSDetection = (position: number) => {
    return currentTrack.drsZones.some(zone => {
      // If we're at a detection point, check if we're within 1 second of another car (simplified)
      // For visualization purposes, we'll just randomly determine if DRS is activated
      if (Math.abs(position - zone.detectionPoint) < 2) {
        // 70% chance of getting DRS for demo purposes
        return Math.random() > 0.3;
      }
      return false;
    });
  };
  
  // Check if car is in DRS activation zone
  const isInDRSZone = (position: number) => {
    return currentTrack.drsZones.some(zone => {
      return position >= zone.start && position <= zone.end;
    });
  };
  
  // Draw track on canvas
  const drawTrack = () => {
    const canvas = trackCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set canvas dimensions
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    
    // Draw track outline
    ctx.beginPath();
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 20;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    const points = currentTrack.layout;
    points.forEach((point, index) => {
      const x = point[0] * canvas.width;
      const y = point[1] * canvas.height;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.stroke();
    
    // Draw DRS zones
    ctx.strokeStyle = '#22c55e'; // Green for DRS zones
    ctx.lineWidth = 20;
    
    currentTrack.drsZones.forEach(zone => {
      const startPercent = zone.start / 100;
      const endPercent = zone.end / 100;
      const totalPoints = points.length - 1; // Subtract 1 because the last point is the same as the first
      
      const startIndex = Math.floor(startPercent * totalPoints);
      const endIndex = Math.floor(endPercent * totalPoints);
      
      ctx.beginPath();
      
      for (let i = startIndex; i <= endIndex; i++) {
        const point = points[i % totalPoints];
        const x = point[0] * canvas.width;
        const y = point[1] * canvas.height;
        
        if (i === startIndex) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.stroke();
      
      // Draw detection point
      const detectionPercent = zone.detectionPoint / 100;
      const detectionIndex = Math.floor(detectionPercent * totalPoints);
      const detectionPoint = points[detectionIndex % totalPoints];
      
      ctx.beginPath();
      ctx.fillStyle = '#3b82f6'; // Blue for detection point
      ctx.arc(
        detectionPoint[0] * canvas.width,
        detectionPoint[1] * canvas.height,
        10,
        0,
        Math.PI * 2
      );
      ctx.fill();
    });
    
    // Draw car
    const carPositionPercent = carPosition / 100;
    const totalPoints = points.length - 1;
    const carIndex = Math.floor(carPositionPercent * totalPoints);
    const carPoint = points[carIndex % totalPoints];
    
    ctx.beginPath();
    ctx.fillStyle = drsActive && isInDRSZone(carPosition) ? '#ef4444' : '#f59e0b'; // Red if DRS active, yellow otherwise
    ctx.arc(
      carPoint[0] * canvas.width,
      carPoint[1] * canvas.height,
      8,
      0,
      Math.PI * 2
    );
    ctx.fill();
  };
  
  // Animation loop
  const animate = () => {
    // Update car position
    setCarPosition(prev => (prev + 0.5) % 100);
    
    // Check DRS detection
    const detected = checkDRSDetection(carPosition);
    if (detected) {
      setDrsActive(true);
    }
    
    // Update speed based on DRS
    if (drsActive && isInDRSZone(carPosition)) {
      setSpeed(baseSpeed + 12); // +12 km/h with DRS open
    } else {
      setSpeed(baseSpeed);
      // Reset DRS active state if we've gone through all DRS zones
      if (currentTrack.drsZones.every(zone => carPosition > zone.end)) {
        setDrsActive(false);
      }
    }
    
    // Draw track and car
    drawTrack();
    
    // Continue animation
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(animate);
    }
  };
  
  // Start/stop animation
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };
  
  // Reset animation
  const resetAnimation = () => {
    setIsPlaying(false);
    setCarPosition(0);
    setDrsActive(false);
    setSpeed(baseSpeed);
    drawTrack();
  };
  
  // Handle track change
  const handleTrackChange = (trackId: string) => {
    setSelectedTrack(trackId);
    resetAnimation();
  };
  
  // Handle base speed change
  const handleSpeedChange = (value: number[]) => {
    setBaseSpeed(value[0]);
  };
  
  // Initialize and cleanup
  useEffect(() => {
    // Initial draw
    drawTrack();
    
    // Handle window resize
    const handleResize = () => {
      drawTrack();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [selectedTrack]);
  
  // Handle animation state changes
  useEffect(() => {
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(animate);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, carPosition]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
          DRS Visualizer
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore how the Drag Reduction System works on different F1 circuits
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Controls */}
        <Card className="card-racing lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Wind className="h-5 w-5 text-primary" />
              <span>DRS Controls</span>
            </CardTitle>
            <CardDescription>
              Configure track and visualization settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Circuit</label>
              <Select 
                value={selectedTrack} 
                onValueChange={handleTrackChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a track" />
                </SelectTrigger>
                <SelectContent>
                  {tracks.map(track => (
                    <SelectItem key={track.id} value={track.id}>
                      {track.name}, {track.country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Base Speed</label>
                <span className="text-sm text-muted-foreground">{baseSpeed} km/h</span>
              </div>
              <Slider 
                value={[baseSpeed]} 
                min={200} 
                max={350} 
                step={5} 
                onValueChange={handleSpeedChange}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Current Status</label>
              <div className="flex items-center space-x-3">
                <Badge variant={drsActive ? "default" : "outline"}>
                  DRS {drsActive ? "ENABLED" : "DISABLED"}
                </Badge>
                <Badge variant="secondary">
                  {speed} km/h
                </Badge>
              </div>
            </div>
            
            <div className="flex space-x-2 pt-4">
              <Button 
                variant="default" 
                className="flex-1"
                onClick={togglePlayback}
              >
                {isPlaying ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Play
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                onClick={resetAnimation}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Visualization */}
        <Card className="card-racing lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{currentTrack.name} Circuit</CardTitle>
                <CardDescription>{currentTrack.drsZones.length} DRS Zones</CardDescription>
              </div>
              <Badge variant="outline" className="flex items-center space-x-1">
                <Info className="h-3 w-3" />
                <span>Detection Points in Blue</span>
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted/30 rounded-lg overflow-hidden relative">
              <canvas 
                ref={trackCanvasRef} 
                className="w-full h-full"
              />
              
              <div className="absolute bottom-4 left-4 right-4 bg-background/80 backdrop-blur-sm p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${drsActive && isInDRSZone(carPosition) ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
                    <span className="text-sm font-medium">
                      {drsActive && isInDRSZone(carPosition) ? 'DRS OPEN' : 'DRS CLOSED'}
                    </span>
                  </div>
                  <div className="text-sm font-medium">
                    {speed} km/h
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Educational Info */}
      <div className="mt-16 bg-secondary rounded-xl p-8 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-secondary-foreground mb-6 text-center">
          How DRS Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Car className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="font-semibold">Detection Point</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              When a car passes through a detection point within 1 second of the car ahead, DRS becomes available for use in the next DRS zone.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Wind className="h-5 w-5 text-green-500" />
              </div>
              <h3 className="font-semibold">Activation Zone</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              In designated DRS zones (usually straights), drivers can press a button to open the rear wing, reducing drag and increasing top speed by 10-15 km/h.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <Zap className="h-5 w-5 text-red-500" />
              </div>
              <h3 className="font-semibold">Overtaking Advantage</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              DRS creates a speed advantage that helps trailing cars overcome the aerodynamic disadvantage of following another car, facilitating more overtaking opportunities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DRSVisualizer;