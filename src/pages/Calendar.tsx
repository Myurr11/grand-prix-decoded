
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, MapPin, Clock, Trophy, Flag, Users, Zap, Download, ExternalLink, RefreshCw, ChevronRight, X, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

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

  // Complete 2024 F1 Season Calendar
  const manualRaceCalendar: Race[] = [
    {
      round: 1,
      raceName: 'Bahrain Grand Prix',
      circuit: 'Bahrain International Circuit',
      location: 'Sakhir, Bahrain',
      country: 'Bahrain',
      date: '2024-03-02',
      time: '15:00',
      trackImage: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677244984/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Bahrain_Circuit.png.transform/8col-retina/image.png',
      status: 'completed',
      fpDate: '2024-02-29',
      qualifyingDate: '2024-03-01',
      results: [
        { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing', time: '1:31:44.742', points: 26 },
        { position: 2, driver: 'Sergio Pérez', team: 'Red Bull Racing', time: '+22.457', points: 18 },
        { position: 3, driver: 'Carlos Sainz', team: 'Ferrari', time: '+25.110', points: 15 },
      ]
    },
    {
      round: 2,
      raceName: 'Saudi Arabian Grand Prix',
      circuit: 'Jeddah Corniche Circuit',
      location: 'Jeddah, Saudi Arabia',
      country: 'Saudi Arabia',
      date: '2024-03-09',
      time: '20:00',
      trackImage: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677244984/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Saudi_Arabia_Circuit.png.transform/8col-retina/image.png',
      status: 'completed',
      fpDate: '2024-03-07',
      qualifyingDate: '2024-03-08',
      results: [
        { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing', time: '1:20:43.273', points: 25 },
        { position: 2, driver: 'Sergio Pérez', team: 'Red Bull Racing', time: '+13.643', points: 19 },
        { position: 3, driver: 'Charles Leclerc', team: 'Ferrari', time: '+18.639', points: 15 },
      ]
    },
    {
      round: 3,
      raceName: 'Australian Grand Prix',
      circuit: 'Albert Park Circuit',
      location: 'Melbourne, Australia',
      country: 'Australia',
      date: '2024-03-24',
      time: '05:00',
      trackImage: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677244984/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Australia_Circuit.png.transform/8col-retina/image.png',
      status: 'completed',
      fpDate: '2024-03-22',
      qualifyingDate: '2024-03-23',
      results: [
        { position: 1, driver: 'Carlos Sainz', team: 'Ferrari', time: '1:20:26.843', points: 25 },
        { position: 2, driver: 'Charles Leclerc', team: 'Ferrari', time: '+2.366', points: 18 },
        { position: 3, driver: 'Lando Norris', team: 'McLaren', time: '+5.904', points: 15 },
      ]
    },
    {
      round: 4,
      raceName: 'Japanese Grand Prix',
      circuit: 'Suzuka International Racing Course',
      location: 'Suzuka, Japan',
      country: 'Japan',
      date: '2024-04-07',
      time: '05:00',
      trackImage: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677244984/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Japan_Circuit.png.transform/8col-retina/image.png',
      status: 'completed',
      fpDate: '2024-04-05',
      qualifyingDate: '2024-04-06',
      results: [
        { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing', time: '1:54:23.566', points: 26 },
        { position: 2, driver: 'Sergio Pérez', team: 'Red Bull Racing', time: '+12.535', points: 18 },
        { position: 3, driver: 'Carlos Sainz', team: 'Ferrari', time: '+20.866', points: 15 },
      ]
    },
    {
      round: 5,
      raceName: 'Chinese Grand Prix',
      circuit: 'Shanghai International Circuit',
      location: 'Shanghai, China',
      country: 'China',
      date: '2024-04-21',
      time: '07:00',
      trackImage: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677244984/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/China_Circuit.png.transform/8col-retina/image.png',
      status: 'completed',
      fpDate: '2024-04-19',
      qualifyingDate: '2024-04-20',
      results: [
        { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing', time: '1:40:52.554', points: 25 },
        { position: 2, driver: 'Lando Norris', team: 'McLaren', time: '+13.773', points: 18 },
        { position: 3, driver: 'Sergio Pérez', team: 'Red Bull Racing', time: '+19.160', points: 16 },
      ]
    },
    {
      round: 6,
      raceName: 'Miami Grand Prix',
      circuit: 'Miami International Autodrome',
      location: 'Miami, USA',
      country: 'USA',
      date: '2024-05-05',
      time: '16:00',
      trackImage: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677244984/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Miami_Circuit.png.transform/8col-retina/image.png',
      status: 'completed',
      fpDate: '2024-05-03',
      qualifyingDate: '2024-05-04',
      results: [
        { position: 1, driver: 'Lando Norris', team: 'McLaren', time: '1:30:49.876', points: 25 },
        { position: 2, driver: 'Max Verstappen', team: 'Red Bull Racing', time: '+7.612', points: 18 },
        { position: 3, driver: 'Charles Leclerc', team: 'Ferrari', time: '+9.920', points: 15 },
      ]
    },
    {
      round: 7,
      raceName: 'Emilia Romagna Grand Prix',
      circuit: 'Imola Circuit',
      location: 'Imola, Italy',
      country: 'Italy',
      date: '2024-05-19',
      time: '15:00',
      trackImage: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677244984/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Emilia_Romagna_Circuit.png.transform/8col-retina/image.png',
      status: 'completed',
      fpDate: '2024-05-17',
      qualifyingDate: '2024-05-18',
      results: [
        { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing', time: '1:25:25.252', points: 25 },
        { position: 2, driver: 'Lando Norris', team: 'McLaren', time: '+0.725', points: 19 },
        { position: 3, driver: 'Charles Leclerc', team: 'Ferrari', time: '+7.916', points: 15 },
      ]
    },
    {
      round: 8,
      raceName: 'Monaco Grand Prix',
      circuit: 'Circuit de Monaco',
      location: 'Monte Carlo, Monaco',
      country: 'Monaco',
      date: '2024-05-26',
      time: '15:00',
      trackImage: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677244984/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Monaco_Circuit.png.transform/8col-retina/image.png',
      status: 'completed',
      fpDate: '2024-05-24',
      qualifyingDate: '2024-05-25',
      results: [
        { position: 1, driver: 'Charles Leclerc', team: 'Ferrari', time: '1:49:28.142', points: 25 },
        { position: 2, driver: 'Oscar Piastri', team: 'McLaren', time: '+7.152', points: 18 },
        { position: 3, driver: 'Carlos Sainz', team: 'Ferrari', time: '+7.585', points: 15 },
      ]
    },
    {
      round: 9,
      raceName: 'Canadian Grand Prix',
      circuit: 'Circuit Gilles Villeneuve',
      location: 'Montreal, Canada',
      country: 'Canada',
      date: '2024-06-09',
      time: '14:00',
      trackImage: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677244984/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Canada_Circuit.png.transform/8col-retina/image.png',
      status: 'completed',
      fpDate: '2024-06-07',
      qualifyingDate: '2024-06-08',
      results: [
        { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing', time: '1:45:47.927', points: 25 },
        { position: 2, driver: 'Lando Norris', team: 'McLaren', time: '+3.879', points: 19 },
        { position: 3, driver: 'George Russell', team: 'Mercedes', time: '+4.317', points: 15 },
      ]
    },
    {
      round: 10,
      raceName: 'Spanish Grand Prix',
      circuit: 'Circuit de Barcelona-Catalunya',
      location: 'Barcelona, Spain',
      country: 'Spain',
      date: '2024-06-23',
      time: '15:00',
      trackImage: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677244984/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Spain_Circuit.png.transform/8col-retina/image.png',
      status: 'completed',
      fpDate: '2024-06-21',
      qualifyingDate: '2024-06-22',
      results: [
        { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing', time: '1:28:20.227', points: 25 },
        { position: 2, driver: 'Lando Norris', team: 'McLaren', time: '+2.219', points: 18 },
        { position: 3, driver: 'Lewis Hamilton', team: 'Mercedes', time: '+17.790', points: 16 },
      ]
    },
    {
      round: 11,
      raceName: 'Austrian Grand Prix',
      circuit: 'Red Bull Ring',
      location: 'Spielberg, Austria',
      country: 'Austria',
      date: '2024-06-30',
      time: '15:00',
      trackImage: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677244984/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Austria_Circuit.png.transform/8col-retina/image.png',
      status: 'completed',
      fpDate: '2024-06-28',
      qualifyingDate: '2024-06-29',
      results: [
        { position: 1, driver: 'George Russell', team: 'Mercedes', time: '1:24:22.798', points: 25 },
        { position: 2, driver: 'Oscar Piastri', team: 'McLaren', time: '+1.906', points: 18 },
        { position: 3, driver: 'Carlos Sainz', team: 'Ferrari', time: '+4.533', points: 15 },
      ]
    },
    {
      round: 12,
      raceName: 'British Grand Prix',
      circuit: 'Silverstone Circuit',
      location: 'Silverstone, UK',
      country: 'UK',
      date: '2024-07-07',
      time: '15:00',
      trackImage: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677244984/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Great_Britain_Circuit.png.transform/8col-retina/image.png',
      status: 'completed',
      fpDate: '2024-07-05',
      qualifyingDate: '2024-07-06',
      results: [
        { position: 1, driver: 'Lewis Hamilton', team: 'Mercedes', time: '1:22:27.059', points: 25 },
        { position: 2, driver: 'Max Verstappen', team: 'Red Bull Racing', time: '+1.465', points: 19 },
        { position: 3, driver: 'Lando Norris', team: 'McLaren', time: '+7.547', points: 15 },
      ]
    },
    {
      round: 13,
      raceName: 'Hungarian Grand Prix',
      circuit: 'Hungaroring',
      location: 'Budapest, Hungary',
      country: 'Hungary',
      date: '2024-07-21',
      time: '15:00',
      trackImage: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677244984/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Hungary_Circuit.png.transform/8col-retina/image.png',
      status: 'upcoming',
      fpDate: '2024-07-19',
      qualifyingDate: '2024-07-20'
    },
    {
      round: 14,
      raceName: 'Belgian Grand Prix',
      circuit: 'Circuit de Spa-Francorchamps',
      location: 'Stavelot, Belgium',
      country: 'Belgium',
      date: '2024-07-28',
      time: '15:00',
      trackImage: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677244984/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Belgium_Circuit.png.transform/8col-retina/image.png',
      status: 'upcoming',
      fpDate: '2024-07-26',
      qualifyingDate: '2024-07-27'
    },
    {
      round: 15,
      raceName: 'Dutch Grand Prix',
      circuit: 'Circuit Zandvoort',
      location: 'Zandvoort, Netherlands',
      country: 'Netherlands',
      date: '2024-08-25',
      time: '15:00',
      trackImage: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677244984/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Netherlands_Circuit.png.transform/8col-retina/image.png',
      status: 'upcoming',
      fpDate: '2024-08-23',
      qualifyingDate: '2024-08-24'
    },
    {
      round: 16,
      raceName: 'Italian Grand Prix',
      circuit: 'Monza Circuit',
      location: 'Monza, Italy',
      country: 'Italy',
      date: '2024-09-01',
      time: '15:00',
      trackImage: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677244984/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Italy_Circuit.png.transform/8col-retina/image.png',
      status: 'upcoming',
      fpDate: '2024-08-30',
      qualifyingDate: '2024-08-31'
    },
    {
      round: 17,
      raceName: 'Azerbaijan Grand Prix',
      circuit: 'Baku City Circuit',
      location: 'Baku, Azerbaijan',
      country: 'Azerbaijan',
      date: '2024-09-15',
      time: '13:00',
      trackImage: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677244984/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Azerbaijan_Circuit.png.transform/8col-retina/image.png',
      status: 'upcoming',
      fpDate: '2024-09-13',
      qualifyingDate: '2024-09-14'
    },
    {
      round: 18,
      raceName: 'Singapore Grand Prix',
      circuit: 'Marina Bay Street Circuit',
      location: 'Singapore',
      country: 'Singapore',
      date: '2024-09-22',
      time: '13:00',
      trackImage: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677244984/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Singapore_Circuit.png.transform/8col-retina/image.png',
      status: 'upcoming',
      fpDate: '2024-09-20',
      qualifyingDate: '2024-09-21'
    },
    {
      round: 19,
      raceName: 'United States Grand Prix',
      circuit: 'Circuit of the Americas',
      location: 'Austin, USA',
      country: 'USA',
      date: '2024-10-20',
      time: '14:00',
      trackImage: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677244984/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/USA_Circuit.png.transform/8col-retina/image.png',
      status: 'upcoming',
      fpDate: '2024-10-18',
      qualifyingDate: '2024-10-19'
    },
    {
      round: 20,
      raceName: 'Mexico City Grand Prix',
      circuit: 'Autódromo Hermanos Rodríguez',
      location: 'Mexico City, Mexico',
      country: 'Mexico',
      date: '2024-10-27',
      time: '14:00',
      trackImage: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677244984/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Mexico_Circuit.png.transform/8col-retina/image.png',
      status: 'upcoming',
      fpDate: '2024-10-25',
      qualifyingDate: '2024-10-26'
    },
    {
      round: 21,
      raceName: 'São Paulo Grand Prix',
      circuit: 'Interlagos Circuit',
      location: 'São Paulo, Brazil',
      country: 'Brazil',
      date: '2024-11-03',
      time: '14:00',
      trackImage: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677244984/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Brazil_Circuit.png.transform/8col-retina/image.png',
      status: 'upcoming',
      fpDate: '2024-11-01',
      qualifyingDate: '2024-11-02'
    },
    {
      round: 22,
      raceName: 'Las Vegas Grand Prix',
      circuit: 'Las Vegas Strip Circuit',
      location: 'Las Vegas, USA',
      country: 'USA',
      date: '2024-11-23',
      time: '22:00',
      trackImage: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677244984/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Las_Vegas_Circuit.png.transform/8col-retina/image.png',
      status: 'upcoming',
      fpDate: '2024-11-21',
      qualifyingDate: '2024-11-22'
    },
    {
      round: 23,
      raceName: 'Qatar Grand Prix',
      circuit: 'Lusail International Circuit',
      location: 'Lusail, Qatar',
      country: 'Qatar',
      date: '2024-12-01',
      time: '14:00',
      trackImage: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677244984/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Qatar_Circuit.png.transform/8col-retina/image.png',
      status: 'upcoming',
      fpDate: '2024-11-29',
      qualifyingDate: '2024-11-30'
    },
    {
      round: 24,
      raceName: 'Abu Dhabi Grand Prix',
      circuit: 'Yas Marina Circuit',
      location: 'Abu Dhabi, UAE',
      country: 'UAE',
      date: '2024-12-08',
      time: '13:00',
      trackImage: 'https://media.formula1.com/image/upload/f_auto/q_auto/v1677244984/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Abu_Dhabi_Circuit.png.transform/8col-retina/image.png',
      status: 'upcoming',
      fpDate: '2024-12-06',
      qualifyingDate: '2024-12-07'
    }
  ];

  // Initialize with manual data
  useEffect(() => {
    setRaces(manualRaceCalendar);
  }, []);

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

  const refreshData = () => {
    toast({
      title: "Calendar Refreshed",
      description: "Race calendar is up to date.",
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

      {/* Enhanced Race Details Modal */}
      {selectedRace && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => setSelectedRace(null)}>
          <Card className="max-w-5xl w-full max-h-[90vh] overflow-hidden border-0 shadow-2xl bg-card/95 backdrop-blur-sm" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              {/* Hero Section with Track Image */}
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={selectedRace.trackImage} 
                  alt={selectedRace.circuit}
                  className="w-full h-full object-contain bg-gradient-to-br from-muted/20 to-muted/40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white border-0 backdrop-blur-sm"
                  onClick={() => setSelectedRace(null)}
                >
                  <X className="h-5 w-5" />
                </Button>
                
                {/* Race Info Overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{selectedRace.raceName}</h1>
                  <div className="flex items-center space-x-2 text-lg text-white/90">
                    <MapPin className="h-5 w-5" />
                    <span>{selectedRace.circuit} • {selectedRace.location}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-18rem)]">
                <CardContent className="p-8 space-y-8">
                  {/* Race Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="p-6 border border-border/50 bg-gradient-to-br from-card to-muted/30">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-racing-red/10 rounded-full">
                          <CalendarIcon className="h-6 w-6 text-racing-red" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground font-medium">Race Date</p>
                          <p className="font-bold text-lg">{formatDate(selectedRace.date)}</p>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6 border border-border/50 bg-gradient-to-br from-card to-muted/30">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-racing-red/10 rounded-full">
                          <Clock className="h-6 w-6 text-racing-red" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground font-medium">Start Time</p>
                          <p className="font-bold text-lg">{formatTime(selectedRace.time)} UTC</p>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6 border border-border/50 bg-gradient-to-br from-card to-muted/30">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-racing-red/10 rounded-full">
                          <MapPin className="h-6 w-6 text-racing-red" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground font-medium">Location</p>
                          <p className="font-bold text-lg">{selectedRace.country}</p>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Weekend Schedule */}
                  {(selectedRace.fpDate || selectedRace.qualifyingDate) && (
                    <div>
                      <h4 className="text-2xl font-bold mb-6 flex items-center space-x-2">
                        <Flag className="h-6 w-6 text-racing-red" />
                        <span>Weekend Schedule</span>
                      </h4>
                      <div className="grid gap-4">
                        {selectedRace.fpDate && (
                          <Card className="p-4 border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50/50 to-transparent">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="p-2 bg-blue-100 rounded-full">
                                  <Zap className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                  <span className="font-semibold">Practice Sessions</span>
                                  <p className="text-sm text-muted-foreground">Free Practice 1, 2 & 3</p>
                                </div>
                              </div>
                              <span className="text-muted-foreground font-medium">{formatDate(selectedRace.fpDate)}</span>
                            </div>
                          </Card>
                        )}
                        {selectedRace.qualifyingDate && (
                          <Card className="p-4 border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50/50 to-transparent">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="p-2 bg-purple-100 rounded-full">
                                  <Trophy className="h-5 w-5 text-purple-600" />
                                </div>
                                <div>
                                  <span className="font-semibold">Qualifying Session</span>
                                  <p className="text-sm text-muted-foreground">Grid position determination</p>
                                </div>
                              </div>
                              <span className="text-muted-foreground font-medium">{formatDate(selectedRace.qualifyingDate)}</span>
                            </div>
                          </Card>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Race Results */}
                  {selectedRace.results && (
                    <div>
                      <h3 className="text-2xl font-bold mb-6 flex items-center space-x-2">
                        <Trophy className="h-6 w-6 text-racing-red" />
                        <span>Race Results</span>
                      </h3>
                      <div className="space-y-3">
                        {selectedRace.results.map((result, index) => (
                          <Card 
                            key={result.position} 
                            className={`p-5 transition-all duration-300 hover:shadow-lg ${
                              index === 0 ? 'border-l-4 border-l-yellow-500 bg-gradient-to-r from-yellow-50/80 to-transparent' :
                              index === 1 ? 'border-l-4 border-l-gray-400 bg-gradient-to-r from-gray-50/80 to-transparent' :
                              index === 2 ? 'border-l-4 border-l-orange-500 bg-gradient-to-r from-orange-50/80 to-transparent' :
                              'border border-border/50 bg-card/50'
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <div className="flex items-center space-x-4">
                                <Badge 
                                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                                    index === 0 ? 'bg-yellow-500 text-black shadow-lg' :
                                    index === 1 ? 'bg-gray-400 text-black shadow-lg' :
                                    index === 2 ? 'bg-orange-500 text-white shadow-lg' :
                                    'bg-muted text-muted-foreground'
                                  }`}
                                >
                                  {result.position}
                                </Badge>
                                <div>
                                  <div className="font-bold text-xl">{result.driver}</div>
                                  <div className="text-sm text-muted-foreground font-medium">{result.team}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-lg">{result.time}</div>
                                <div className="text-sm text-muted-foreground font-medium">{result.points} points</div>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <div className="pt-6 border-t border-border/50">
                    <Button 
                      className="w-full bg-racing-red hover:bg-racing-red/90 text-white"
                      onClick={() => setSelectedRace(null)}
                    >
                      Close Details
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Calendar;