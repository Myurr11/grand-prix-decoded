import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { MapPin, Clock, Zap, Trophy, Calendar, Globe, ArrowRight, Info, Play, Eye, TrendingUp, Wind, Thermometer, Flag, Timer, Route } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';

const Tracks = () => {
  const [selectedContinent, setSelectedContinent] = useState('All');
  const [selectedTrack, setSelectedTrack] = useState<any>(null); // Added type annotation

  // Enhanced circuit data with detailed corner analysis
  const circuits = [
    {
      name: 'Bahrain International Circuit',
      location: 'Sakhir, Bahrain',
      continent: 'Asia',
      length: '5.412 km',
      turns: 15,
      lapRecord: '1:31.447 - Pedro de la Rosa (2005)',
      firstGP: 2004,
      drsZones: 3,
      description: 'A modern circuit with a mix of fast straights and technical sections, often hosting the season opener.',
      keyFeatures: ['Desert location', 'Night race', 'Multiple layouts', 'High tire degradation'],
      difficulty: 'Medium',
      weather: 'Hot and dry',
      surface: 'Abrasive tarmac',
      corners: [
        { name: 'Turn 1', number: 1, type: 'Right', difficulty: 'Medium', description: 'Heavy braking zone after main straight.' },
        { name: 'Turn 4', number: 4, type: 'Left', difficulty: 'Hard', description: 'Long left-hander requiring precise line.' },
        { name: 'Turns 9-10', number: 9, type: 'Right-Left', difficulty: 'Hard', description: 'Technical chicane before back straight.' },
        { name: 'Turn 11', number: 11, type: 'Right', difficulty: 'Medium', description: 'Fast right-hander onto second DRS zone.' },
        { name: 'Final Corner', number: 15, type: 'Right', difficulty: 'Medium', description: 'Important for good exit onto main straight.' }
      ],
      sectors: [
        { number: 1, description: 'Technical opening sector with heavy braking zones', characteristics: ['Overtaking opportunities', 'Traction important', 'Brake management'] },
        { number: 2, description: 'Fast flowing middle sector', characteristics: ['High speed', 'Aero efficiency', 'Rhythm important'] },
        { number: 3, description: 'Technical final sector leading to main straight', characteristics: ['Traction zones', 'Tire management', 'Setup compromise'] }
      ],
      strategy: {
        overtaking: 'Good opportunities into Turns 1 and 4, and into final corner',
        setup: 'Balanced between straight-line speed and downforce for technical sections',
        tires: 'High degradation requires careful management, often 2-stop race',
        fuel: 'Moderate consumption with several acceleration zones'
      },
      history: [
        { year: 2004, event: 'First Bahrain Grand Prix won by Michael Schumacher' },
        { year: 2014, event: 'First night race in Bahrain' },
        { year: 2020, event: 'Multiple races held during COVID-19 pandemic' }
      ]
    },
    {
      name: 'Jeddah Corniche Circuit',
      location: 'Jeddah, Saudi Arabia',
      continent: 'Asia',
      length: '6.174 km',
      turns: 27,
      lapRecord: '1:28.049 - Lewis Hamilton (2021)',
      firstGP: 2021,
      drsZones: 3,
      description: 'The fastest street circuit in F1 with high-speed corners and close walls, creating a thrilling but dangerous challenge.',
      keyFeatures: ['Fastest street circuit', 'High-speed corners', 'Narrow track', 'Night race'],
      difficulty: 'Expert',
      weather: 'Hot and humid',
      surface: 'Smooth street surface',
      corners: [
        { name: 'Turn 1', number: 1, type: 'Right', difficulty: 'Hard', description: 'Heavy braking after fastest section of track.' },
        { name: 'Turn 13', number: 13, type: 'Left', difficulty: 'Expert', description: 'Blind left-hander with wall proximity.' },
        { name: 'Turn 22', number: 22, type: 'Right', difficulty: 'Hard', description: 'Fast right-hander with tricky exit.' },
        { name: 'Turn 27', number: 27, type: 'Right', difficulty: 'Medium', description: 'Final corner onto main straight.' }
      ],
      sectors: [
        { number: 1, description: 'High-speed opening sector with flowing corners', characteristics: ['Commitment required', 'Precision', 'Wall proximity'] },
        { number: 2, description: 'Technical middle sector with tricky chicanes', characteristics: ['Braking zones', 'Traction', 'Overtaking spots'] },
        { number: 3, description: 'Fast final sector leading to main straight', characteristics: ['Flow important', 'Exit speed', 'DRS activation'] }
      ],
      strategy: {
        overtaking: 'Opportunities into Turns 1, 22 and 27 with DRS assistance',
        setup: 'Maximum downforce for high-speed corners, despite long straights',
        tires: 'Soft compounds work well but high degradation from lateral loads',
        fuel: 'High consumption due to constant acceleration'
      },
      history: [
        { year: 2021, event: 'First Saudi Arabian GP with controversial finish' },
        { year: 2022, event: 'Multiple safety cars and red flags' }
      ]
    },
    {
      name: 'Albert Park Circuit',
      location: 'Melbourne, Australia',
      continent: 'Oceania',
      length: '5.278 km',
      turns: 14,
      lapRecord: '1:20.260 - Charles Leclerc (2022)',
      firstGP: 1996,
      drsZones: 4,
      description: 'A semi-street circuit around a lake featuring fast flowing sections and technical chicanes.',
      keyFeatures: ['Parkland setting', 'Fast flowing', 'Revised layout', 'Early season race'],
      difficulty: 'Medium',
      weather: 'Variable spring conditions',
      surface: 'Smooth tarmac with some bumps',
      corners: [
        { name: 'Turn 1', number: 1, type: 'Right', difficulty: 'Medium', description: 'Opening corner with heavy braking.' },
        { name: 'Turn 3', number: 3, type: 'Left', difficulty: 'Medium', description: 'Fast left-hander leading to back straight.' },
        { name: 'Turn 6', number: 6, type: 'Right', difficulty: 'Hard', description: 'High-speed right-hander.' },
        { name: 'Turn 9-10', number: 9, type: 'Left-Right', difficulty: 'Hard', description: 'Technical chicane.' },
        { name: 'Turn 11', number: 11, type: 'Right', difficulty: 'Medium', description: 'Fast right onto penultimate straight.' },
        { name: 'Turn 13', number: 13, type: 'Left', difficulty: 'Hard', description: 'Final corner before main straight.' }
      ],
      sectors: [
        { number: 1, description: 'Technical opening sector with heavy braking zones', characteristics: ['Overtaking spots', 'Traction zones', 'Brake management'] },
        { number: 2, description: 'Fast middle sector with flowing corners', characteristics: ['High speed', 'Aero efficiency', 'Commitment'] },
        { number: 3, description: 'Technical final sector leading to main straight', characteristics: ['Traction important', 'Tire management', 'Setup compromise'] }
      ],
      strategy: {
        overtaking: 'Good opportunities into Turns 1, 3 and 13 with DRS assistance',
        setup: 'Balanced between downforce and straight-line speed',
        tires: 'Medium compounds often optimal with moderate degradation',
        fuel: 'Moderate consumption with mix of acceleration zones'
      },
      history: [
        { year: 1996, event: 'First race at Albert Park won by Damon Hill' },
        { year: 2002, event: 'Mark Webber scores points on debut for Minardi' },
        { year: 2020, event: 'Race cancelled due to COVID-19 pandemic' },
        { year: 2022, event: 'Major track revisions for faster racing' }
      ]
    },
    {
      name: 'Baku City Circuit',
      location: 'Baku, Azerbaijan',
      continent: 'Asia',
      length: '6.003 km',
      turns: 20,
      lapRecord: '1:43.009 - Charles Leclerc (2019)',
      firstGP: 2016,
      drsZones: 2,
      description: 'A challenging street circuit combining a tight, twisty old town section with a long, flat-out blast along the Caspian seafront.',
      keyFeatures: ['Fastest street circuit', 'Castle section', 'Long straight', 'Unpredictable races'],
      difficulty: 'Hard',
      weather: 'Changeable coastal conditions',
      surface: 'Smooth street surface with some bumps',
      corners: [
        { name: 'Turn 1', number: 1, type: 'Right', difficulty: 'Medium', description: 'Opening corner after long straight.' },
        { name: 'Turn 3-4', number: 3, type: 'Right-Left', difficulty: 'Hard', description: 'Technical section in old town.' },
        { name: 'Turn 8', number: 8, type: 'Left', difficulty: 'Expert', description: 'Blind left-hander through castle section.' },
        { name: 'Turn 16', number: 16, type: 'Right', difficulty: 'Medium', description: 'Fast right-hander before long straight.' },
        { name: 'Turn 20', number: 20, type: 'Right', difficulty: 'Medium', description: 'Final corner onto main straight.' }
      ],
      sectors: [
        { number: 1, description: 'Technical opening sector through old town', characteristics: ['Narrow streets', 'Precision required', 'Low speed'] },
        { number: 2, description: 'Fast middle sector along seafront', characteristics: ['High speed', 'Aero efficiency', 'Commitment'] },
        { number: 3, description: 'Technical final sector leading to main straight', characteristics: ['Overtaking spots', 'Traction zones', 'Setup compromise'] }
      ],
      strategy: {
        overtaking: 'Good opportunities into Turns 1 and 3 with DRS assistance',
        setup: 'Low downforce for straight-line speed but enough for castle section',
        tires: 'Soft compounds work well with moderate degradation',
        fuel: 'High consumption due to long straights'
      },
      history: [
        { year: 2016, event: 'First European GP held in Baku' },
        { year: 2017, event: 'Chaotic race with multiple incidents' },
        { year: 2018, event: 'Red Bull teammates collide while leading' },
        { year: 2021, event: 'Perez wins after Verstappen crash and Hamilton mistake' }
      ]
    },
    {
      name: 'Miami International Autodrome',
      location: 'Miami, USA',
      continent: 'North America',
      length: '5.412 km',
      turns: 19,
      lapRecord: '1:29.708 - Max Verstappen (2023)',
      firstGP: 2022,
      drsZones: 3,
      description: 'A temporary street circuit around Hard Rock Stadium featuring a marina section and challenging high-speed corners.',
      keyFeatures: ['Marina section', 'High-speed corners', 'Artificial marina', 'Hot conditions'],
      difficulty: 'Hard',
      weather: 'Hot and humid',
      surface: 'Smooth temporary surface',
      corners: [
        { name: 'Turn 1', number: 1, type: 'Right', difficulty: 'Medium', description: 'Opening corner after long straight.' },
        { name: 'Turns 11-13', number: 11, type: 'Left-Right-Left', difficulty: 'Hard', description: 'Technical section under highway.' },
        { name: 'Turn 17', number: 17, type: 'Left', difficulty: 'Expert', description: 'High-speed left-hander.' },
        { name: 'Turn 19', number: 19, type: 'Right', difficulty: 'Medium', description: 'Final corner onto main straight.' }
      ],
      sectors: [
        { number: 1, description: 'Technical opening sector with heavy braking zones', characteristics: ['Overtaking spots', 'Traction zones', 'Brake management'] },
        { number: 2, description: 'Fast middle sector with flowing corners', characteristics: ['High speed', 'Aero efficiency', 'Commitment'] },
        { number: 3, description: 'Technical final sector leading to main straight', characteristics: ['Traction important', 'Tire management', 'Setup compromise'] }
      ],
      strategy: {
        overtaking: 'Good opportunities into Turns 1, 11 and 17 with DRS assistance',
        setup: 'Balanced between downforce and straight-line speed',
        tires: 'Soft compounds work well but high degradation in hot conditions',
        fuel: 'High consumption due to hot conditions and acceleration zones'
      },
      history: [
        { year: 2022, event: 'First Miami GP won by Max Verstappen' },
        { year: 2023, event: 'Red Bull 1-2 with Perez winning' }
      ]
    },
    {
      name: 'Circuit de Monaco',
      location: 'Monte Carlo, Monaco',
      continent: 'Europe',
      length: '3.337 km',
      turns: 19,
      lapRecord: '1:12.909 - Lewis Hamilton (2021)',
      firstGP: 1950,
      drsZones: 1,
      description: 'The iconic street circuit known for its tight corners, barriers, and glamour. The slowest but most prestigious race.',
      keyFeatures: ['Tight hairpin', 'Casino Square', 'Tunnel section', 'No overtaking zones'],
      difficulty: 'Expert',
      weather: 'Mediterranean',
      surface: 'Bumpy street circuit',
      corners: [
        { name: 'Sainte Devote', number: 1, type: 'Right hairpin', difficulty: 'Hard', description: 'Sharp right-hander after the start/finish straight. Critical for race start.' },
        { name: 'Massenet', number: 2, type: 'Right', difficulty: 'Medium', description: 'Uphill right turn leading to Casino Square.' },
        { name: 'Casino Square', number: 3, type: 'Left-Right', difficulty: 'Hard', description: 'Famous chicane through the heart of Monte Carlo.' },
        { name: 'Mirabeau', number: 6, type: 'Right hairpin', difficulty: 'Hard', description: 'Tight hairpin with limited visibility.' },
        { name: 'Grand Hotel Hairpin', number: 6, type: 'Right hairpin', difficulty: 'Expert', description: 'The slowest corner in F1, requiring maximum lock.' },
        { name: 'Portier', number: 8, type: 'Right', difficulty: 'Medium', description: 'Right-hander leading into the tunnel.' },
        { name: 'Tunnel', number: 9, type: 'Straight', difficulty: 'Easy', description: 'High-speed section with changing light conditions.' },
        { name: 'Chicane', number: 10, type: 'Left-Right', difficulty: 'Hard', description: 'Tight chicane after tunnel exit.' },
        { name: 'Tabac', number: 11, type: 'Left', difficulty: 'Medium', description: 'Left-hander along the harbor.' },
        { name: 'Swimming Pool', number: 13, type: 'Left-Right-Left', difficulty: 'Expert', description: 'Complex of corners around the swimming pool.' },
        { name: 'La Rascasse', number: 17, type: 'Left hairpin', difficulty: 'Hard', description: 'Slow left hairpin before the final sector.' },
        { name: 'Anthony Noghes', number: 19, type: 'Right', difficulty: 'Medium', description: 'Final corner onto the main straight.' }
      ],
      sectors: [
        { number: 1, description: 'Uphill technical section through Casino Square', characteristics: ['Elevation gain', 'Tight corners', 'Low speed'] },
        { number: 2, description: 'Tunnel and harbor section', characteristics: ['Light changes', 'High speed', 'Braking zones'] },
        { number: 3, description: 'Swimming pool complex and final corners', characteristics: ['Technical', 'Precision required', 'Setup critical'] }
      ],
      strategy: {
        overtaking: 'Extremely limited - mainly at Sainte Devote and chicane after tunnel',
        setup: 'Maximum downforce for cornering speed, sacrifice straight-line speed',
        tires: 'Soft compounds work well due to low speeds and track evolution',
        fuel: 'Fuel saving less critical due to low speeds'
      },
      history: [
        { year: 1950, event: 'First Monaco GP in F1 World Championship' },
        { year: 1984, event: 'Ayrton Senna\'s legendary wet weather drive' },
        { year: 1996, event: 'Olivier Panis wins in chaotic wet race' },
        { year: 2008, event: 'Lewis Hamilton\'s masterful wet weather victory' }
      ]
    },
    {
      name: 'Circuit de Barcelona-Catalunya',
      location: 'Montmeló, Spain',
      continent: 'Europe',
      length: '4.675 km',
      turns: 16,
      lapRecord: '1:16.330 - Max Verstappen (2023)',
      firstGP: 1991,
      drsZones: 2,
      description: 'A technical circuit used extensively for testing, featuring a mix of high and low-speed corners that test every aspect of car performance.',
      keyFeatures: ['Final chicane changes', 'High-speed corners', 'Test track', 'Tire degradation'],
      difficulty: 'Hard',
      weather: 'Generally warm and dry',
      surface: 'Abrasive tarmac',
      corners: [
        { name: 'Turn 1', number: 1, type: 'Right', difficulty: 'Medium', description: 'Heavy braking downhill after main straight.' },
        { name: 'Turn 3', number: 3, type: 'Right', difficulty: 'Hard', description: 'Long right-hander testing aerodynamic efficiency.' },
        { name: 'Turn 5', number: 5, type: 'Left', difficulty: 'Medium', description: 'Cambered left-hander leading to technical section.' },
        { name: 'Turn 9', number: 9, type: 'Right', difficulty: 'Hard', description: 'Fast right-hander requiring commitment.' },
        { name: 'Turn 10', number: 10, type: 'Left', difficulty: 'Medium', description: 'Technical left before back straight.' },
        { name: 'Final Chicane', number: 14, type: 'Right-Left', difficulty: 'Medium', description: 'Revised chicane leading to main straight.' }
      ],
      sectors: [
        { number: 1, description: 'Technical opening sector with mix of corners', characteristics: ['Braking zones', 'Traction', 'Aero efficiency'] },
        { number: 2, description: 'Fast middle sector with flowing corners', characteristics: ['High speed', 'Commitment', 'Rhythm'] },
        { number: 3, description: 'Technical final sector leading to main straight', characteristics: ['Traction zones', 'Tire management', 'Setup compromise'] }
      ],
      strategy: {
        overtaking: 'Opportunities into Turns 1 and 10 with DRS assistance',
        setup: 'High downforce for technical sections but enough straight-line speed',
        tires: 'High degradation requires careful management, often 2-stop race',
        fuel: 'Moderate consumption with mix of acceleration zones'
      },
      history: [
        { year: 1991, event: 'First Spanish GP at Catalunya won by Nigel Mansell' },
        { year: 1996, event: 'Michael Schumacher wins in wet conditions' },
        { year: 2016, event: 'Verstappen becomes youngest F1 winner' },
        { year: 2021, event: 'Hamilton and Verstappen battle throughout race' }
      ]
    },
    {
      name: 'Circuit Gilles Villeneuve',
      location: 'Montreal, Canada',
      continent: 'North America',
      length: '4.361 km',
      turns: 14,
      lapRecord: '1:13.078 - Valtteri Bottas (2019)',
      firstGP: 1978,
      drsZones: 2,
      description: 'A semi-street circuit on Île Notre-Dame featuring long straights, heavy braking zones, and close walls that punish mistakes.',
      keyFeatures: ['Wall of Champions', 'Long straights', 'Heavy braking', 'Challenging curbs'],
      difficulty: 'Hard',
      weather: 'Variable conditions',
      surface: 'Smooth tarmac with some bumps',
      corners: [
        { name: 'Turn 1', number: 1, type: 'Right', difficulty: 'Medium', description: 'Heavy braking zone after main straight.' },
        { name: 'Turn 2', number: 2, type: 'Left', difficulty: 'Medium', description: 'Immediate left after Turn 1.' },
        { name: 'Turn 6-7', number: 6, type: 'Left-Right', difficulty: 'Hard', description: 'Fast chicane before back straight.' },
        { name: 'Turn 8-9', number: 8, type: 'Right-Left', difficulty: 'Hard', description: 'Chicane leading to final sector.' },
        { name: 'Wall of Champions', number: 13, type: 'Right', difficulty: 'Expert', description: 'Final corner with close wall proximity.' }
      ],
      sectors: [
        { number: 1, description: 'Technical opening sector with heavy braking zones', characteristics: ['Overtaking spots', 'Traction zones', 'Brake management'] },
        { number: 2, description: 'Fast middle sector with long straights', characteristics: ['Top speed', 'DRS effect', 'Slipstreaming'] },
        { number: 3, description: 'Technical final sector leading to main straight', characteristics: ['Wall proximity', 'Precision', 'Setup compromise'] }
      ],
      strategy: {
        overtaking: 'Good opportunities into Turns 1 and 10 with DRS assistance',
        setup: 'Low downforce for straight-line speed but enough for chicanes',
        tires: 'Soft compounds work well but high degradation from braking',
        fuel: 'High consumption due to acceleration zones'
      },
      history: [
        { year: 1978, event: 'First Canadian GP at Circuit Gilles Villeneuve' },
        { year: 1999, event: 'Wall of Champions claims multiple top drivers' },
        { year: 2011, event: 'Jenson Button wins after last-lap pass' },
        { year: 2014, event: 'Perez and Massa collide while battling for podium' }
      ]
    },
    {
      name: 'Red Bull Ring',
      location: 'Spielberg, Austria',
      continent: 'Europe',
      length: '4.318 km',
      turns: 10,
      lapRecord: '1:05.619 - Carlos Sainz (2020)',
      firstGP: 1970,
      drsZones: 3,
      description: 'A short but challenging circuit in the Styrian mountains featuring elevation changes and fast corners.',
      keyFeatures: ['Elevation changes', 'Fast corners', 'Short lap', 'Beautiful scenery'],
      difficulty: 'Medium',
      weather: 'Alpine conditions - can change quickly',
      surface: 'Smooth tarmac with some bumps',
      corners: [
        { name: 'Turn 1', number: 1, type: 'Right', difficulty: 'Medium', description: 'Uphill braking zone after main straight.' },
        { name: 'Turn 3', number: 3, type: 'Right', difficulty: 'Hard', description: 'Fast right-hander with blind exit.' },
        { name: 'Turn 4', number: 4, type: 'Left', difficulty: 'Medium', description: 'Downhill left leading to technical section.' },
        { name: 'Turn 6', number: 6, type: 'Right', difficulty: 'Hard', description: 'Fast right-hander testing aerodynamics.' },
        { name: 'Turn 9', number: 9, type: 'Left', difficulty: 'Medium', description: 'Final corner before main straight.' }
      ],
      sectors: [
        { number: 1, description: 'Uphill opening sector with fast corners', characteristics: ['Elevation gain', 'Commitment', 'Aero efficiency'] },
        { number: 2, description: 'Technical middle sector with flowing corners', characteristics: ['Rhythm', 'Traction', 'Braking zones'] },
        { number: 3, description: 'Fast final sector leading to main straight', characteristics: ['Exit speed', 'DRS activation', 'Setup compromise'] }
      ],
      strategy: {
        overtaking: 'Good opportunities into Turns 1, 3 and 4 with DRS assistance',
        setup: 'Medium downforce for fast corners but enough straight-line speed',
        tires: 'Soft compounds work well with moderate degradation',
        fuel: 'Moderate consumption with mix of acceleration zones'
      },
      history: [
        { year: 1970, event: 'First Austrian GP at Österreichring' },
        { year: 2003, event: 'Last race on old layout before reconstruction' },
        { year: 2014, event: 'Return to calendar at Red Bull Ring' },
        { year: 2020, event: 'Two races held during COVID-19 pandemic' }
      ]
    },
    {
      name: 'Silverstone Circuit',
      location: 'Silverstone, UK',
      continent: 'Europe',
      length: '5.891 km',
      turns: 18,
      lapRecord: '1:27.097 - Max Verstappen (2020)',
      firstGP: 1950,
      drsZones: 2,
      description: 'The historic home of British motorsport featuring fast, flowing corners that test driver skill and car aerodynamics.',
      keyFeatures: ['Maggots-Becketts complex', 'Copse corner', 'High-speed', 'Historic venue'],
      difficulty: 'Expert',
      weather: 'Unpredictable British conditions',
      surface: 'Smooth tarmac with some bumps',
      corners: [
        { name: 'Copse', number: 1, type: 'Right', difficulty: 'Expert', description: 'High-speed right-hander taken flat-out.' },
        { name: 'Maggots', number: 4, type: 'Right', difficulty: 'Expert', description: 'First part of famous complex.' },
        { name: 'Becketts', number: 5, type: 'Left', difficulty: 'Expert', description: 'Second part of complex requiring precision.' },
        { name: 'Chapel', number: 6, type: 'Right', difficulty: 'Hard', description: 'Fast right leading to Hangar Straight.' },
        { name: 'Stowe', number: 7, type: 'Right', difficulty: 'Hard', description: 'Heavy braking zone after straight.' },
        { name: 'Vale', number: 8, type: 'Left', difficulty: 'Medium', description: 'First part of complex before Club.' },
        { name: 'Club', number: 9, type: 'Right', difficulty: 'Medium', description: 'Final corner onto main straight.' }
      ],
      sectors: [
        { number: 1, description: 'High-speed opening sector with iconic corners', characteristics: ['Commitment', 'Precision', 'Aero efficiency'] },
        { number: 2, description: 'Technical middle sector with mix of corners', characteristics: ['Braking zones', 'Traction', 'Rhythm'] },
        { number: 3, description: 'Fast final sector leading to main straight', characteristics: ['Exit speed', 'DRS activation', 'Setup compromise'] }
      ],
      strategy: {
        overtaking: 'Good opportunities into Turns 1 and 7 with DRS assistance',
        setup: 'High downforce for fast corners but enough straight-line speed',
        tires: 'Soft compounds work well but high degradation from fast corners',
        fuel: 'High consumption due to fast nature of circuit'
      },
      history: [
        { year: 1950, event: 'First F1 World Championship race held at Silverstone' },
        { year: 1987, event: 'Mansell\'s famous overtake on Piquet' },
        { year: 2008, event: 'Hamilton wins in wet conditions' },
        { year: 2020, event: 'Three races held during COVID-19 pandemic' }
      ]
    },
    {
      name: 'Hungaroring',
      location: 'Budapest, Hungary',
      continent: 'Europe',
      length: '4.381 km',
      turns: 14,
      lapRecord: '1:16.627 - Lewis Hamilton (2020)',
      firstGP: 1986,
      drsZones: 2,
      description: 'A twisty, technical circuit often compared to a street track, where overtaking is difficult and qualifying position crucial.',
      keyFeatures: ['Technical layout', 'Low overtaking', 'Dusty surface', 'Hot conditions'],
      difficulty: 'Hard',
      weather: 'Hot summer conditions',
      surface: 'Dusty tarmac with low grip',
      corners: [
        { name: 'Turn 1', number: 1, type: 'Right', difficulty: 'Medium', description: 'Heavy braking zone after main straight.' },
        { name: 'Turn 2', number: 2, type: 'Left', difficulty: 'Medium', description: 'Immediate left after Turn 1.' },
        { name: 'Turn 4', number: 4, type: 'Right', difficulty: 'Hard', description: 'Long right-hander testing aerodynamics.' },
        { name: 'Turn 11', number: 11, type: 'Left', difficulty: 'Medium', description: 'Technical left before back straight.' },
        { name: 'Turn 14', number: 14, type: 'Right', difficulty: 'Medium', description: 'Final corner onto main straight.' }
      ],
      sectors: [
        { number: 1, description: 'Technical opening sector with heavy braking zones', characteristics: ['Overtaking spots', 'Traction zones', 'Brake management'] },
        { number: 2, description: 'Twisty middle sector with flowing corners', characteristics: ['Rhythm', 'Commitment', 'Aero efficiency'] },
        { number: 3, description: 'Technical final sector leading to main straight', characteristics: ['Exit speed', 'DRS activation', 'Setup compromise'] }
      ],
      strategy: {
        overtaking: 'Limited opportunities mainly into Turn 1 with DRS assistance',
        setup: 'High downforce for technical sections despite long straight',
        tires: 'Soft compounds work well but high degradation in hot conditions',
        fuel: 'Moderate consumption with mix of acceleration zones'
      },
      history: [
        { year: 1986, event: 'First Hungarian GP won by Nelson Piquet' },
        { year: 1997, event: 'Damon Hill wins for Arrows in near-miss' },
        { year: 2006, event: 'Jenson Button\'s first F1 victory' },
        { year: 2021, event: 'Chaotic race with multiple incidents' }
      ]
    },
    {
      name: 'Circuit de Spa-Francorchamps',
      location: 'Spa, Belgium',
      continent: 'Europe',
      length: '7.004 km',
      turns: 19,
      lapRecord: '1:46.286 - Valtteri Bottas (2018)',
      firstGP: 1950,
      drsZones: 2,
      description: 'The longest circuit on the calendar, featuring the iconic Eau Rouge-Raidillon complex and unpredictable weather.',
      keyFeatures: ['Eau Rouge', 'Longest track', 'Microclimate', 'High-speed sections'],
      difficulty: 'Expert',
      weather: 'Unpredictable - microclimates',
      surface: 'Smooth tarmac with elevation changes',
      corners: [
        { name: 'La Source', number: 1, type: 'Right hairpin', difficulty: 'Medium', description: 'Tight hairpin after start/finish straight.' },
        { name: 'Eau Rouge', number: 3, type: 'Left-Right', difficulty: 'Expert', description: 'Legendary uphill left-right combination.' },
        { name: 'Raidillon', number: 4, type: 'Left', difficulty: 'Expert', description: 'Blind crest after Eau Rouge, taken flat-out.' },
        { name: 'Les Combes', number: 5, type: 'Right-Left', difficulty: 'Hard', description: 'Chicane at the top of the hill.' },
        { name: 'Malmedy', number: 9, type: 'Right', difficulty: 'Medium', description: 'Fast right-hander in the middle sector.' },
        { name: 'Rivage', number: 10, type: 'Left', difficulty: 'Hard', description: 'Downhill left turn requiring late braking.' },
        { name: 'Pouhon', number: 11, type: 'Left', difficulty: 'Hard', description: 'High-speed left-hander testing aerodynamics.' },
        { name: 'Campus', number: 15, type: 'Left-Right', difficulty: 'Medium', description: 'Technical section in the forest.' },
        { name: 'Stavelot', number: 18, type: 'Left', difficulty: 'Medium', description: 'Fast left leading to the main straight.' },
        { name: 'Bus Stop', number: 19, type: 'Right-Left', difficulty: 'Hard', description: 'Final chicane before start/finish.' }
      ],
      sectors: [
        { number: 1, description: 'Eau Rouge-Raidillon and climb to Les Combes', characteristics: ['Iconic corners', 'Elevation gain', 'High commitment'] },
        { number: 2, description: 'Forest section with flowing corners', characteristics: ['High speed', 'Rhythm important', 'Aerodynamic efficiency'] },
        { number: 3, description: 'Technical section and return to start/finish', characteristics: ['Precision required', 'Good exit crucial', 'Setup compromise'] }
      ],
      strategy: {
        overtaking: 'Main straight after DRS, Bus Stop chicane, sometimes into Les Combes',
        setup: 'Low downforce for straight-line speed, but enough for high-speed corners',
        tires: 'Medium compounds often optimal, tire temperature management crucial',
        fuel: 'Fuel saving important due to long lap and high speeds'
      },
      history: [
        { year: 1950, event: 'First Belgian GP at Spa in F1 World Championship' },
        { year: 1998, event: 'Legendary start crash in wet conditions' },
        { year: 2008, event: 'Felipe Massa\'s controversial penalty' },
        { year: 2021, event: 'Shortest race in F1 history due to rain' }
      ]
    },
    {
      name: 'Zandvoort Circuit',
      location: 'Zandvoort, Netherlands',
      continent: 'Europe',
      length: '4.259 km',
      turns: 14,
      lapRecord: '1:11.097 - Lewis Hamilton (2021)',
      firstGP: 1952,
      drsZones: 2,
      description: 'A technical circuit with banked corners and a passionate orange crowd supporting Max Verstappen.',
      keyFeatures: ['Banked corners', 'Narrow track', 'Dune setting', 'Orange crowd'],
      difficulty: 'Hard',
      weather: 'Coastal conditions - can change quickly',
      surface: 'Smooth tarmac with some bumps',
      corners: [
        { name: 'Turn 1', number: 1, type: 'Right', difficulty: 'Medium', description: 'Heavy braking zone after main straight.' },
        { name: 'Turn 3', number: 3, type: 'Left', difficulty: 'Hard', description: 'Banked left-hander testing aerodynamics.' },
        { name: 'Turn 7', number: 7, type: 'Right', difficulty: 'Medium', description: 'Fast right-hander leading to technical section.' },
        { name: 'Turn 11', number: 11, type: 'Left', difficulty: 'Hard', description: 'Banked left-hander before final sector.' },
        { name: 'Turn 14', number: 14, type: 'Right', difficulty: 'Medium', description: 'Final corner onto main straight.' }
      ],
      sectors: [
        { number: 1, description: 'Technical opening sector with heavy braking zones', characteristics: ['Overtaking spots', 'Traction zones', 'Brake management'] },
        { number: 2, description: 'Fast middle sector with flowing corners', characteristics: ['High speed', 'Commitment', 'Aero efficiency'] },
        { number: 3, description: 'Technical final sector leading to main straight', characteristics: ['Banking', 'Exit speed', 'Setup compromise'] }
      ],
      strategy: {
        overtaking: 'Limited opportunities mainly into Turn 1 with DRS assistance',
        setup: 'High downforce for technical sections despite long straight',
        tires: 'Soft compounds work well with moderate degradation',
        fuel: 'Moderate consumption with mix of acceleration zones'
      },
      history: [
        { year: 1952, event: 'First Dutch GP at Zandvoort' },
        { year: 1985, event: 'Last race before long absence from calendar' },
        { year: 2021, event: 'Return to calendar after 36 years' },
        { year: 2022, event: 'Verstappen wins in front of home crowd' }
      ]
    },
    {
      name: 'Monza Circuit',
      location: 'Monza, Italy',
      continent: 'Europe',
      length: '5.793 km',
      turns: 11,
      lapRecord: '1:21.046 - Rubens Barrichello (2004)',
      firstGP: 1950,
      drsZones: 2,
      description: 'The Temple of Speed, featuring long straights and fast corners that create the fastest average speeds of the season.',
      keyFeatures: ['High speed', 'Parabolica', 'Historic venue', 'Low downforce setup'],
      difficulty: 'Hard',
      weather: 'Generally stable, hot summers',
      surface: 'Smooth tarmac, low grip',
      corners: [
        { name: 'Rettifilo Tribune', number: 1, type: 'Right chicane', difficulty: 'Hard', description: 'Heavy braking zone after 340km/h+ speeds.' },
        { name: 'Curva Biassono', number: 2, type: 'Left', difficulty: 'Medium', description: 'Second part of first chicane.' },
        { name: 'Curva del Serraglio', number: 4, type: 'Right', difficulty: 'Easy', description: 'Fast right-hander, barely a lift.' },
        { name: 'Variante della Roggia', number: 5, type: 'Left-Right', difficulty: 'Hard', description: 'Second chicane, key overtaking spot.' },
        { name: 'Lesmo 1', number: 7, type: 'Right', difficulty: 'Medium', description: 'First of the Lesmo corners.' },
        { name: 'Lesmo 2', number: 8, type: 'Right', difficulty: 'Medium', description: 'Second Lesmo, slightly tighter.' },
        { name: 'Variante Ascari', number: 9, type: 'Left-Right-Left', difficulty: 'Hard', description: 'Complex chicane named after Alberto Ascari.' },
        { name: 'Parabolica', number: 11, type: 'Right', difficulty: 'Hard', description: 'Long, sweeping final corner onto main straight.' }
      ],
      sectors: [
        { number: 1, description: 'First chicane and Curva del Serraglio', characteristics: ['Heavy braking', 'Overtaking opportunities', 'Slipstream effect'] },
        { number: 2, description: 'Second chicane through to Lesmo corners', characteristics: ['Technical section', 'Rhythm important', 'Setup critical'] },
        { number: 3, description: 'Ascari chicane and Parabolica', characteristics: ['Complex corners', 'Exit speed crucial', 'Slipstream preparation'] }
      ],
      strategy: {
        overtaking: 'Multiple opportunities - both chicanes and into Lesmo 1',
        setup: 'Minimum downforce for maximum straight-line speed',
        tires: 'Hard compounds often used due to low grip and high speeds',
        fuel: 'Fuel saving very important due to high consumption'
      },
      history: [
        { year: 1950, event: 'First Italian GP at Monza in F1 World Championship' },
        { year: 1971, event: 'Peter Gethin wins closest finish in F1 history' },
        { year: 1988, event: 'Gerhard Berger\'s emotional victory after Enzo Ferrari\'s death' },
        { year: 2020, event: 'Pierre Gasly\'s shock victory for AlphaTauri' }
      ]
    },
    {
      name: 'Marina Bay Street Circuit',
      location: 'Singapore',
      continent: 'Asia',
      length: '5.063 km',
      turns: 19,
      lapRecord: '1:41.905 - Kevin Magnussen (2018)',
      firstGP: 2008,
      drsZones: 2,
      description: 'A physically demanding night race through the streets of Singapore with high humidity and tight corners.',
      keyFeatures: ['Night race', 'High humidity', 'Tight corners', 'Physically demanding'],
      difficulty: 'Expert',
      weather: 'Hot and humid',
      surface: 'Bumpy street circuit',
      corners: [
        { name: 'Turn 1', number: 1, type: 'Right', difficulty: 'Medium', description: 'Heavy braking zone after main straight.' },
        { name: 'Turn 5', number: 5, type: 'Left', difficulty: 'Hard', description: 'Tight left-hander with wall proximity.' },
        { name: 'Turn 7', number: 7, type: 'Right', difficulty: 'Medium', description: 'Fast right-hander leading to technical section.' },
        { name: 'Turn 10', number: 10, type: 'Left', difficulty: 'Hard', description: 'Tight left-hander with tricky exit.' },
        { name: 'Turn 14', number: 14, type: 'Right', difficulty: 'Medium', description: 'Fast right-hander before final sector.' },
        { name: 'Turn 18', number: 18, type: 'Left', difficulty: 'Hard', description: 'Tight left-hander before final straight.' }
      ],
      sectors: [
        { number: 1, description: 'Technical opening sector with heavy braking zones', characteristics: ['Overtaking spots', 'Traction zones', 'Brake management'] },
        { number: 2, description: 'Twisty middle sector with flowing corners', characteristics: ['Rhythm', 'Commitment', 'Precision'] },
        { number: 3, description: 'Technical final sector leading to main straight', characteristics: ['Exit speed', 'DRS activation', 'Setup compromise'] }
      ],
      strategy: {
        overtaking: 'Limited opportunities mainly into Turns 1 and 7 with DRS assistance',
        setup: 'High downforce for technical sections despite long straight',
        tires: 'Soft compounds work well but high degradation in hot conditions',
        fuel: 'High consumption due to hot conditions and acceleration zones'
      },
      history: [
        { year: 2008, event: 'First night race in F1 history' },
        { year: 2012, event: 'Vettel wins after Hamilton retires from lead' },
        { year: 2017, event: 'Vettel, Raikkonen and Verstappen collide at start' },
        { year: 2019, event: 'Vettel ends victory drought with Ferrari' }
      ]
    },
    {
      name: 'Suzuka International Racing Course',
      location: 'Suzuka, Japan',
      continent: 'Asia',
      length: '5.807 km',
      turns: 18,
      lapRecord: '1:30.983 - Lewis Hamilton (2019)',
      firstGP: 1987,
      drsZones: 2,
      description: 'A beloved figure-eight circuit featuring flowing, high-speed corners that test driver skill and car balance.',
      keyFeatures: ['Figure-eight layout', '130R corner', 'Esses', 'Technical challenge'],
      difficulty: 'Expert',
      weather: 'Variable conditions',
      surface: 'Smooth tarmac with some bumps',
      corners: [
        { name: 'First Curve', number: 1, type: 'Right', difficulty: 'Medium', description: 'Opening corner after main straight.' },
        { name: 'Esses', number: 3, type: 'Left-Right-Left', difficulty: 'Expert', description: 'High-speed complex requiring rhythm.' },
        { name: 'Dunlop Curve', number: 7, type: 'Right', difficulty: 'Hard', description: 'Fast right-hander testing aerodynamics.' },
        { name: 'Degner 1', number: 8, type: 'Right', difficulty: 'Expert', description: 'First part of tricky Degner complex.' },
        { name: 'Degner 2', number: 9, type: 'Left', difficulty: 'Expert', description: 'Second part of Degner complex.' },
        { name: '130R', number: 15, type: 'Left', difficulty: 'Expert', description: 'Legendary high-speed left-hander.' },
        { name: 'Casio Triangle', number: 17, type: 'Right-Left', difficulty: 'Hard', description: 'Final chicane before main straight.' }
      ],
      sectors: [
        { number: 1, description: 'Technical opening sector with Esses complex', characteristics: ['Rhythm', 'Commitment', 'Precision'] },
        { number: 2, description: 'Fast middle sector with flowing corners', characteristics: ['High speed', 'Aero efficiency', 'Braking zones'] },
        { number: 3, description: 'Technical final sector leading to main straight', characteristics: ['Exit speed', 'DRS activation', 'Setup compromise'] }
      ],
      strategy: {
        overtaking: 'Good opportunities into Turns 1 and 17 with DRS assistance',
        setup: 'High downforce for technical sections but enough straight-line speed',
        tires: 'Soft compounds work well with moderate degradation',
        fuel: 'High consumption due to fast nature of circuit'
      },
      history: [
        { year: 1987, event: 'First Japanese GP at Suzuka won by Gerhard Berger' },
        { year: 1989, event: 'Prost and Senna collide deciding championship' },
        { year: 1990, event: 'Senna takes revenge on Prost in first corner' },
        { year: 2005, event: 'Kimi Raikkonen\'s legendary last-lap pass' }
      ]
    },
    {
      name: 'Circuit of the Americas',
      location: 'Austin, USA',
      continent: 'North America',
      length: '5.513 km',
      turns: 20,
      lapRecord: '1:36.169 - Charles Leclerc (2019)',
      firstGP: 2012,
      drsZones: 2,
      description: 'A modern circuit with elevation changes and a mix of corners inspired by famous turns from other tracks.',
      keyFeatures: ['Elevation changes', 'Turn 1', 'Technical sections', 'Modern facility'],
      difficulty: 'Hard',
      weather: 'Variable conditions',
      surface: 'Smooth tarmac with some bumps',
      corners: [
        { name: 'Turn 1', number: 1, type: 'Left', difficulty: 'Expert', description: 'Steep uphill left-hander inspired by Silverstone\'s Maggots.' },
        { name: 'Turn 3-6', number: 3, type: 'Left-Right-Left-Right', difficulty: 'Hard', description: 'Technical section inspired by Silverstone\'s Maggots-Becketts.' },
        { name: 'Turn 11', number: 11, type: 'Left', difficulty: 'Medium', description: 'Fast left-hander leading to back straight.' },
        { name: 'Turn 12', number: 12, type: 'Left', difficulty: 'Hard', description: 'Heavy braking zone after back straight.' },
        { name: 'Turn 16-18', number: 16, type: 'Right-Left-Right', difficulty: 'Hard', description: 'Technical section inspired by Hockenheim\'s stadium.' },
        { name: 'Turn 20', number: 20, type: 'Right', difficulty: 'Medium', description: 'Final corner onto main straight.' }
      ],
      sectors: [
        { number: 1, description: 'Technical opening sector with elevation changes', characteristics: ['Overtaking spots', 'Traction zones', 'Brake management'] },
        { number: 2, description: 'Fast middle sector with flowing corners', characteristics: ['High speed', 'Aero efficiency', 'Commitment'] },
        { number: 3, description: 'Technical final sector leading to main straight', characteristics: ['Exit speed', 'DRS activation', 'Setup compromise'] }
      ],
      strategy: {
        overtaking: 'Good opportunities into Turns 1 and 12 with DRS assistance',
        setup: 'Balanced between downforce and straight-line speed',
        tires: 'Soft compounds work well with moderate degradation',
        fuel: 'High consumption due to elevation changes'
      },
      history: [
        { year: 2012, event: 'First US GP at COTA won by Lewis Hamilton' },
        { year: 2015, event: 'Historic 1-2 for Mercedes in wet conditions' },
        { year: 2018, event: 'Kimi Raikkonen\'s last F1 victory' },
        { year: 2021, event: 'Verstappen wins after intense battle with Hamilton' }
      ]
    },
    {
      name: 'Autódromo Hermanos Rodríguez',
      location: 'Mexico City, Mexico',
      continent: 'North America',
      length: '4.304 km',
      turns: 17,
      lapRecord: '1:17.774 - Valtteri Bottas (2021)',
      firstGP: 1963,
      drsZones: 2,
      description: 'A high-altitude circuit with thin air affecting car performance, featuring the famous stadium section.',
      keyFeatures: ['High altitude', 'Stadium section', 'Thin air', 'Passionate crowd'],
      difficulty: 'Medium',
      weather: 'Generally warm and dry',
      surface: 'Smooth tarmac with some bumps',
      corners: [
        { name: 'Turn 1', number: 1, type: 'Right', difficulty: 'Medium', description: 'Heavy braking zone after main straight.' },
        { name: 'Turn 4', number: 4, type: 'Left', difficulty: 'Hard', description: 'Fast left-hander testing aerodynamics.' },
        { name: 'Turn 12', number: 12, type: 'Right', difficulty: 'Medium', description: 'Fast right-hander leading to stadium.' },
        { name: 'Stadium Section', number: 13, type: 'Left-Right-Left', difficulty: 'Hard', description: 'Technical section in front of massive crowd.' },
        { name: 'Turn 17', number: 17, type: 'Right', difficulty: 'Medium', description: 'Final corner onto main straight.' }
      ],
      sectors: [
        { number: 1, description: 'Technical opening sector with heavy braking zones', characteristics: ['Overtaking spots', 'Traction zones', 'Brake management'] },
        { number: 2, description: 'Fast middle sector with flowing corners', characteristics: ['High speed', 'Aero efficiency', 'Commitment'] },
        { number: 3, description: 'Technical final sector in stadium', characteristics: ['Exit speed', 'DRS activation', 'Setup compromise'] }
      ],
      strategy: {
        overtaking: 'Good opportunities into Turns 1 and 4 with DRS assistance',
        setup: 'High downforce to compensate for thin air at altitude',
        tires: 'Soft compounds work well with moderate degradation',
        fuel: 'High consumption due to thin air affecting engine performance'
      },
      history: [
        { year: 1963, event: 'First Mexican GP won by Jim Clark' },
        { year: 1986, event: 'Prost wins championship after Mansell tire failure' },
        { year: 1990, event: 'Last race before long absence from calendar' },
        { year: 2015, event: 'Return to calendar after 23 years' }
      ]
    },
    {
      name: 'Interlagos Circuit',
      location: 'São Paulo, Brazil',
      continent: 'South America',
      length: '4.309 km',
      turns: 15,
      lapRecord: '1:10.540 - Lewis Hamilton (2018)',
      firstGP: 1973,
      drsZones: 2,
      description: 'A short but challenging anti-clockwise circuit with elevation changes and unpredictable weather.',
      keyFeatures: ['Elevation changes', 'Anti-clockwise', 'Unpredictable weather', 'Historic venue'],
      difficulty: 'Hard',
      weather: 'Unpredictable - can change quickly',
      surface: 'Bumpy tarmac with some patches',
      corners: [
        { name: 'Senna S', number: 1, type: 'Right-Left', difficulty: 'Expert', description: 'High-speed opening complex named after Ayrton Senna.' },
        { name: 'Curva do Sol', number: 3, type: 'Left', difficulty: 'Medium', description: 'Fast left-hander leading to back straight.' },
        { name: 'Descida do Lago', number: 4, type: 'Right', difficulty: 'Hard', description: 'Downhill right-hander testing aerodynamics.' },
        { name: 'Ferradura', number: 6, type: 'Left', difficulty: 'Medium', description: 'Tight left-hander leading to technical section.' },
        { name: 'Junção', number: 8, type: 'Right', difficulty: 'Hard', description: 'Fast right-hander before final sector.' },
        { name: 'Bico de Pato', number: 10, type: 'Left', difficulty: 'Medium', description: 'Technical left-hander before final straight.' }
      ],
      sectors: [
        { number: 1, description: 'High-speed opening sector with Senna S', characteristics: ['Commitment', 'Precision', 'Aero efficiency'] },
        { number: 2, description: 'Fast middle sector with elevation changes', characteristics: ['High speed', 'Braking zones', 'Rhythm'] },
        { number: 3, description: 'Technical final sector leading to main straight', characteristics: ['Exit speed', 'DRS activation', 'Setup compromise'] }
      ],
      strategy: {
        overtaking: 'Good opportunities into Turns 1 and 4 with DRS assistance',
        setup: 'Balanced between downforce and straight-line speed',
        tires: 'Soft compounds work well but high degradation from bumps',
        fuel: 'Moderate consumption with mix of acceleration zones'
      },
      history: [
        { year: 1973, event: 'First Brazilian GP at Interlagos' },
        { year: 1991, event: 'Senna\'s emotional home victory' },
        { year: 2008, event: 'Hamilton wins championship on last corner' },
        { year: 2012, event: 'Vettel wins championship after dramatic race' }
      ]
    },
    {
      name: 'Las Vegas Strip Circuit',
      location: 'Las Vegas, USA',
      continent: 'North America',
      length: '6.201 km',
      turns: 17,
      lapRecord: '1:35.490 - Oscar Piastri (2023)',
      firstGP: 2023,
      drsZones: 3,
      description: 'A new street circuit featuring long straights and tight corners along the famous Las Vegas Strip.',
      keyFeatures: ['Night race', 'Long straights', 'Tight corners', 'Cold conditions'],
      difficulty: 'Medium',
      weather: 'Cold desert nights',
      surface: 'Smooth street surface',
      corners: [
        { name: 'Turn 1', number: 1, type: 'Right', difficulty: 'Medium', description: 'Heavy braking zone after main straight.' },
        { name: 'Turn 5', number: 5, type: 'Left', difficulty: 'Hard', description: 'Tight left-hander with wall proximity.' },
        { name: 'Turn 12', number: 12, type: 'Right', difficulty: 'Medium', description: 'Fast right-hander leading to back straight.' },
        { name: 'Turn 14', number: 14, type: 'Left', difficulty: 'Hard', description: 'Tight left-hander before final sector.' },
        { name: 'Turn 17', number: 17, type: 'Right', difficulty: 'Medium', description: 'Final corner onto main straight.' }
      ],
      sectors: [
        { number: 1, description: 'Technical opening sector with heavy braking zones', characteristics: ['Overtaking spots', 'Traction zones', 'Brake management'] },
        { number: 2, description: 'Fast middle sector with long straights', characteristics: ['Top speed', 'DRS effect', 'Slipstreaming'] },
        { number: 3, description: 'Technical final sector leading to main straight', characteristics: ['Wall proximity', 'Precision', 'Setup compromise'] }
      ],
      strategy: {
        overtaking: 'Good opportunities into Turns 1, 5 and 14 with DRS assistance',
        setup: 'Low downforce for straight-line speed but enough for tight corners',
        tires: 'Soft compounds work well but high degradation from braking',
        fuel: 'High consumption due to acceleration zones'
      },
      history: [
        { year: 2023, event: 'First Las Vegas GP won by Max Verstappen' }
      ]
    },
    {
      name: 'Yas Marina Circuit',
      location: 'Abu Dhabi, UAE',
      continent: 'Asia',
      length: '5.281 km',
      turns: 16,
      lapRecord: '1:26.103 - Max Verstappen (2021)',
      firstGP: 2009,
      drsZones: 2,
      description: 'A twilight race at a luxurious facility featuring a hotel straddling the track and technical corners.',
      keyFeatures: ['Twilight race', 'Yas Hotel', 'Technical sections', 'Season finale'],
      difficulty: 'Medium',
      weather: 'Warm evenings',
      surface: 'Smooth tarmac with some bumps',
      corners: [
        { name: 'Turn 1', number: 1, type: 'Right', difficulty: 'Medium', description: 'Heavy braking zone after main straight.' },
        { name: 'Turn 3', number: 3, type: 'Left', difficulty: 'Hard', description: 'Fast left-hander testing aerodynamics.' },
        { name: 'Turn 5', number: 5, type: 'Right', difficulty: 'Medium', description: 'Technical right-hander leading to back straight.' },
        { name: 'Turn 11', number: 11, type: 'Left', difficulty: 'Hard', description: 'Tight left-hander before final sector.' },
        { name: 'Turn 17', number: 17, type: 'Right', difficulty: 'Medium', description: 'Final corner onto main straight.' }
      ],
      sectors: [
        { number: 1, description: 'Technical opening sector with heavy braking zones', characteristics: ['Overtaking spots', 'Traction zones', 'Brake management'] },
        { number: 2, description: 'Fast middle sector with flowing corners', characteristics: ['High speed', 'Aero efficiency', 'Commitment'] },
        { number: 3, description: 'Technical final sector leading to main straight', characteristics: ['Exit speed', 'DRS activation', 'Setup compromise'] }
      ],
      strategy: {
        overtaking: 'Good opportunities into Turns 1, 5 and 11 with DRS assistance',
        setup: 'Balanced between downforce and straight-line speed',
        tires: 'Soft compounds work well with moderate degradation',
        fuel: 'Moderate consumption with mix of acceleration zones'
      },
      history: [
        { year: 2009, event: 'First Abu Dhabi GP won by Sebastian Vettel' },
        { year: 2010, event: 'Vettel wins first championship in dramatic finale' },
        { year: 2016, event: 'Hamilton wins championship after Rosberg retirement' },
        { year: 2021, event: 'Controversial finale decides Verstappen-Hamilton title fight' }
      ]
    },
    {
      name: 'Lusail International Circuit',
      location: 'Doha, Qatar',
      continent: 'Asia',
      length: '5.419 km',
      turns: 16,
      lapRecord: '1:24.319 - Max Verstappen (2023)',
      firstGP: 2021,
      drsZones: 2,
      description: 'A fast-flowing circuit in the desert featuring high-speed corners and challenging conditions.',
      keyFeatures: ['Desert location', 'High-speed corners', 'Night race', 'Challenging conditions'],
      difficulty: 'Hard',
      weather: 'Hot and dry',
      surface: 'Smooth tarmac with some bumps',
      corners: [
        { name: 'Turn 1', number: 1, type: 'Right', difficulty: 'Medium', description: 'Heavy braking zone after main straight.' },
        { name: 'Turn 6', number: 6, type: 'Left', difficulty: 'Hard', description: 'Fast left-hander testing aerodynamics.' },
        { name: 'Turn 10', number: 10, type: 'Right', difficulty: 'Medium', description: 'Technical right-hander leading to back straight.' },
        { name: 'Turn 13', number: 13, type: 'Left', difficulty: 'Hard', description: 'Tight left-hander before final sector.' },
        { name: 'Turn 16', number: 16, type: 'Right', difficulty: 'Medium', description: 'Final corner onto main straight.' }
      ],
      sectors: [
        { number: 1, description: 'Technical opening sector with heavy braking zones', characteristics: ['Overtaking spots', 'Traction zones', 'Brake management'] },
        { number: 2, description: 'Fast middle sector with flowing corners', characteristics: ['High speed', 'Aero efficiency', 'Commitment'] },
        { number: 3, description: 'Technical final sector leading to main straight', characteristics: ['Exit speed', 'DRS activation', 'Setup compromise'] }
      ],
      strategy: {
        overtaking: 'Good opportunities into Turns 1 and 10 with DRS assistance',
        setup: 'Balanced between downforce and straight-line speed',
        tires: 'Soft compounds work well but high degradation in hot conditions',
        fuel: 'High consumption due to hot conditions and acceleration zones'
      },
      history: [
        { year: 2021, event: 'First Qatar GP won by Lewis Hamilton' },
        { year: 2023, event: 'Return to calendar with Verstappen winning' }
      ]
    },
    {
      name: 'Shanghai International Circuit',
      location: 'Shanghai, China',
      continent: 'Asia',
      length: '5.451 km',
      turns: 16,
      lapRecord: '1:32.238 - Michael Schumacher (2004)',
      firstGP: 2004,
      drsZones: 2,
      description: 'A technical circuit featuring the unique Turn 1-2-3 complex that resembles the Chinese character "shang".',
      keyFeatures: ['Turn 1-2-3 complex', 'Long straights', 'Technical sections', 'Variable conditions'],
      difficulty: 'Hard',
      weather: 'Variable conditions',
      surface: 'Smooth tarmac with some bumps',
      corners: [
        { name: 'Turn 1', number: 1, type: 'Right', difficulty: 'Expert', description: 'Long tightening right-hander forming part of "shang" complex.' },
        { name: 'Turn 2', number: 2, type: 'Left', difficulty: 'Expert', description: 'Immediate left after Turn 1.' },
        { name: 'Turn 3', number: 3, type: 'Right', difficulty: 'Expert', description: 'Final part of "shang" complex.' },
        { name: 'Turn 6', number: 6, type: 'Left', difficulty: 'Hard', description: 'Fast left-hander testing aerodynamics.' },
        { name: 'Turn 11', number: 11, type: 'Right', difficulty: 'Medium', description: 'Technical right-hander leading to back straight.' },
        { name: 'Turn 14', number: 14, type: 'Left', difficulty: 'Hard', description: 'Tight left-hander before final sector.' }
      ],
      sectors: [
        { number: 1, description: 'Technical opening sector with "shang" complex', characteristics: ['Commitment', 'Precision', 'Aero efficiency'] },
        { number: 2, description: 'Fast middle sector with flowing corners', characteristics: ['High speed', 'Braking zones', 'Rhythm'] },
        { number: 3, description: 'Technical final sector leading to main straight', characteristics: ['Exit speed', 'DRS activation', 'Setup compromise'] }
      ],
      strategy: {
        overtaking: 'Good opportunities into Turns 1 and 14 with DRS assistance',
        setup: 'Balanced between downforce and straight-line speed',
        tires: 'Soft compounds work well with moderate degradation',
        fuel: 'Moderate consumption with mix of acceleration zones'
      },
      history: [
        { year: 2004, event: 'First Chinese GP won by Rubens Barrichello' },
        { year: 2007, event: 'Hamilton crashes out of pit entry while leading' },
        { year: 2011, event: 'Hamilton wins after bold tire strategy' },
        { year: 2018, event: 'Ricciardo wins after Verstappen and Vettel collide' }
      ]
    }
  ];

  // Filter circuits by continent
  const filteredCircuits = selectedContinent === 'All' 
    ? circuits 
    : circuits.filter(circuit => circuit.continent === selectedContinent);

  // Get unique continents for filter
  const continents = ['All', ...new Set(circuits.map(circuit => circuit.continent))];

  // Track Guide Dialog Component
  const TrackGuideDialog = ({ track }: { track: any }) => {
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
          {filteredCircuits.map((circuit, index) => (
            <Card 
              key={index} 
              className="group overflow-hidden border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            >
              {/* Track Image Section */}
              <div className="relative">
                <AspectRatio ratio={16/9} className="bg-gradient-to-br from-muted/50 to-muted">
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/30 flex items-center justify-center">
                    {/* Track Image Placeholder */}
                    <div className="text-center">
                      <Route className="h-16 w-16 text-primary/60 mx-auto mb-2" />
                      <span className="text-sm font-medium text-muted-foreground">
                        Track Layout
                      </span>
                    </div>
                  </div>
                  
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