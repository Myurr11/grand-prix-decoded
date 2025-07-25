import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, MapPin, Clock, Trophy, Flag, Users, Zap, Download, ExternalLink, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RaceResult {
  position: number;
  driver: string;
  team: string;
  time?: string;
  points: number;
}

interface Race {
  round: number;
  raceName: string;
  circuit: string;
  location: string;
  country: string;
  date: string;
  time: string;
  trackImage: string;
  status: 'upcoming' | 'completed' | 'live';
  results?: RaceResult[];
  fpDate?: string;
  qualifyingDate?: string;
}

const Calendar = () => {
  const [races, setRaces] = useState<Race[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRace, setSelectedRace] = useState<Race | null>(null);
  const [currentSeason, setCurrentSeason] = useState(new Date().getFullYear());
  const { toast } = useToast();

  // Sample data for demonstration - will be replaced with API data
  const sampleRaces: Race[] = [
    {
      round: 1,
      raceName: 'Bahrain Grand Prix',
      circuit: 'Bahrain International Circuit',
      location: 'Sakhir, Bahrain',
      country: 'Bahrain',
      date: '2024-03-02',
      time: '15:00',
      trackImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=300&fit=crop',
      status: 'completed',
      fpDate: '2024-03-01',
      qualifyingDate: '2024-03-02',
      results: [
        { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing', time: '1:31:44.742', points: 25 },
        { position: 2, driver: 'Sergio Pérez', team: 'Red Bull Racing', time: '+22.457', points: 18 },
        { position: 3, driver: 'Carlos Sainz', team: 'Ferrari', time: '+32.465', points: 15 },
      ]
    },
    {
      round: 2,
      raceName: 'Saudi Arabian Grand Prix',
      circuit: 'Jeddah Corniche Circuit',
      location: 'Jeddah, Saudi Arabia',
      country: 'Saudi Arabia',
      date: '2024-03-09',
      time: '18:00',
      trackImage: 'https://images.unsplash.com/photo-1469474968028-56623f02e425?w=500&h=300&fit=crop',
      status: 'completed',
      fpDate: '2024-03-08',
      qualifyingDate: '2024-03-09'
    },
    {
      round: 3,
      raceName: 'Australian Grand Prix',
      circuit: 'Albert Park Circuit',
      location: 'Melbourne, Australia',
      country: 'Australia',
      date: '2024-03-24',
      time: '06:00',
      trackImage: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=500&h=300&fit=crop',
      status: 'upcoming',
      fpDate: '2024-03-22',
      qualifyingDate: '2024-03-23'
    },
    {
      round: 4,
      raceName: 'Japanese Grand Prix',
      circuit: 'Suzuka International Racing Course',
      location: 'Suzuka, Japan',
      country: 'Japan',
      date: '2024-04-07',
      time: '06:00',
      trackImage: 'https://images.unsplash.com/photo-1470813740244-df37b8c1c04?w=500&h=300&fit=crop',
      status: 'upcoming',
      fpDate: '2024-04-05',
      qualifyingDate: '2024-04-06'
    }
  ];

  const fetchRaceData = async () => {
    setLoading(true);
    try {
      // Here we'll integrate with Ergast API for F1 data
      const response = await fetch(`https://ergast.com/api/f1/${currentSeason}.json`);
      
      if (response.ok) {
        const data = await response.json();
        const raceTable = data.MRData.RaceTable;
        
        if (raceTable && raceTable.Races) {
          const formattedRaces: Race[] = raceTable.Races.map((race: any, index: number) => ({
            round: parseInt(race.round),
            raceName: race.raceName,
            circuit: race.Circuit.circuitName,
            location: `${race.Circuit.Location.locality}, ${race.Circuit.Location.country}`,
            country: race.Circuit.Location.country,
            date: race.date,
            time: race.time || '14:00',
            trackImage: getTrackImage(race.Circuit.circuitId),
            status: new Date(race.date) < new Date() ? 'completed' : 'upcoming',
            fpDate: race.FirstPractice?.date,
            qualifyingDate: race.Qualifying?.date
          }));
          
          setRaces(formattedRaces);
        } else {
          // Fallback to sample data
          setRaces(sampleRaces);
        }
      } else {
        setRaces(sampleRaces);
      }
    } catch (error) {
      console.error('Error fetching race data:', error);
      setRaces(sampleRaces);
      toast({
        title: "Using Sample Data",
        description: "Unable to fetch live race data. Displaying sample calendar.",
        variant: "default"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchRaceResults = async (round: number) => {
    try {
      const response = await fetch(`https://ergast.com/api/f1/${currentSeason}/${round}/results.json`);
      if (response.ok) {
        const data = await response.json();
        const results = data.MRData.RaceTable.Races[0]?.Results;
        
        if (results) {
          const formattedResults: RaceResult[] = results.slice(0, 10).map((result: any) => ({
            position: parseInt(result.position),
            driver: `${result.Driver.givenName} ${result.Driver.familyName}`,
            team: result.Constructor.name,
            time: result.Time?.time || result.status,
            points: parseInt(result.points)
          }));
          
          return formattedResults;
        }
      }
    } catch (error) {
      console.error('Error fetching race results:', error);
    }
    return null;
  };

  const getTrackImage = (circuitId: string): string => {
    const trackImages: { [key: string]: string } = {
      'bahrain': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=300&fit=crop',
      'jeddah': 'https://images.unsplash.com/photo-1469474968028-56623f02e425?w=500&h=300&fit=crop',
      'albert_park': 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=500&h=300&fit=crop',
      'suzuka': 'https://images.unsplash.com/photo-1470813740244-df37b8c1c04?w=500&h=300&fit=crop',
      'imola': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=300&fit=crop',
      'miami': 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=500&h=300&fit=crop',
      'monaco': 'https://images.unsplash.com/photo-1469474968028-56623f02e425?w=500&h=300&fit=crop',
      'catalunya': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=300&fit=crop',
      'silverstone': 'https://images.unsplash.com/photo-1470813740244-df37b8c1c04?w=500&h=300&fit=crop',
      'hungaroring': 'https://images.unsplash.com/photo-1469474968028-56623f02e425?w=500&h=300&fit=crop'
    };
    
    return trackImages[circuitId] || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=300&fit=crop';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC'
    });
  };

  useEffect(() => {
    fetchRaceData();
    
    // Set up automatic refresh every hour
    const interval = setInterval(() => {
      fetchRaceData();
    }, 3600000); // 1 hour

    return () => clearInterval(interval);
  }, [currentSeason]);

  const handleRaceClick = async (race: Race) => {
    setSelectedRace(race);
    
    if (race.status === 'completed' && !race.results) {
      const results = await fetchRaceResults(race.round);
      if (results) {
        setRaces(prev => prev.map(r => 
          r.round === race.round ? { ...r, results } : r
        ));
      }
    }
  };

  const refreshData = () => {
    fetchRaceData();
    toast({
      title: "Refreshing Data",
      description: "Fetching latest race information...",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading race calendar...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6 px-4 py-2 text-sm font-medium border-primary/20 bg-primary/5">
              <CalendarIcon className="h-4 w-4 mr-2" />
              Live Updates
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                {currentSeason}
              </span>
              <br />
              <span className="text-foreground">Race Calendar</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Complete Formula 1 race schedule with live results, track information, and real-time updates throughout the season.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button onClick={refreshData} size="lg" className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 h-auto">
                <RefreshCw className="h-5 w-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                Refresh Data
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-3 h-auto">
                <Download className="h-5 w-5 mr-2" />
                Download Calendar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Season Selector */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4 bg-muted/50 p-2 rounded-lg">
            <Button 
              variant={currentSeason === 2023 ? "default" : "ghost"}
              onClick={() => setCurrentSeason(2023)}
              size="sm"
            >
              2023
            </Button>
            <Button 
              variant={currentSeason === 2024 ? "default" : "ghost"}
              onClick={() => setCurrentSeason(2024)}
              size="sm"
            >
              2024
            </Button>
            <Button 
              variant={currentSeason === 2025 ? "default" : "ghost"}
              onClick={() => setCurrentSeason(2025)}
              size="sm"
            >
              2025
            </Button>
          </div>
        </div>

        {/* Race Calendar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {races.map((race) => (
            <Card 
              key={race.round} 
              className="group cursor-pointer overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:scale-105 hover:-rotate-1 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border-0"
              onClick={() => handleRaceClick(race)}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={race.trackImage} 
                  alt={race.circuit}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 left-4">
                  <Badge variant={race.status === 'completed' ? 'default' : race.status === 'live' ? 'destructive' : 'secondary'}>
                    <Trophy className="h-3 w-3 mr-1" />
                    {race.status === 'completed' ? 'Completed' : race.status === 'live' ? 'Live' : 'Upcoming'}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="outline" className="bg-background/80">
                    Round {race.round}
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-xl mb-1">{race.raceName}</h3>
                  <p className="text-white/80 text-sm">{race.circuit}</p>
                </div>
              </div>
              
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{race.location}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <CalendarIcon className="h-4 w-4" />
                  <span className="text-sm">{formatDate(race.date)}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{formatTime(race.time)} UTC</span>
                </div>

                {race.results && (
                  <div className="pt-4 border-t border-border/50">
                    <h4 className="font-semibold mb-2">Top 3 Results</h4>
                    <div className="space-y-1">
                      {race.results.slice(0, 3).map((result) => (
                        <div key={result.position} className="flex justify-between text-sm">
                          <span>{result.position}. {result.driver}</span>
                          <span className="text-muted-foreground">{result.points} pts</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <Card className="text-center p-6">
            <div className="text-3xl font-bold text-primary">{races.length}</div>
            <div className="text-muted-foreground">Total Races</div>
          </Card>
          <Card className="text-center p-6">
            <div className="text-3xl font-bold text-green-600">{races.filter(r => r.status === 'completed').length}</div>
            <div className="text-muted-foreground">Completed</div>
          </Card>
          <Card className="text-center p-6">
            <div className="text-3xl font-bold text-blue-600">{races.filter(r => r.status === 'upcoming').length}</div>
            <div className="text-muted-foreground">Upcoming</div>
          </Card>
          <Card className="text-center p-6">
            <div className="text-3xl font-bold text-red-600">{races.filter(r => r.status === 'live').length}</div>
            <div className="text-muted-foreground">Live Now</div>
          </Card>
        </div>
      </div>

      {/* Race Details Modal would go here */}
      {selectedRace && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedRace(null)}>
          <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <CardTitle className="text-2xl">{selectedRace.raceName}</CardTitle>
              <p className="text-muted-foreground">{selectedRace.circuit} • {selectedRace.location}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <img 
                src={selectedRace.trackImage} 
                alt={selectedRace.circuit}
                className="w-full h-64 object-cover rounded-lg"
              />
              
              {selectedRace.results && (
                <div>
                  <h3 className="text-xl font-bold mb-4">Race Results</h3>
                  <div className="space-y-2">
                    {selectedRace.results.map((result) => (
                      <div key={result.position} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center">
                            {result.position}
                          </Badge>
                          <div>
                            <div className="font-semibold">{result.driver}</div>
                            <div className="text-sm text-muted-foreground">{result.team}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{result.time}</div>
                          <div className="text-sm text-muted-foreground">{result.points} pts</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <Button className="w-full" onClick={() => setSelectedRace(null)}>
                Close
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Calendar;