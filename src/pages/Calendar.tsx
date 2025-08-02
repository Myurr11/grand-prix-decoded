
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, MapPin, Clock, Trophy, Flag, Users, ChevronsUpDown, Download, ExternalLink, RefreshCw, ChevronRight, X, ArrowRight, CheckCircle, PlayCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface RaceResult {
  position: number;
  driver: string;
  team: string;
  time?: string;
  points: number;
  laps: number;
}

interface RaceSession {
  name: string;
  date: string;
  time: string;
  completed: boolean;
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
  realLifeImage: string;
  status: 'upcoming' | 'completed' | 'live';
  results?: RaceResult[];
  sessions: RaceSession[];
  circuitLength: string;
  laps: number;
  raceDistance: string;
  lapRecord: {
    driver: string;
    time: string;
    year: string;
  };
  firstGrandPrix: string;
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
        realLifeImage: 'https://autogear.pt/wp-content/uploads/2025/02/Bahrain-Grand-Prix-1000x570.jpg',
        status: 'completed',
        circuitLength: '5.412 km',
        laps: 57,
        raceDistance: '308.238 km',
        lapRecord: {
          driver: 'Pedro de la Rosa',
          time: '1:31.447',
          year: '2005'
        },
        firstGrandPrix: '2004',
        sessions: [
          { name: 'Practice 1', date: '2024-02-29', time: '12:00', completed: true },
          { name: 'Practice 2', date: '2024-02-29', time: '15:30', completed: true },
          { name: 'Practice 3', date: '2024-03-01', time: '12:30', completed: true },
          { name: 'Qualifying', date: '2024-03-01', time: '16:00', completed: true },
          { name: 'Race', date: '2024-03-02', time: '15:00', completed: true }
        ],
        results: [
          { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing', time: '1:31:44.742', points: 26, laps: 57 },
          { position: 2, driver: 'Sergio Pérez', team: 'Red Bull Racing', time: '+22.457', points: 18, laps: 57 },
          { position: 3, driver: 'Carlos Sainz', team: 'Ferrari', time: '+25.110', points: 15, laps: 57 },
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
        realLifeImage: 'https://www.total-motorsport.com/wp-content/uploads/2023/03/SI202303170966-1024x683.jpg',
        status: 'completed',
        circuitLength: '6.174 km',
        laps: 50,
        raceDistance: '308.450 km',
        lapRecord: {
          driver: 'Lewis Hamilton',
          time: '1:30.734',
          year: '2021'
        },
        firstGrandPrix: '2021',
        sessions: [
          { name: 'Practice 1', date: '2024-03-07', time: '16:30', completed: true },
          { name: 'Practice 2', date: '2024-03-07', time: '20:00', completed: true },
          { name: 'Practice 3', date: '2024-03-08', time: '16:30', completed: true },
          { name: 'Qualifying', date: '2024-03-08', time: '20:00', completed: true },
          { name: 'Race', date: '2024-03-09', time: '20:00', completed: true }
        ],
        results: [
          { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing', time: '1:20:43.273', points: 25, laps: 50 },
          { position: 2, driver: 'Sergio Pérez', team: 'Red Bull Racing', time: '+13.643', points: 19, laps: 50 },
          { position: 3, driver: 'Charles Leclerc', team: 'Ferrari', time: '+18.639', points: 15, laps: 50 },
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
        realLifeImage: 'https://motorsporttickets.com/blog/wp-content/uploads/2024/08/1020080097-LAT-20240323-GP2403_170112_FC17049.jpg',
        status: 'completed',
        circuitLength: '5.278 km',
        laps: 58,
        raceDistance: '306.124 km',
        lapRecord: {
          driver: 'Charles Leclerc',
          time: '1:20.260',
          year: '2022'
        },
        firstGrandPrix: '1996',
        sessions: [
          { name: 'Practice 1', date: '2024-03-22', time: '12:30', completed: true },
          { name: 'Practice 2', date: '2024-03-22', time: '16:00', completed: true },
          { name: 'Practice 3', date: '2024-03-23', time: '12:30', completed: true },
          { name: 'Qualifying', date: '2024-03-23', time: '16:00', completed: true },
          { name: 'Race', date: '2024-03-24', time: '15:00', completed: true }
        ],
        results: [
          { position: 1, driver: 'Carlos Sainz', team: 'Ferrari', time: '1:20:26.843', points: 25, laps: 58 },
          { position: 2, driver: 'Charles Leclerc', team: 'Ferrari', time: '+2.366', points: 18, laps: 58 },
          { position: 3, driver: 'Lando Norris', team: 'McLaren', time: '+5.904', points: 15, laps: 58 },
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
        realLifeImage: 'https://media.formula1.com/image/upload/t_16by9South/c_lfill,w_3392/q_auto/v1740000000/trackside-images/2024/F1_Grand_Prix_of_Japan/2147405986.webp',
        status: 'completed',
        circuitLength: '5.807 km',
        laps: 53,
        raceDistance: '307.471 km',
        lapRecord: {
          driver: 'Lewis Hamilton',
          time: '1:30.983',
          year: '2019'
        },
        firstGrandPrix: '1987',
        sessions: [
          { name: 'Practice 1', date: '2024-04-05', time: '11:30', completed: true },
          { name: 'Practice 2', date: '2024-04-05', time: '15:00', completed: true },
          { name: 'Practice 3', date: '2024-04-06', time: '11:30', completed: true },
          { name: 'Qualifying', date: '2024-04-06', time: '15:00', completed: true },
          { name: 'Race', date: '2024-04-07', time: '14:00', completed: true }
        ],
        results: [
          { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing', time: '1:54:23.566', points: 26, laps: 53 },
          { position: 2, driver: 'Sergio Pérez', team: 'Red Bull Racing', time: '+12.535', points: 18, laps: 53 },
          { position: 3, driver: 'Carlos Sainz', team: 'Ferrari', time: '+20.866', points: 15, laps: 53 },
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
        realLifeImage: 'https://media.formula1.com/image/upload/t_16by9South/c_lfill,w_3392/q_auto/v1740000000/fom-website/2025/China/GettyImages-2147970664.webp',
        status: 'completed',
        circuitLength: '5.451 km',
        laps: 56,
        raceDistance: '305.066 km',
        lapRecord: {
          driver: 'Michael Schumacher',
          time: '1:32.238',
          year: '2004'
        },
        firstGrandPrix: '2004',
        sessions: [
          { name: 'Practice 1', date: '2024-04-19', time: '04:30', completed: true },
          { name: 'Sprint Qualifying', date: '2024-04-19', time: '08:30', completed: true },
          { name: 'Sprint Race', date: '2024-04-20', time: '04:00', completed: true },
          { name: 'Qualifying', date: '2024-04-20', time: '08:00', completed: true },
          { name: 'Race', date: '2024-04-21', time: '07:00', completed: true }
        ],
        results: [
          { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing', time: '1:40:52.554', points: 25, laps: 56 },
          { position: 2, driver: 'Lando Norris', team: 'McLaren', time: '+13.773', points: 18, laps: 56 },
          { position: 3, driver: 'Sergio Pérez', team: 'Red Bull Racing', time: '+19.160', points: 16, laps: 56 },
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
        realLifeImage: 'https://hips.hearstapps.com/hmg-prod/images/general-view-of-the-race-action-during-the-f1-grand-prix-of-news-photo-1746211243.pjpeg?crop=1.00xw:0.918xh;0,0.0357xh&resize=980:*',
        status: 'completed',
        circuitLength: '5.412 km',
        laps: 57,
        raceDistance: '308.326 km',
        lapRecord: {
          driver: 'Max Verstappen',
          time: '1:29.708',
          year: '2023'
        },
        firstGrandPrix: '2022',
        sessions: [
          { name: 'Practice 1', date: '2024-05-03', time: '12:30', completed: true },
          { name: 'Sprint Qualifying', date: '2024-05-03', time: '16:30', completed: true },
          { name: 'Sprint Race', date: '2024-05-04', time: '12:00', completed: true },
          { name: 'Qualifying', date: '2024-05-04', time: '16:00', completed: true },
          { name: 'Race', date: '2024-05-05', time: '16:00', completed: true }
        ],
        results: [
          { position: 1, driver: 'Lando Norris', team: 'McLaren', time: '1:30:49.876', points: 25, laps: 57 },
          { position: 2, driver: 'Max Verstappen', team: 'Red Bull Racing', time: '+7.612', points: 18, laps: 57 },
          { position: 3, driver: 'Charles Leclerc', team: 'Ferrari', time: '+9.920', points: 15, laps: 57 },
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
        realLifeImage: 'https://www.total-motorsport.com/wp-content/uploads/2024/05/240030-scuderia-ferrari-emilia-romagna-gp-friday_d6c2c9c8-49fd-4873-8fa2-7024e7781b2a-2048x1366.jpg',
        status: 'completed',
        circuitLength: '4.909 km',
        laps: 63,
        raceDistance: '309.049 km',
        lapRecord: {
          driver: 'Lewis Hamilton',
          time: '1:15.484',
          year: '2020'
        },
        firstGrandPrix: '1980',
        sessions: [
          { name: 'Practice 1', date: '2024-05-17', time: '13:30', completed: true },
          { name: 'Practice 2', date: '2024-05-17', time: '17:00', completed: true },
          { name: 'Practice 3', date: '2024-05-18', time: '12:30', completed: true },
          { name: 'Qualifying', date: '2024-05-18', time: '16:00', completed: true },
          { name: 'Race', date: '2024-05-19', time: '15:00', completed: true }
        ],
        results: [
          { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing', time: '1:25:25.252', points: 25, laps: 63 },
          { position: 2, driver: 'Lando Norris', team: 'McLaren', time: '+0.725', points: 19, laps: 63 },
          { position: 3, driver: 'Charles Leclerc', team: 'Ferrari', time: '+7.916', points: 15, laps: 63 },
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
        realLifeImage: 'https://blog.savills.com/_images/monaco-grand-prix---linity-media.jpg',
        status: 'completed',
        circuitLength: '3.337 km',
        laps: 78,
        raceDistance: '260.286 km',
        lapRecord: {
          driver: 'Lewis Hamilton',
          time: '1:12.909',
          year: '2021'
        },
        firstGrandPrix: '1950',
        sessions: [
          { name: 'Practice 1', date: '2024-05-24', time: '13:30', completed: true },
          { name: 'Practice 2', date: '2024-05-24', time: '17:00', completed: true },
          { name: 'Practice 3', date: '2024-05-25', time: '12:30', completed: true },
          { name: 'Qualifying', date: '2024-05-25', time: '16:00', completed: true },
          { name: 'Race', date: '2024-05-26', time: '15:00', completed: true }
        ],
        results: [
          { position: 1, driver: 'Charles Leclerc', team: 'Ferrari', time: '1:49:28.142', points: 25, laps: 78 },
          { position: 2, driver: 'Oscar Piastri', team: 'McLaren', time: '+7.152', points: 18, laps: 78 },
          { position: 3, driver: 'Carlos Sainz', team: 'Ferrari', time: '+7.585', points: 15, laps: 78 },
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
        realLifeImage: 'https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/c72f/live/6e13bc70-3f0c-11f0-8acc-376867527657.jpg.webp',
        status: 'completed',
        circuitLength: '4.361 km',
        laps: 70,
        raceDistance: '305.270 km',
        lapRecord: {
          driver: 'Valtteri Bottas',
          time: '1:13.078',
          year: '2019'
        },
        firstGrandPrix: '1967',
        sessions: [
          { name: 'Practice 1', date: '2024-06-07', time: '12:30', completed: true },
          { name: 'Practice 2', date: '2024-06-07', time: '16:00', completed: true },
          { name: 'Practice 3', date: '2024-06-08', time: '11:30', completed: true },
          { name: 'Qualifying', date: '2024-06-08', time: '15:00', completed: true },
          { name: 'Race', date: '2024-06-09', time: '14:00', completed: true }
        ],
        results: [
          { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing', time: '1:45:47.927', points: 25, laps: 70 },
          { position: 2, driver: 'Lando Norris', team: 'McLaren', time: '+3.879', points: 19, laps: 70 },
          { position: 3, driver: 'George Russell', team: 'Mercedes', time: '+4.317', points: 15, laps: 70 },
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
        realLifeImage: 'https://www.grandprix247.com/wp-content/uploads/2019/05/D6NRJWnXsAAdjTW.jpg',
        status: 'completed',
        circuitLength: '4.675 km',
        laps: 66,
        raceDistance: '308.424 km',
        lapRecord: {
          driver: 'Max Verstappen',
          time: '1:16.330',
          year: '2023'
        },
        firstGrandPrix: '1991',
        sessions: [
          { name: 'Practice 1', date: '2024-06-21', time: '12:30', completed: true },
          { name: 'Practice 2', date: '2024-06-21', time: '16:00', completed: true },
          { name: 'Practice 3', date: '2024-06-22', time: '11:30', completed: true },
          { name: 'Qualifying', date: '2024-06-22', time: '15:00', completed: true },
          { name: 'Race', date: '2024-06-23', time: '15:00', completed: true }
        ],
        results: [
          { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing', time: '1:28:20.227', points: 25, laps: 66 },
          { position: 2, driver: 'Lando Norris', team: 'McLaren', time: '+2.219', points: 18, laps: 66 },
          { position: 3, driver: 'Lewis Hamilton', team: 'Mercedes', time: '+17.790', points: 16, laps: 66 },
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
        realLifeImage: 'https://grandprixexperience.com/wp-content/uploads/2022/07/Red-Bull-Ring.jpg',
        status: 'completed',
        circuitLength: '4.318 km',
        laps: 71,
        raceDistance: '306.452 km',
        lapRecord: {
          driver: 'Carlos Sainz',
          time: '1:05.619',
          year: '2020'
        },
        firstGrandPrix: '1970',
        sessions: [
          { name: 'Practice 1', date: '2024-06-28', time: '12:30', completed: true },
          { name: 'Sprint Qualifying', date: '2024-06-28', time: '16:30', completed: true },
          { name: 'Sprint Race', date: '2024-06-29', time: '12:00', completed: true },
          { name: 'Qualifying', date: '2024-06-29', time: '16:00', completed: true },
          { name: 'Race', date: '2024-06-30', time: '15:00', completed: true }
        ],
        results: [
          { position: 1, driver: 'George Russell', team: 'Mercedes', time: '1:24:22.798', points: 25, laps: 71 },
          { position: 2, driver: 'Oscar Piastri', team: 'McLaren', time: '+1.906', points: 18, laps: 71 },
          { position: 3, driver: 'Carlos Sainz', team: 'Ferrari', time: '+4.533', points: 15, laps: 71 },
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
        realLifeImage: 'https://library.sportingnews.com/styles/crop_style_16_9_desktop_webp/s3/2022-07/Silverstone.jpg.webp?itok=S2iDYCLV',
        status: 'completed',
        circuitLength: '5.891 km',
        laps: 52,
        raceDistance: '306.198 km',
        lapRecord: {
          driver: 'Max Verstappen',
          time: '1:27.097',
          year: '2020'
        },
        firstGrandPrix: '1950',
        sessions: [
          { name: 'Practice 1', date: '2024-07-05', time: '12:30', completed: true },
          { name: 'Practice 2', date: '2024-07-05', time: '16:00', completed: true },
          { name: 'Practice 3', date: '2024-07-06', time: '11:30', completed: true },
          { name: 'Qualifying', date: '2024-07-06', time: '15:00', completed: true },
          { name: 'Race', date: '2024-07-07', time: '15:00', completed: true }
        ],
        results: [
          { position: 1, driver: 'Lewis Hamilton', team: 'Mercedes', time: '1:22:27.059', points: 25, laps: 52 },
          { position: 2, driver: 'Max Verstappen', team: 'Red Bull Racing', time: '+1.465', points: 19, laps: 52 },
          { position: 3, driver: 'Lando Norris', team: 'McLaren', time: '+7.547', points: 15, laps: 52 },
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
        realLifeImage: 'https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/b732/live/08d9b080-6b08-11f0-b68b-71e63fac86aa.jpg.webp',
        status: 'upcoming',
        circuitLength: '4.381 km',
        laps: 70,
        raceDistance: '306.630 km',
        lapRecord: {
          driver: 'Lewis Hamilton',
          time: '1:16.627',
          year: '2020'
        },
        firstGrandPrix: '1986',
        sessions: [
          { name: 'Practice 1', date: '2024-07-19', time: '13:30', completed: false },
          { name: 'Practice 2', date: '2024-07-19', time: '17:00', completed: false },
          { name: 'Practice 3', date: '2024-07-20', time: '12:30', completed: false },
          { name: 'Qualifying', date: '2024-07-20', time: '16:00', completed: false },
          { name: 'Race', date: '2024-07-21', time: '15:00', completed: false }
        ]
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
        realLifeImage: 'https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000000/content/dam/fom-website/2018-redesign-assets/Racehub%20header%20images%2016x9/Belgium.webp',
        status: 'upcoming',
        circuitLength: '7.004 km',
        laps: 44,
        raceDistance: '308.052 km',
        lapRecord: {
          driver: 'Valtteri Bottas',
          time: '1:46.286',
          year: '2018'
        },
        firstGrandPrix: '1950',
        sessions: [
          { name: 'Practice 1', date: '2024-07-26', time: '13:30', completed: false },
          { name: 'Practice 2', date: '2024-07-26', time: '17:00', completed: false },
          { name: 'Practice 3', date: '2024-07-27', time: '12:30', completed: false },
          { name: 'Qualifying', date: '2024-07-27', time: '16:00', completed: false },
          { name: 'Race', date: '2024-07-28', time: '15:00', completed: false }
        ]
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
        realLifeImage: 'https://stacksfs.com/wp-content/uploads/2024/08/race-winner-max-verstappen-red.jpg',
        status: 'upcoming',
        circuitLength: '4.259 km',
        laps: 72,
        raceDistance: '306.648 km',
        lapRecord: {
          driver: 'Lewis Hamilton',
          time: '1:11.097',
          year: '2021'
        },
        firstGrandPrix: '1952',
        sessions: [
          { name: 'Practice 1', date: '2024-08-23', time: '13:30', completed: false },
          { name: 'Practice 2', date: '2024-08-23', time: '17:00', completed: false },
          { name: 'Practice 3', date: '2024-08-24', time: '12:30', completed: false },
          { name: 'Qualifying', date: '2024-08-24', time: '16:00', completed: false },
          { name: 'Race', date: '2024-08-25', time: '15:00', completed: false }
        ]
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
        realLifeImage: 'https://raceexperiences.com/wp-content/uploads/2023/02/IMG_20210912_144548_801_2-min-1024x576.jpg',
        status: 'upcoming',
        circuitLength: '5.793 km',
        laps: 53,
        raceDistance: '306.720 km',
        lapRecord: {
          driver: 'Rubens Barrichello',
          time: '1:21.046',
          year: '2004'
        },
        firstGrandPrix: '1950',
        sessions: [
          { name: 'Practice 1', date: '2024-08-30', time: '13:30', completed: false },
          { name: 'Practice 2', date: '2024-08-30', time: '17:00', completed: false },
          { name: 'Practice 3', date: '2024-08-31', time: '12:30', completed: false },
          { name: 'Qualifying', date: '2024-08-31', time: '16:00', completed: false },
          { name: 'Race', date: '2024-09-01', time: '15:00', completed: false }
        ]
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
        realLifeImage: 'https://www.idman.biz/media/2025/04/22/1920x1280/74251.jpg?v=1745306073',
        status: 'upcoming',
        circuitLength: '6.003 km',
        laps: 51,
        raceDistance: '306.049 km',
        lapRecord: {
          driver: 'Charles Leclerc',
          time: '1:43.009',
          year: '2019'
        },
        firstGrandPrix: '2017',
        sessions: [
          { name: 'Practice 1', date: '2024-09-13', time: '11:30', completed: false },
          { name: 'Practice 2', date: '2024-09-13', time: '15:00', completed: false },
          { name: 'Practice 3', date: '2024-09-14', time: '11:30', completed: false },
          { name: 'Qualifying', date: '2024-09-14', time: '15:00', completed: false },
          { name: 'Race', date: '2024-09-15', time: '13:00', completed: false }
        ]
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
        realLifeImage: 'https://motorsporttickets.com/blog/wp-content/uploads/2021/04/hide-ishi-FD61TgTehqQ-unsplash.jpg',
        status: 'upcoming',
        circuitLength: '4.940 km',
        laps: 62,
        raceDistance: '306.143 km',
        lapRecord: {
          driver: 'Lewis Hamilton',
          time: '1:41.905',
          year: '2023'
        },
        firstGrandPrix: '2008',
        sessions: [
          { name: 'Practice 1', date: '2024-09-20', time: '17:30', completed: false },
          { name: 'Practice 2', date: '2024-09-20', time: '21:00', completed: false },
          { name: 'Practice 3', date: '2024-09-21', time: '17:30', completed: false },
          { name: 'Qualifying', date: '2024-09-21', time: '21:00', completed: false },
          { name: 'Race', date: '2024-09-22', time: '20:00', completed: false }
        ]
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
        realLifeImage: 'https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000000/fom-website/2024/United%20States%20(Austin)/austin-f1-2023-aerial.webp',
        status: 'upcoming',
        circuitLength: '5.513 km',
        laps: 56,
        raceDistance: '308.405 km',
        lapRecord: {
          driver: 'Charles Leclerc',
          time: '1:36.169',
          year: '2019'
        },
        firstGrandPrix: '2012',
        sessions: [
          { name: 'Practice 1', date: '2024-10-18', time: '12:30', completed: false },
          { name: 'Sprint Qualifying', date: '2024-10-18', time: '16:30', completed: false },
          { name: 'Sprint Race', date: '2024-10-19', time: '12:00', completed: false },
          { name: 'Qualifying', date: '2024-10-19', time: '16:00', completed: false },
          { name: 'Race', date: '2024-10-20', time: '14:00', completed: false }
        ]
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
        realLifeImage: 'https://cdn.williamsf1.tech/images/fnx611yr/production/5b45e32be2b1f6c00cdeff1782f25df7fa922058-5181x2914.jpg?w=1200&auto=format',
        status: 'upcoming',
        circuitLength: '4.304 km',
        laps: 71,
        raceDistance: '305.354 km',
        lapRecord: {
          driver: 'Valtteri Bottas',
          time: '1:18.741',
          year: '2021'
        },
        firstGrandPrix: '1963',
        sessions: [
          { name: 'Practice 1', date: '2024-10-25', time: '12:30', completed: false },
          { name: 'Practice 2', date: '2024-10-25', time: '16:00', completed: false },
          { name: 'Practice 3', date: '2024-10-26', time: '11:30', completed: false },
          { name: 'Qualifying', date: '2024-10-26', time: '15:00', completed: false },
          { name: 'Race', date: '2024-10-27', time: '14:00', completed: false }
        ]
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
        realLifeImage: 'https://gpticketstore.vshcdn.net/uploads/images/6055/brazil-f1-tickets-weather.png',
        status: 'upcoming',
        circuitLength: '4.309 km',
        laps: 71,
        raceDistance: '305.909 km',
        lapRecord: {
          driver: 'Valtteri Bottas',
          time: '1:10.540',
          year: '2018'
        },
        firstGrandPrix: '1973',
        sessions: [
          { name: 'Practice 1', date: '2024-11-01', time: '12:30', completed: false },
          { name: 'Sprint Qualifying', date: '2024-11-01', time: '16:30', completed: false },
          { name: 'Sprint Race', date: '2024-11-02', time: '12:00', completed: false },
          { name: 'Qualifying', date: '2024-11-02', time: '16:00', completed: false },
          { name: 'Race', date: '2024-11-03', time: '14:00', completed: false }
        ]
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
        realLifeImage: 'https://motorsporttickets.com/blog/wp-content/uploads/2024/03/Verstappen-at-Las-vegas-GP.png',
        status: 'upcoming',
        circuitLength: '6.201 km',
        laps: 50,
        raceDistance: '310.050 km',
        lapRecord: {
          driver: 'Oscar Piastri',
          time: '1:35.490',
          year: '2023'
        },
        firstGrandPrix: '2023',
        sessions: [
          { name: 'Practice 1', date: '2024-11-21', time: '20:30', completed: false },
          { name: 'Practice 2', date: '2024-11-21', time: '00:00', completed: false },
          { name: 'Practice 3', date: '2024-11-22', time: '20:30', completed: false },
          { name: 'Qualifying', date: '2024-11-22', time: '00:00', completed: false },
          { name: 'Race', date: '2024-11-23', time: '22:00', completed: false }
        ]
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
        realLifeImage: 'https://ct-group.com/me/wp-content/uploads/sites/17/2024/02/Qatar-Grand-Prix-scaled.jpg',
        status: 'upcoming',
        circuitLength: '5.380 km',
        laps: 57,
        raceDistance: '306.660 km',
        lapRecord: {
          driver: 'Max Verstappen',
          time: '1:24.319',
          year: '2023'
        },
        firstGrandPrix: '2021',
        sessions: [
          { name: 'Practice 1', date: '2024-11-29', time: '14:30', completed: false },
          { name: 'Sprint Qualifying', date: '2024-11-29', time: '18:30', completed: false },
          { name: 'Sprint Race', date: '2024-11-30', time: '14:00', completed: false },
          { name: 'Qualifying', date: '2024-11-30', time: '18:00', completed: false },
          { name: 'Race', date: '2024-12-01', time: '14:00', completed: false }
        ]
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
        realLifeImage: 'https://beaumondetraveler.com/wp-content/uploads/2021/01/image-3-829x423.jpg',
        status: 'upcoming',
        circuitLength: '5.281 km',
        laps: 58,
        raceDistance: '306.183 km',
        lapRecord: {
          driver: 'Max Verstappen',
          time: '1:26.993',
          year: '2021'
        },
        firstGrandPrix: '2009',
        sessions: [
          { name: 'Practice 1', date: '2024-12-06', time: '13:30', completed: false },
          { name: 'Practice 2', date: '2024-12-06', time: '17:00', completed: false },
          { name: 'Practice 3', date: '2024-12-07', time: '14:30', completed: false },
          { name: 'Qualifying', date: '2024-12-07', time: '18:00', completed: false },
          { name: 'Race', date: '2024-12-08', time: '17:00', completed: false }
        ]
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