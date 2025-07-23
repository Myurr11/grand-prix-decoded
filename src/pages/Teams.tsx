import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Users, MapPin, Calendar, Star, Zap } from 'lucide-react';

const Teams = () => {
  const teams = [
  {
    name: 'Red Bull Racing',
    country: 'Austria',
    founded: 2005,
    championships: 6,
    drivers: ['Max Verstappen', 'Yuki Tsunoda'],
    colorClass: 'border-blue-500 bg-blue-500/5 hover:bg-blue-500/10',
    accentColor: 'text-blue-600 border-blue-500',
    iconColor: 'text-blue-500',
    description: 'Dominant force in modern F1 with innovative design and strategy.'
  },
  {
    name: 'Mercedes-AMG',
    country: 'Germany',
    founded: 2010,
    championships: 8,
    drivers: ['Andrea Kimi Antonelli', 'George Russell'],
    colorClass: 'border-teal-500 bg-teal-500/5 hover:bg-teal-500/10',
    accentColor: 'text-teal-600 border-teal-500',
    iconColor: 'text-teal-500',
    description: 'Silver Arrows with a legacy of engineering excellence.'
  },
  {
    name: 'Scuderia Ferrari',
    country: 'Italy',
    founded: 1950,
    championships: 16,
    drivers: ['Charles Leclerc', 'Lewis Hamilton'],
    colorClass: 'border-red-500 bg-red-500/5 hover:bg-red-500/10',
    accentColor: 'text-red-600 border-red-500',
    iconColor: 'text-red-500',
    description: 'The most successful and historic team in Formula 1.'
  },
  {
    name: 'McLaren Racing',
    country: 'United Kingdom',
    founded: 1966,
    championships: 8,
    drivers: ['Lando Norris', 'Oscar Piastri'],
    colorClass: 'border-orange-500 bg-orange-500/5 hover:bg-orange-500/10',
    accentColor: 'text-orange-600 border-orange-500',
    iconColor: 'text-orange-500',
    description: 'Racing heritage with cutting-edge technology and innovation.'
  },
  {
    name: 'Aston Martin',
    country: 'United Kingdom',
    founded: 2021,
    championships: 0,
    drivers: ['Fernando Alonso', 'Lance Stroll'],
    colorClass: 'border-green-500 bg-green-500/5 hover:bg-green-500/10',
    accentColor: 'text-green-600 border-green-500',
    iconColor: 'text-green-500',
    description: 'Luxury automotive brand bringing prestige to Formula 1.'
  },
  {
    name: 'Alpine F1',
    country: 'France',
    founded: 2021,
    championships: 2,
    drivers: ['Pierre Gasly', 'Franco Colapinto'],
    colorClass: 'border-blue-400 bg-blue-400/5 hover:bg-blue-400/10',
    accentColor: 'text-blue-500 border-blue-400',
    iconColor: 'text-blue-400',
    description: 'French manufacturer with Alpine racing DNA.'
  },
  {
    name: 'Visa Cash App RB',
    country: 'Italy',
    founded: 2006,
    championships: 0,
    drivers: ['Isack Hadjar', 'Liam Lawson'],
    colorClass: 'border-indigo-500 bg-indigo-500/5 hover:bg-indigo-500/10',
    accentColor: 'text-indigo-600 border-indigo-500',
    iconColor: 'text-indigo-500',
    description: 'Red Bull sister team, focused on driver development and performance.'
  },
  {
    name: 'Stake F1 Team Kick Sauber',
    country: 'Switzerland',
    founded: 1993,
    championships: 0,
    drivers: ['Gabriel Bortoleto', 'Nico Hülkenberg'],
    colorClass: 'border-lime-500 bg-lime-500/5 hover:bg-lime-500/10',
    accentColor: 'text-lime-600 border-lime-500',
    iconColor: 'text-lime-500',
    description: 'Transitioning towards Audi 2026 entry with growing ambitions.'
  },
  {
    name: 'Haas F1 Team',
    country: 'United States',
    founded: 2016,
    championships: 0,
    drivers: ['Oliver Bearman', 'Esteban Ocon'],
    colorClass: 'border-gray-500 bg-gray-500/5 hover:bg-gray-500/10',
    accentColor: 'text-gray-600 border-gray-500',
    iconColor: 'text-gray-500',
    description: 'American team focused on efficient performance and strategic growth.'
  },
  {
    name: 'Williams Racing',
    country: 'United Kingdom',
    founded: 1977,
    championships: 9,
    drivers: ['Alex Albon', 'Carlos Sainz'],
    colorClass: 'border-cyan-500 bg-cyan-500/5 hover:bg-cyan-500/10',
    accentColor: 'text-cyan-600 border-cyan-500',
    iconColor: 'text-cyan-500',
    description: 'A legendary name in F1 rebuilding its legacy with new leadership.'
  }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-accent/20 via-background to-background">
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        
        <div className="container relative mx-auto px-4 py-16">
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-primary/10 p-4">
                <Trophy className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-6xl">
              Teams & Drivers
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
              Meet the constructors and drivers competing for F1 glory in the 2025 season
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Teams Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teams.map((team, index) => (
            <Card 
              key={index} 
              className={`group overflow-hidden border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${team.colorClass}`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="mb-3 text-xl font-bold leading-tight">
                      {team.name}
                    </CardTitle>
                    
                    <div className="flex flex-wrap gap-3 text-sm">
                      <div className="flex items-center gap-1.5">
                        <MapPin className={`h-4 w-4 ${team.iconColor}`} />
                        <span className="text-muted-foreground">{team.country}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className={`h-4 w-4 ${team.iconColor}`} />
                        <span className="text-muted-foreground">Est. {team.founded}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant="outline" className={`${team.accentColor} font-semibold`}>
                      <Trophy className="mr-1 h-3 w-3" />
                      {team.championships} titles
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {team.description}
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Users className={`h-4 w-4 ${team.iconColor}`} />
                    <span className="text-sm font-semibold">Current Drivers</span>
                  </div>
                  
                  <div className="space-y-2">
                    {team.drivers.map((driver, driverIndex) => (
                      <div
                        key={driverIndex}
                        className={`group/driver flex items-center justify-between rounded-lg border-2 p-3 transition-all duration-200 hover:shadow-md ${team.colorClass}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold ${team.accentColor}`}>
                            {driverIndex + 1}
                          </div>
                          <span className="font-medium">{driver}</span>
                        </div>
                        <Zap className={`h-4 w-4 opacity-50 transition-opacity group-hover/driver:opacity-100 ${team.iconColor}`} />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Championship Leaderboard */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Constructor Championships</h2>
            <p className="text-muted-foreground">All-time championship wins by team</p>
          </div>
          
          <div className="rounded-xl border bg-card p-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {teams
                .sort((a, b) => b.championships - a.championships)
                .slice(0, 10)
                .map((team, index) => (
                <div key={index} className="text-center group">
                  <div className="relative mb-3">
                    <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full border-4 transition-all duration-200 group-hover:scale-110 ${team.colorClass} ${team.accentColor}`}>
                      {index < 3 ? (
                        <Star className={`h-8 w-8 ${team.iconColor}`} />
                      ) : (
                        <Trophy className={`h-6 w-6 ${team.iconColor}`} />
                      )}
                    </div>
                    {index < 3 && (
                      <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {index + 1}
                      </div>
                    )}
                  </div>
                  <div className="text-2xl font-bold">{team.championships}</div>
                  <div className="text-xs text-muted-foreground font-medium leading-tight">
                    {team.name.split(' ')[0]}
                    {team.name.includes('Racing') && ' Racing'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;