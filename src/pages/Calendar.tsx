// src/app/calendar/page.tsx
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, MapPin, Clock, Trophy, Flag, Users, ChevronsUpDown, Download, ExternalLink, RefreshCw, ChevronRight, X, ArrowRight, CheckCircle, PlayCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchAllRaces } from '@/services/calendarService';
interface Race {
  round: number;
  raceName: string;
  circuit: string;
  location: string;
  country: string;
  date: string;
  time: string;
  status: 'completed' | 'live' | 'upcoming';
  trackImage: string;
  realLifeImage?: string;
  circuitLength: string;
  laps: number;
  raceDistance: string;
  lapRecord: {
    time: string;
    driver: string;
    year: number;
  };
  sessions: {
    name: string;
    date: string;
    time: string;
    completed: boolean;
  }[];
  results?: {
    position: number;
    driver: string;
    team: string;
    points: number;
  }[];
}

interface CalendarStat {
  name: string;
  value: string | number;
  description: string;
  total?: number;
}

const Calendar = () => {
  const [races, setRaces] = useState<Race[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRace, setSelectedRace] = useState<Race | null>(null);
  const [currentSeason, setCurrentSeason] = useState(2025);
  const { toast } = useToast();

  const getCalendarStats = (races: Race[]): CalendarStat[] => {
    const completedRaces = races.filter(r => r.status === 'completed');
    const uniqueCountries = [...new Set(races.map(r => r.country))];
    const uniqueTimes = [...new Set(races.map(r => r.time))];
    
    const streetCircuits = races.filter(r => 
      r.circuit.includes('Street') || 
      r.circuit.includes('City') || 
      r.raceName.includes('Street')
    ).length;
    
    const driverWins: Record<string, number> = {};
    const teamWins: Record<string, number> = {};
    const podiumCounts: Record<string, number> = {};
    const fastestLaps: Record<string, number> = {};
    const winners: Set<string> = new Set();
    
    completedRaces.forEach(race => {
      if (race.results) {
        const winner = race.results[0];
        winners.add(winner.driver);
        driverWins[winner.driver] = (driverWins[winner.driver] || 0) + 1;
        teamWins[winner.team] = (teamWins[winner.team] || 0) + 1;
        
        race.results.slice(0, 3).forEach(result => {
          podiumCounts[result.driver] = (podiumCounts[result.driver] || 0) + 1;
        });
        
        fastestLaps[winner.driver] = (fastestLaps[winner.driver] || 0) + 1;
      }
    });
    
    const topDriver = Object.entries(driverWins).sort((a, b) => b[1] - a[1])[0];
    const topTeam = Object.entries(teamWins).sort((a, b) => b[1] - a[1])[0];
    const topPodiumDriver = Object.entries(podiumCounts).sort((a, b) => b[1] - a[1])[0];
    const topFastestLapDriver = Object.entries(fastestLaps).sort((a, b) => b[1] - a[1])[0];
    
    return [
      {
        name: "Races Completed",
        value: completedRaces.length,
        total: races.length,
        description: `${Math.round((completedRaces.length / races.length) * 100)}% of season done`
      },
      {
        name: "Countries",
        value: uniqueCountries.length,
        description: "Different nations visited"
      },
      {
        name: "Track Types",
        value: `${races.length - streetCircuits} circuits`,
        description: `${streetCircuits} street tracks`
      },
      {
        name: "Time Zones",
        value: uniqueTimes.length,
        description: "Different time zones"
      },
      {
        name: "Most Wins",
        value: topDriver ? `${topDriver[0]}` : "-",
        description: topDriver ? `${topDriver[1]} wins` : "No races completed"
      },
      {
        name: "Different Winners",
        value: winners.size,
        description: "Unique race winners"
      },
      {
        name: "Top Team",
        value: topTeam ? topTeam[0] : "-",
        description: topTeam ? `${topTeam[1]} wins` : "No races completed"
      },
      {
        name: "Podium Leader",
        value: topPodiumDriver ? topPodiumDriver[0] : "-",
        description: topPodiumDriver ? `${topPodiumDriver[1]} podiums` : "No races completed"
      }
    ];
  };

  // Fetch data from Firebase on component mount
  useEffect(() => {
    const fetchCalendarData = async () => {
      setLoading(true);
      try {
        const data = await fetchAllRaces();
        setRaces(data.map(race => ({
          ...race,
          lapRecord: {
            ...race.lapRecord,
            year: Number(race.lapRecord.year) // Convert year string to number
          }
        })));
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load calendar data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCalendarData();
  }, [toast]);

  // Add a refresh function
  const refreshData = async () => {
    setLoading(true);
    try {
      const data = await fetchAllRaces();
      setRaces(data.map(race => ({
        ...race,
        lapRecord: {
          ...race.lapRecord,
          year: Number(race.lapRecord.year) // Convert year string to number
        }
      })));
      toast({
        title: "Calendar Refreshed",
        description: "Race calendar is up to date.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to refresh calendar data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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

  const handleRaceClick = (race: Race) => {
    setSelectedRace(race);
  };
  
  const formatSessionTime = (dateString: string, timeString: string) => {
    const date = new Date(`${dateString}T${timeString}`);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10"></div>
        <div className="container mx-auto px-4 py-16 relative">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="text-center max-w-4xl mx-auto">
              <Badge variant="outline" className="mb-6 px-4 py-2 text-sm font-medium border-primary/20 bg-primary/5">
                <CalendarIcon className="h-4 w-4 mr-2" />
                {currentSeason} Season
              </Badge>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-red-500 to-blue-500">
              Race Calendar
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Complete Formula 1 race schedule with results, track information, and race details.
            </p>
          </motion.div>

          {/* Quick Stats - Updated with smaller cards and color changes */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {getCalendarStats(races).map((stat, index) => (
              <Card key={index} className="p-4 hover:shadow-lg transition-shadow h-full">
                <CardHeader className="p-0 mb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">{stat.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="text-2xl font-bold text-red-600 mb-1">{stat.value}</div>
                  <p className="text-xs text-gray-400">{stat.description}</p>
                  {stat.total !== undefined && (
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-red-600 h-1.5 rounded-full" 
                        style={{ width: `${(Number(stat.value) / stat.total) * 100}%` }}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Race Calendar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {races.map((race) => (
          <Card 
            key={race.round} 
            className="group cursor-pointer overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:scale-105 hover:-rotate-1 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border-0"
            onClick={() => handleRaceClick(race)}
          >
            <div className="relative overflow-hidden">
              {/* Show real-life image in the card */}
              <img 
                src={race.realLifeImage || race.trackImage} 
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
  {/* Basic race info (always shown) */}
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

  {/* Conditional content based on race status */}
  {race.status === 'completed' && race.results ? (
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
  ) : (
    <div className="pt-4 border-t border-border/50">
      <h4 className="font-semibold mb-2">Upcoming Sessions</h4>
      <div className="space-y-2">
        {race.sessions.filter(s => !s.completed).slice(0, 3).map((session) => (
          <div key={session.name} className="flex justify-between text-sm">
            <span>{session.name}</span>
            <span className="text-muted-foreground">
              {formatSessionTime(session.date, session.time)}
            </span>
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
{/* Enhanced Race Details Modal */}
<AnimatePresence>
  {selectedRace && (
    <motion.div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setSelectedRace(null)}
    >
      <motion.div
        className="max-w-6xl w-full max-h-[90vh] overflow-y-auto bg-background rounded-xl shadow-2xl border border-border/50"
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          {/* Hero Section with Split Layout */}
          <div className="relative h-96 flex flex-col md:flex-row">
            {/* Left Section - Race Info */}
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-end bg-gradient-to-br from-primary/5 via-background to-background">
              <div className="mb-6">
                {/* Status Badge */}
              <div className="absolute top-6 left-6">
                <Badge 
                  variant={selectedRace.status === 'completed' ? 'default' : selectedRace.status === 'live' ? 'destructive' : 'secondary'}
                  className="flex items-center shadow-lg"
                >
                  {selectedRace.status === 'completed' ? (
                    <CheckCircle className="h-4 w-4 mr-2" />
                  ) : selectedRace.status === 'live' ? (
                    <PlayCircle className="h-4 w-4 mr-2" />
                  ) : (
                    <AlertCircle className="h-4 w-4 mr-2" />
                  )}
                  {selectedRace.status === 'completed' ? 'Completed' : selectedRace.status === 'live' ? 'Live' : 'Upcoming'}
                </Badge>
              </div>
                <Badge variant="outline" className="mb-4 bg-background/80">
                  Round {selectedRace.round}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-red-600">
                  {selectedRace.raceName}
                </h1>
                <div className="flex items-center space-x-3 text-xl text-muted-foreground">
                  <MapPin className="h-5 w-5" />
                  <span>{selectedRace.circuit}</span>
                </div>
                <div className="mt-2 text-lg text-muted-foreground">
                  {selectedRace.location}, {selectedRace.country}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background/80 p-4 rounded-lg border border-border/30">
                  <p className="text-sm text-muted-foreground">Race Date</p>
                  <p className="font-medium text-lg">{formatDate(selectedRace.date)}</p>
                </div>
                <div className="bg-background/80 p-4 rounded-lg border border-border/30">
                  <p className="text-sm text-muted-foreground">Race Time</p>
                  <p className="font-medium text-lg">{formatTime(selectedRace.time)}</p>
                </div>
              </div>
            </div>
            
            {/* Right Section - Track Image */}
            <div className="w-full md:w-1/2 h-full relative overflow-hidden">
              <img 
                src={selectedRace.trackImage} 
                alt={selectedRace.circuit}
                className="absolute inset-0 w-full h-full object-contain bg-gradient-to-br from-muted/20 to-muted/40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent md:bg-gradient-to-l" />
              
              
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-6 right-6 bg-background/80 hover:bg-background text-foreground shadow-lg"
                onClick={() => setSelectedRace(null)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

          {/* Content */}
          <div className="p-8">
            {/* Circuit Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-background to-muted/10 border-border/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">Circuit Length</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold">{selectedRace.circuitLength}</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-background to-muted/10 border-border/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">Number of Laps</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3">
                    <Flag className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold">{selectedRace.laps}</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-background to-muted/10 border-border/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">Race Distance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3">
                    <Trophy className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold">{selectedRace.raceDistance}</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-background to-muted/10 border-border/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">Lap Record</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-6 w-6 text-primary" />
                    <div>
                      <span className="text-xl font-bold block">{selectedRace.lapRecord.time}</span>
                      <span className="text-sm text-muted-foreground">{selectedRace.lapRecord.driver} ({selectedRace.lapRecord.year})</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Weekend Schedule and Circuit Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Weekend Schedule */}
              <Card className="bg-gradient-to-br from-background to-muted/10 border-border/30">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CalendarIcon className="h-5 w-5 text-primary" />
                    <span>Weekend Schedule</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedRace.sessions.map((session, index) => (
                      <div 
                        key={index} 
                        className={`p-4 rounded-lg transition-all ${
                          session.completed 
                            ? 'bg-green-500/5 border-green-500/20 hover:bg-green-500/10' 
                            : 'bg-muted/5 border-border/30 hover:bg-muted/10'
                        } border`}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-3">
                            {session.completed ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <Clock className="h-5 w-5 text-muted-foreground" />
                            )}
                            <div>
                              <p className="font-medium">{session.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {formatDate(session.date)}
                              </p>
                            </div>
                          </div>
                          <span className="font-medium bg-background/80 px-3 py-1 rounded-full text-sm">
                            {formatSessionTime(session.date, session.time)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Race Results */}
            {selectedRace.results && (
              <Card className="mb-8 bg-gradient-to-br from-background to-muted/10 border-border/30">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="h-5 w-5 text-primary" />
                    <span>Race Results</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border/50">
                          <th className="text-left py-3 px-4 text-muted-foreground">Pos</th>
                          <th className="text-left py-3 px-4 text-muted-foreground">Driver</th>
                          <th className="text-left py-3 px-4 text-muted-foreground">Team</th>
                          <th className="text-right py-3 px-4 text-muted-foreground">Points</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedRace.results.map((result) => (
                          <tr 
                            key={result.position} 
                            className={`border-b border-border/20 hover:bg-muted/30 transition-colors ${
                              result.position === 1 ? 'bg-yellow-500/5' : 
                              result.position === 2 ? 'bg-gray-400/5' : 
                              result.position === 3 ? 'bg-orange-500/5' : ''
                            }`}
                          >
                            <td className="py-3 px-4 font-medium">
                              <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${
                                result.position === 1 ? 'bg-yellow-500 text-white' : 
                                result.position === 2 ? 'bg-gray-400 text-white' : 
                                result.position === 3 ? 'bg-orange-500 text-white' : 'bg-muted'
                              }`}>
                                {result.position}
                              </span>
                            </td>
                            <td className="py-3 px-4 font-medium">{result.driver}</td>
                            <td className="py-3 px-4 text-muted-foreground">{result.team}</td>
                            <td className="py-3 px-4 text-right font-medium">
                              <Badge variant="outline" className="px-2">
                                {result.points} pts
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setSelectedRace(null)}
                className="border-primary/30 hover:bg-primary/5 hover:border-primary/50"
              >
                Close
              </Button>
              <Button className="bg-gradient-to-r from-primary to-red-600 hover:from-primary/90 hover:to-red-600/90">
                View Full Results <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
</div>
  );
};

export default Calendar;