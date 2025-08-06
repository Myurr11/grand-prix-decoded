import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { MapPin, Clock, Zap, Trophy, Calendar, Globe, ArrowRight, Info, Play, Eye, TrendingUp, Wind, Thermometer, Flag, Timer, Route } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState, useEffect } from 'react';
import { fetchAllCircuits, fetchCircuitsByContinent, fetchAllContinents } from '@/services/tracksService';

const Tracks = () => {
  const [selectedContinent, setSelectedContinent] = useState('All');
  const [selectedTrack, setSelectedTrack] = useState<any | null>(null);
  const [circuits, setCircuits] = useState<any[]>([]);
  const [continents, setContinents] = useState<string[]>(['All']);
  const [loading, setLoading] = useState(true);

  // Fetch circuits data from Firebase
  useEffect(() => {
    const loadCircuits = async () => {
      try {
        setLoading(true);
        const allCircuits = await fetchAllCircuits();
        setCircuits(allCircuits);
        
        // Get unique continents
        const uniqueContinents = await fetchAllContinents();
        setContinents(['All', ...uniqueContinents]);
      } catch (error) {
        console.error("Error loading circuits:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCircuits();
  }, []);

  // Filter circuits by continent
  const filteredCircuits = selectedContinent === 'All' 
    ? circuits 
    : circuits.filter(circuit => circuit.continent === selectedContinent);

  const uniqueContinents = ['All', ...new Set(circuits.map(circuit => circuit.continent))];

  // Track Guide Dialog Component
  const TrackGuideDialog = ({ track }: { track: any | null }) => {
    const [activeTab, setActiveTab] = useState('overview');
    
    if (!track) return null;

    return (
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{track.name} - Interactive Guide</DialogTitle>
          <DialogDescription>
            Detailed analysis and corner-by-corner breakdown
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="corners">Corners</TabsTrigger>
            <TabsTrigger value="strategy">Strategy</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Info className="h-5 w-5" />
                    <span>Track Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Length</div>
                      <div className="font-medium">{track.length}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Turns</div>
                      <div className="font-medium">{track.turns}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Difficulty</div>
                      <Badge variant={track.difficulty === 'Expert' ? 'destructive' : track.difficulty === 'Hard' ? 'default' : 'secondary'}>
                        {track.difficulty}
                      </Badge>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">DRS Zones</div>
                      <div className="font-medium">{track.drsZones}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Thermometer className="h-4 w-4 text-orange-500" />
                      <span className="text-sm">Weather: {track.weather}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Wind className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Surface: {track.surface}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Sector Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {track.sectors?.map((sector: any, index: number) => (
                      <div key={index} className="border-l-4 border-primary pl-4">
                        <div className="font-medium">Sector {sector.number}</div>
                        <div className="text-sm text-muted-foreground mb-2">{sector.description}</div>
                        <div className="flex flex-wrap gap-1">
                          {sector.characteristics.map((char: string, charIndex: number) => (
                            <Badge key={charIndex} variant="outline" className="text-xs">
                              {char}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="corners" className="space-y-4">
            <div className="grid gap-4">
              {track.corners?.map((corner: any, index: number) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-medium text-lg">{corner.name}</div>
                        <div className="text-sm text-muted-foreground">Turn {corner.number} • {corner.type}</div>
                      </div>
                      <Badge variant={corner.difficulty === 'Expert' ? 'destructive' : corner.difficulty === 'Hard' ? 'default' : 'secondary'}>
                        {corner.difficulty}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{corner.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="strategy" className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Race Strategy</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="font-medium mb-2">Overtaking Opportunities</div>
                    <p className="text-sm text-muted-foreground">{track.strategy?.overtaking}</p>
                  </div>
                  <div>
                    <div className="font-medium mb-2">Car Setup</div>
                    <p className="text-sm text-muted-foreground">{track.strategy?.setup}</p>
                  </div>
                  <div>
                    <div className="font-medium mb-2">Tire Strategy</div>
                    <p className="text-sm text-muted-foreground">{track.strategy?.tires}</p>
                  </div>
                  <div>
                    <div className="font-medium mb-2">Fuel Management</div>
                    <p className="text-sm text-muted-foreground">{track.strategy?.fuel}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="space-y-4">
            <div className="space-y-4">
              {track.history?.map((event: any, index: number) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-3">
                      <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">
                        {event.year.toString().slice(-2)}
                      </div>
                      <div>
                        <div className="font-medium">{event.year}</div>
                        <div className="text-sm text-muted-foreground">{event.event}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading circuits...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-accent/20 via-background to-background">
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        
        <div className="container relative mx-auto px-4 py-16">
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-primary/10 p-4">
                <Flag className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-6xl">
              F1 Circuits & Tracks
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
              Explore every corner, analyze racing lines, and master the circuits of Formula 1
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Continent Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {continents.map((continent) => (
            <Badge 
              key={continent}
              variant={selectedContinent === continent ? "default" : "outline"}
              className="cursor-pointer text-sm py-2 px-4 hover:scale-105 transition-transform"
              onClick={() => setSelectedContinent(continent)}
            >
              <Globe className="h-3 w-3 mr-1" />
              {continent}
            </Badge>
          ))}
        </div>

        {/* Tracks Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredCircuits.map((circuit) => (
            <Card 
              key={circuit.id} 
              className="group overflow-hidden border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            >
              {/* Track Image Section */}
              <div className="relative">
                <AspectRatio ratio={16/9}>
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${circuit.trackImage})` }}
                  >
                    {/* Overlay Info */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="font-semibold">
                          {circuit.continent}
                        </Badge>
                        <Badge variant="outline" className="bg-background/80">
                          <Timer className="h-3 w-3 mr-1" />
                          {circuit.firstGP}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </AspectRatio>
              </div>

              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                  {circuit.name}
                </CardTitle>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1 text-primary" />
                  {circuit.location}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Track Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-muted/30 rounded-lg p-3 text-center hover:bg-muted/50 transition-colors">
                    <div className="text-xs text-muted-foreground mb-1">Length</div>
                    <div className="font-bold text-primary">{circuit.length}</div>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-3 text-center hover:bg-muted/50 transition-colors">
                    <div className="text-xs text-muted-foreground mb-1">Turns</div>
                    <div className="font-bold text-primary">{circuit.turns}</div>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-3 text-center hover:bg-muted/50 transition-colors">
                    <div className="text-xs text-muted-foreground mb-1">DRS Zones</div>
                    <div className="font-bold text-primary">{circuit.drsZones}</div>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-3 text-center hover:bg-muted/50 transition-colors">
                    <div className="text-xs text-muted-foreground mb-1">Difficulty</div>
                    <div className="font-bold text-primary">{circuit.difficulty}</div>
                  </div>
                </div>
                
                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {circuit.description}
                </p>
                
                {/* Key Features */}
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-primary uppercase tracking-wide">
                    Key Features
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {circuit.keyFeatures.slice(0, 4).map((feature, featureIndex) => (
                      <Badge 
                        key={featureIndex} 
                        variant="outline" 
                        className="text-xs py-1 px-2"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Lap Record */}
                <div className="pt-3 border-t border-border">
                  <div className="flex items-center text-xs mb-3">
                    <Trophy className="h-4 w-4 text-primary mr-2" />
                    <div>
                      <div className="font-semibold">Lap Record</div>
                      <div className="text-muted-foreground">{circuit.lapRecord}</div>
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full group/btn" 
                        size="sm" 
                        onClick={() => setSelectedTrack(circuit)}
                      >
                        <Eye className="h-4 w-4 mr-2 transition-transform group-hover/btn:scale-110" />
                        Explore Track
                        <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </DialogTrigger>
                    <TrackGuideDialog track={selectedTrack} />
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Circuit Facts Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Master Every Circuit</h2>
            <p className="text-muted-foreground">
              Dive deep into track analysis with detailed corner breakdowns and strategic insights
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors">
              <CardContent className="pt-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-primary/10 p-3">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="font-bold mb-2">Corner Analysis</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Detailed breakdowns of racing lines, braking points, and corner difficulty ratings for every turn
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors">
              <CardContent className="pt-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Zap className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="font-bold mb-2">Race Strategy</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Overtaking zones, tire strategies, and setup requirements tailored for each unique circuit
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors">
              <CardContent className="pt-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Trophy className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="font-bold mb-2">Historic Moments</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Legendary races and memorable moments that define each circuit's unique character and legacy
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracks;