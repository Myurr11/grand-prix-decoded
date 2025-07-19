import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Users, MapPin } from 'lucide-react';

const Teams = () => {
  const teams = [
  {
    name: 'Red Bull Racing',
    country: 'Austria',
    founded: 2005,
    championships: 6,
    drivers: ['Max Verstappen', 'Yuki Tsunoda'],
    color: 'bg-blue-600',
    description: 'Dominant force in modern F1 with innovative design and strategy.'
  },
  {
    name: 'Mercedes-AMG',
    country: 'Germany',
    founded: 2010,
    championships: 8,
    drivers: ['Andrea Kimi Antonelli', 'George Russell'],
    color: 'bg-teal-500',
    description: 'Silver Arrows with a legacy of engineering excellence.'
  },
  {
    name: 'Scuderia Ferrari',
    country: 'Italy',
    founded: 1950,
    championships: 16,
    drivers: ['Charles Leclerc', 'Lewis Hamilton'],
    color: 'bg-red-600',
    description: 'The most successful and historic team in Formula 1.'
  },
  {
    name: 'McLaren Racing',
    country: 'United Kingdom',
    founded: 1966,
    championships: 8,
    drivers: ['Lando Norris', 'Oscar Piastri'],
    color: 'bg-orange-500',
    description: 'Racing heritage with cutting-edge technology and innovation.'
  },
  {
    name: 'Aston Martin',
    country: 'United Kingdom',
    founded: 2021,
    championships: 0,
    drivers: ['Fernando Alonso', 'Lance Stroll'],
    color: 'bg-green-600',
    description: 'Luxury automotive brand bringing prestige to Formula 1.'
  },
  {
    name: 'Alpine F1',
    country: 'France',
    founded: 2021,
    championships: 2,
    drivers: ['Pierre Gasly', 'Franco Colapinto'],
    color: 'bg-blue-500',
    description: 'French manufacturer with Alpine\'s racing DNA.'
  },
  {
    name: 'Visa Cash App RB',
    country: 'Italy',
    founded: 2006,
    championships: 0,
    drivers: ['Isack Hadjar', 'Liam Lawson'],
    color: 'bg-indigo-600',
    description: 'Red Bull’s sister team, focused on driver development and performance.'
  },
  {
    name: 'Stake F1 Team Kick Sauber',
    country: 'Switzerland',
    founded: 1993,
    championships: 0,
    drivers: ['Gabriel Bortoleto', 'Nico Hülkenberg'],
    color: 'bg-lime-600',
    description: 'Transitioning towards Audi’s 2026 entry with growing ambitions.'
  },
  {
    name: 'Haas F1 Team',
    country: 'United States',
    founded: 2016,
    championships: 0,
    drivers: ['Oliver Bearman', 'Esteban Ocon'],
    color: 'bg-gray-700',
    description: 'American team focused on efficient performance and strategic growth.'
  },
  {
    name: 'Williams Racing',
    country: 'United Kingdom',
    founded: 1977,
    championships: 9,
    drivers: ['Alex Albon', 'Carlos Sainz'],
    color: 'bg-cyan-700',
    description: 'A legendary name in F1 rebuilding its legacy with new leadership.'
  }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
          Teams & Drivers
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Meet the constructors and drivers competing for F1 glory
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team, index) => (
          <Card key={index} className="card-racing group overflow-hidden">
            <div className={`h-2 ${team.color}`}></div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-primary mb-2">
                    {team.name}
                  </CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{team.country}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Trophy className="h-4 w-4" />
                      <span>{team.championships} titles</span>
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  Est. {team.founded}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {team.description}
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="font-semibold text-sm">Current Drivers:</span>
                </div>
                <div className="space-y-2">
                  {team.drivers.map((driver, driverIndex) => (
                    <div
                      key={driverIndex}
                      className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-primary/10 transition-colors duration-200"
                    >
                      <span className="font-medium">{driver}</span>
                      <Badge variant="secondary" className="text-xs">
                        #{driverIndex + 1}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Championship Stats */}
      <div className="mt-16 bg-secondary rounded-xl p-8">
        <h2 className="text-2xl font-bold text-secondary-foreground mb-6 text-center">
          Constructor Championships
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {teams.map((team, index) => (
            <div key={index} className="text-center">
              <div className={`w-12 h-12 ${team.color} rounded-full mx-auto mb-2 flex items-center justify-center`}>
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div className="text-lg font-bold text-secondary-foreground">{team.championships}</div>
              <div className="text-xs text-muted-foreground">{team.name.split(' ')[0]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Teams;