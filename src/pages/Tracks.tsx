import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Zap, Trophy, Calendar, Globe, ArrowRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

const Tracks = () => {
  const [selectedContinent, setSelectedContinent] = useState('All');

  // Circuit data
  const circuits = [
    // 2025 Calendar Circuits
    {
      name: 'Bahrain International Circuit',
      location: 'Sakhir, Bahrain',
      continent: 'Asia',
      length: '5.412 km',
      turns: 15,
      lapRecord: '1:31.447 - Pedro de la Rosa (2005)',
      firstGP: 2004,
      drsZones: 3,
      description: 'A desert track with long straights and heavy braking zones, known for testing car reliability in hot conditions.',
      keyFeatures: ['Long straights', 'Heavy braking zones', 'Night race', 'Abrasive surface']
    },
    {
      name: 'Jeddah Corniche Circuit',
      location: 'Jeddah, Saudi Arabia',
      continent: 'Asia',
      length: '6.174 km',
      turns: 27,
      lapRecord: '1:30.734 - Lewis Hamilton (2021)',
      firstGP: 2021,
      drsZones: 3,
      description: 'The fastest street circuit on the calendar with high-speed flowing corners and walls close to the track.',
      keyFeatures: ['High speed', 'Street circuit', 'Night race', 'Long sweeping corners']
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
      description: 'A semi-street circuit set around a lake in a park, featuring a mix of medium and high-speed corners.',
      keyFeatures: ['Semi-street circuit', 'Medium-speed corners', 'Bumpy surface', 'Seasonal opener']
    },
    {
      name: 'Suzuka Circuit',
      location: 'Suzuka, Japan',
      continent: 'Asia',
      length: '5.807 km',
      turns: 18,
      lapRecord: '1:30.983 - Lewis Hamilton (2019)',
      firstGP: 1987,
      drsZones: 1,
      description: 'A figure-8 layout with a mix of high-speed corners and technical sections, considered a true drivers\'s circuit.',
      keyFeatures: ['Figure-8 layout', '130R corner', 'Spoon curve', 'Technical sections']
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
      description: 'A modern circuit with elevation changes and a mix of corners inspired by classic tracks around the world.',
      keyFeatures: ['Elevation changes', 'Fast first sector', 'Stadium section', 'Long back straight']
    },
    {
      name: 'Silverstone Circuit',
      location: 'Silverstone, United Kingdom',
      continent: 'Europe',
      length: '5.891 km',
      turns: 18,
      lapRecord: '1:27.097 - Max Verstappen (2020)',
      firstGP: 1950,
      drsZones: 2,
      description: 'One of the fastest tracks on the calendar with high-speed corners that test aerodynamic efficiency.',
      keyFeatures: ['High-speed corners', 'Maggots & Becketts complex', 'British weather', 'Historic venue']
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
      keyFeatures: ['Tight hairpin', 'Casino Square', 'Tunnel section', 'No overtaking zones']
    },
    {
      name: 'Autódromo José Carlos Pace',
      location: 'São Paulo, Brazil',
      continent: 'South America',
      length: '4.309 km',
      turns: 15,
      lapRecord: '1:10.540 - Valtteri Bottas (2018)',
      firstGP: 1973,
      drsZones: 2,
      description: 'Also known as Interlagos, this anti-clockwise circuit features elevation changes and unpredictable weather.',
      keyFeatures: ['Anti-clockwise layout', 'Elevation changes', 'Senna S', 'Unpredictable weather']
    },
    {
      name: 'Circuit Gilles Villeneuve',
      location: 'Montreal, Canada',
      continent: 'North America',
      length: '4.361 km',
      turns: 14,
      lapRecord: '1:13.078 - Valtteri Bottas (2019)',
      firstGP: 1978,
      drsZones: 3,
      description: 'A semi-street circuit on an island with long straights and chicanes, requiring good traction and braking stability.',
      keyFeatures: ['Wall of Champions', 'Long straights', 'Chicanes', 'Wildlife on track']
    },
    {
      name: 'Circuit de Barcelona-Catalunya',
      location: 'Barcelona, Spain',
      continent: 'Europe',
      length: '4.675 km',
      turns: 16,
      lapRecord: '1:18.149 - Max Verstappen (2021)',
      firstGP: 1991,
      drsZones: 2,
      description: 'A well-balanced circuit that tests all aspects of car performance, often used for pre-season testing.',
      keyFeatures: ['Technical first sector', 'High-speed corners', 'Testing venue', 'Low grip surface']
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
      description: 'A short but challenging circuit with significant elevation changes and fast sweeping corners.',
      keyFeatures: ['Elevation changes', 'Short lap time', 'Fast corners', 'Mountain backdrop']
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
      description: 'A tight and twisty circuit often compared to a karting track, with few overtaking opportunities.',
      keyFeatures: ['Twisty layout', 'Hot conditions', 'Low grip', 'Difficult overtaking']
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
      keyFeatures: ['Eau Rouge', 'Longest track', 'Microclimate', 'High-speed sections']
    },
    {
      name: 'Circuit Zandvoort',
      location: 'Zandvoort, Netherlands',
      continent: 'Europe',
      length: '4.259 km',
      turns: 14,
      lapRecord: '1:11.097 - Lewis Hamilton (2021)',
      firstGP: 1952,
      drsZones: 2,
      description: 'A classic circuit revamped with banked corners, set among the sand dunes near the North Sea coast.',
      keyFeatures: ['Banked corners', 'Narrow track', 'Sand nearby', 'Technical sections']
    },
    {
      name: 'Autodromo Nazionale Monza',
      location: 'Monza, Italy',
      continent: 'Europe',
      length: '5.793 km',
      turns: 11,
      lapRecord: '1:21.046 - Rubens Barrichello (2004)',
      firstGP: 1950,
      drsZones: 2,
      description: 'The Temple of Speed, featuring long straights and fast corners that create the fastest average speeds of the season.',
      keyFeatures: ['High speed', 'Parabolica', 'Historic venue', 'Low downforce setup']
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
      description: 'A unique street circuit with a mix of tight sections through the old city and a 2.2km straight.',
      keyFeatures: ['Castle section', 'Long straight', 'Narrow sections', 'Unpredictable races']
    },
    {
      name: 'Marina Bay Street Circuit',
      location: 'Singapore',
      continent: 'Asia',
      length: '4.940 km',
      turns: 19,
      lapRecord: '1:41.905 - Kevin Magnussen (2018)',
      firstGP: 2008,
      drsZones: 3,
      description: 'The original night race on the calendar, featuring a bumpy street circuit with 23 corners and high humidity.',
      keyFeatures: ['Night race', 'Humidity', 'Physical challenge', 'Bumpy surface']
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
      description: 'A modern circuit with elevation changes and a mix of corners inspired by classic tracks around the world.',
      keyFeatures: ['Elevation changes', 'Fast first sector', 'Stadium section', 'Long back straight']
    },
    {
      name: 'Autódromo Hermanos Rodríguez',
      location: 'Mexico City, Mexico',
      continent: 'North America',
      length: '4.304 km',
      turns: 17,
      lapRecord: '1:17.774 - Valtteri Bottas (2021)',
      firstGP: 1963,
      drsZones: 3,
      description: 'A high-altitude circuit that challenges engines and aerodynamics, featuring the unique stadium section.',
      keyFeatures: ['High altitude', 'Stadium section', 'Low grip', 'Thin air']
    },
    {
      name: 'Lusail International Circuit',
      location: 'Lusail, Qatar',
      continent: 'Asia',
      length: '5.380 km',
      turns: 16,
      lapRecord: '1:24.319 - Max Verstappen (2021)',
      firstGP: 2021,
      drsZones: 2,
      description: 'A flowing circuit with a mix of medium and high-speed corners, originally designed for MotoGP.',
      keyFeatures: ['Flowing layout', 'Night race', 'High-speed corners', 'Desert conditions']
    },
    {
      name: 'Las Vegas Street Circuit',
      location: 'Las Vegas, USA',
      continent: 'North America',
      length: '6.120 km',
      turns: 17,
      lapRecord: '1:35.490 - Oscar Piastri (2023)',
      firstGP: 2023,
      drsZones: 3,
      description: 'A night race through the iconic Las Vegas Strip, featuring long straights and tight corners around famous landmarks.',
      keyFeatures: ['Night race', 'Long straights', 'Strip backdrop', 'Cold conditions']
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
      description: 'The traditional season finale, featuring a twilight race that transitions from day to night.',
      keyFeatures: ['Twilight race', 'Hotel backdrop', 'Marina setting', 'Season finale']
    },
    
    // Historic Circuits with Special Place in F1 Fans' Hearts
    {
      name: 'Nürburgring Nordschleife',
      location: 'Nürburg, Germany',
      continent: 'Europe',
      length: '20.832 km',
      turns: 73,
      lapRecord: '6:58.6 - Clay Regazzoni (1975)',
      firstGP: 1951,
      lastGP: 1976,
      drsZones: 0,
      description: 'The legendary "Green Hell", considered the most challenging and dangerous circuit in F1 history.',
      keyFeatures: ['20+ km length', 'Extreme danger', 'Elevation changes', 'Unpredictable weather']
    },
    {
      name: 'Circuit de Charade',
      location: 'Clermont-Ferrand, France',
      continent: 'Europe',
      length: '8.055 km',
      turns: 51,
      lapRecord: '3:00.75 - Jochen Rindt (1969)',
      firstGP: 1965,
      lastGP: 1972,
      drsZones: 0,
      description: 'A volcanic mountain circuit often compared to the Nordschleife, with dangerous volcanic rocks lining the track.',
      keyFeatures: ['Volcanic setting', 'Extreme elevation', 'Dangerous rocks', 'Twisty layout']
    },
    {
      name: 'Brands Hatch',
      location: 'Kent, United Kingdom',
      continent: 'Europe',
      length: '3.703 km',
      turns: 9,
      lapRecord: '1:09.593 - Nigel Mansell (1986)',
      firstGP: 1964,
      lastGP: 1986,
      drsZones: 0,
      description: 'A short but thrilling circuit with significant elevation changes and no real straights.',
      keyFeatures: ['Elevation changes', 'Paddock Hill Bend', 'Natural amphitheater', 'Challenging layout']
    },
    {
      name: 'Circuito del Jarama',
      location: 'Madrid, Spain',
      continent: 'Europe',
      length: '3.404 km',
      turns: 9,
      lapRecord: '1:16.44 - Gilles Villeneuve (1981)',
      firstGP: 1968,
      lastGP: 1981,
      drsZones: 0,
      description: 'A tight and twisty circuit where Gilles Villeneuve famously held off four faster cars for an entire race.',
      keyFeatures: ['Tight layout', 'Villeneuve\'s miracle', 'Technical challenge', 'Limited overtaking']
    },
    {
      name: 'Kyalami Circuit',
      location: 'Midrand, South Africa',
      continent: 'Africa',
      length: '4.104 km',
      turns: 9,
      lapRecord: '1:08.149 - Nigel Mansell (1985)',
      firstGP: 1967,
      lastGP: 1993,
      drsZones: 0,
      description: 'The high-altitude African circuit known for its long main straight and challenging corners.',
      keyFeatures: ['High altitude', 'Fast layout', 'Crowthorne Corner', 'African heat']
    },
    {
      name: 'Adelaide Street Circuit',
      location: 'Adelaide, Australia',
      continent: 'Oceania',
      length: '3.780 km',
      turns: 16,
      lapRecord: '1:15.381 - Damon Hill (1993)',
      firstGP: 1985,
      lastGP: 1995,
      drsZones: 0,
      description: 'The original Australian GP venue, known for exciting races and the famous 1986 title decider.',
      keyFeatures: ['Street circuit', 'Season finale', 'Chicane complex', 'Passionate crowds']
    },
    {
      name: 'Watkins Glen',
      location: 'New York, USA',
      continent: 'North America',
      length: '5.435 km',
      turns: 11,
      lapRecord: '1:33.291 - Alan Jones (1980)',
      firstGP: 1961,
      lastGP: 1980,
      drsZones: 0,
      description: 'The classic American F1 venue set in the beautiful Finger Lakes region of New York state.',
      keyFeatures: ['Natural setting', 'Fast flowing', 'Elevation changes', 'The Boot section']
    },
    {
      name: 'Autodromo Enzo e Dino Ferrari',
      location: 'Imola, Italy',
      continent: 'Europe',
      length: '4.909 km',
      turns: 19,
      lapRecord: '1:15.484 - Lewis Hamilton (2020)',
      firstGP: 1980,
      drsZones: 1,
      description: 'The historic Italian circuit that hosted the San Marino GP, forever linked to the tragic 1994 weekend.',
      keyFeatures: ['Anti-clockwise', 'Tamburello', 'Acque Minerali', 'Challenging elevation']
    },
    {
      name: 'Circuito de Jerez',
      location: 'Jerez, Spain',
      continent: 'Europe',
      length: '4.428 km',
      turns: 13,
      lapRecord: '1:23.135 - Ayrton Senna (1990)',
      firstGP: 1986,
      lastGP: 1997,
      drsZones: 0,
      description: 'The scene of the infamous 1997 title decider between Schumacher and Villeneuve.',
      keyFeatures: ['Technical layout', 'Dry conditions', 'Testing venue', 'Title showdown']
    },
    {
      name: 'Detroit Street Circuit',
      location: 'Detroit, USA',
      continent: 'North America',
      length: '4.023 km',
      turns: 17,
      lapRecord: '1:40.464 - Ayrton Senna (1987)',
      firstGP: 1982,
      lastGP: 1988,
      drsZones: 0,
      description: 'A challenging street circuit where Ayrton Senna showcased his street racing mastery.',
      keyFeatures: ['Bumpy surface', 'Concrete walls', 'Tight corners', 'Physical challenge']
    }
  ];

  // Filter circuits by continent
  const filteredCircuits = selectedContinent === 'All' 
    ? circuits 
    : circuits.filter(circuit => circuit.continent === selectedContinent);

  // Get unique continents for filter
  const continents = ['All', ...new Set(circuits.map(circuit => circuit.continent))];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
          Race Tracks
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore the legendary circuits where F1 history is made
        </p>
      </div>

      {/* Continent Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {continents.map((continent) => (
          <Badge 
            key={continent}
            variant={selectedContinent === continent ? "default" : "outline"}
            className="cursor-pointer text-sm py-1 px-3"
            onClick={() => setSelectedContinent(continent)}
          >
            {continent}
          </Badge>
        ))}
      </div>

      {/* Circuit Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filteredCircuits.map((circuit, index) => (
          <Card key={index} className="card-racing overflow-hidden">
            <div className="h-2 bg-primary"></div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{circuit.name}</CardTitle>
                  <div className="flex items-center mt-1 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 mr-1" />
                    <span>{circuit.location}</span>
                  </div>
                </div>
                <Badge variant="secondary">{circuit.continent}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Circuit Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/30 p-2 rounded-lg text-center">
                  <div className="text-xs text-muted-foreground mb-1">Length</div>
                  <div className="font-medium">{circuit.length}</div>
                </div>
                <div className="bg-muted/30 p-2 rounded-lg text-center">
                  <div className="text-xs text-muted-foreground mb-1">Turns</div>
                  <div className="font-medium">{circuit.turns}</div>
                </div>
                <div className="bg-muted/30 p-2 rounded-lg text-center">
                  <div className="text-xs text-muted-foreground mb-1">DRS Zones</div>
                  <div className="font-medium">{circuit.drsZones}</div>
                </div>
                <div className="bg-muted/30 p-2 rounded-lg text-center">
                  <div className="text-xs text-muted-foreground mb-1">{circuit.lastGP ? 'Last GP' : 'First GP'}</div>
                  <div className="font-medium">{circuit.lastGP || circuit.firstGP}</div>
                </div>
              </div>
              
              {/* Circuit Description */}
              <div>
                <p className="text-sm text-muted-foreground">{circuit.description}</p>
              </div>
              
              {/* Key Features */}
              <div>
                <div className="text-xs font-medium mb-2">KEY FEATURES</div>
                <div className="grid grid-cols-2 gap-2">
                  {circuit.keyFeatures.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Lap Record */}
              <div className="pt-2 border-t border-border">
                <div className="flex items-center text-xs">
                  <Trophy className="h-3.5 w-3.5 text-primary mr-1" />
                  <span className="font-medium">Lap Record:</span>
                  <span className="ml-1 text-muted-foreground">{circuit.lapRecord}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Circuit Facts */}
      <div className="mt-16 bg-secondary rounded-xl p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-secondary-foreground mb-6 text-center">
          Circuit Facts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <Calendar className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">24 Races</h3>
            <p className="text-sm text-muted-foreground">
              The 2025 F1 calendar features 24 races across 5 continents, making it a truly global championship
            </p>
          </div>
          <div>
            <Clock className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Historic Venues</h3>
            <p className="text-sm text-muted-foreground">
              From the 20km Nordschleife to the tight streets of Monaco, F1 has raced on some of the world's most challenging circuits
            </p>
          </div>
          <div>
            <Globe className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Evolving Calendar</h3>
            <p className="text-sm text-muted-foreground">
              The F1 calendar continues to evolve with new venues like Las Vegas joining traditional European circuits
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracks;