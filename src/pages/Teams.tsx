import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Trophy, Users, MapPin, Calendar, Star, Zap, Car } from 'lucide-react';

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
        <div className="grid gap-8 lg:grid-cols-2">
          {teams.map((team, index) => (
            <Card 
              key={index} 
              className={`group overflow-hidden border-2 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl ${team.colorClass}`}
            >
              {/* Team Header with Logo and Car */}
              <div className="relative">
                <div className={`h-32 bg-gradient-to-r ${team.colorClass} flex items-center justify-center`}>
                  {/* Team Logo Placeholder */}
                  <div className="absolute left-6 top-4">
                    <div className={`w-16 h-16 rounded-full bg-background/90 border-2 ${team.accentColor} flex items-center justify-center`}>
                      <span className="text-xs font-bold text-center leading-tight">
                        LOGO
                      </span>
                    </div>
                  </div>
                  
                  {/* Car Image Placeholder */}
                  <div className="absolute right-6 top-1/2 -translate-y-1/2">
                    <div className={`w-20 h-12 rounded bg-background/20 border ${team.accentColor} flex items-center justify-center`}>
                      <Car className={`h-6 w-6 ${team.iconColor}`} />
                    </div>
                  </div>
                  
                  {/* Championships Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className={`${team.accentColor} font-bold bg-background/90`}>
                      <Trophy className="mr-1 h-3 w-3" />
                      {team.championships}
                    </Badge>
                  </div>
                </div>
                
                {/* Team Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/95 to-transparent p-4">
                  <CardTitle className="text-xl font-bold mb-1">{team.name}</CardTitle>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {team.country}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {team.founded}
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  {team.description}
                </p>
                
                {/* Drivers Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Users className={`h-5 w-5 ${team.iconColor}`} />
                    <span className="font-semibold">2025 Drivers</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {team.drivers.map((driver, driverIndex) => (
                      <div
                        key={driverIndex}
                        className={`group/driver relative overflow-hidden rounded-lg border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${team.colorClass}`}
                      >
                        {/* Driver Photo Placeholder */}
                        <div className="aspect-[3/4] bg-gradient-to-b from-muted/50 to-muted relative">
                          <Avatar className="w-full h-full rounded-none">
                            <AvatarImage src="" alt={driver} />
                            <AvatarFallback className="w-full h-full rounded-none bg-gradient-to-b from-muted/30 to-muted flex items-center justify-center text-4xl font-bold">
                              {driver.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          
                          {/* Driver Number Badge */}
                          <div className="absolute top-3 left-3">
                            <div className={`w-8 h-8 rounded-full border-2 ${team.accentColor} bg-background/90 flex items-center justify-center text-sm font-bold`}>
                              {driverIndex + 1}
                            </div>
                          </div>
                          
                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                        </div>
                        
                        {/* Driver Info */}
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <div className="text-sm font-bold leading-tight mb-1">
                            {driver}
                          </div>
                          <div className={`text-xs font-medium ${team.iconColor}`}>
                            {team.name.split(' ')[0]} Driver
                          </div>
                        </div>
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