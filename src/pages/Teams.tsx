import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Trophy, MapPin, Calendar, Users, Flag, Star, Zap, Car } from 'lucide-react';
import { motion } from 'framer-motion';

const Teams = () => {
  const teams = [
    {
      name: 'Red Bull Racing',
      country: 'Austria',
      founded: 2005,
      championships: 6,
      drivers: [
        { name: 'Max Verstappen', image: '/assets/drivers/max-verstappen.png', number: 1, position: 'Lead Driver' },
        { name: 'Yuki Tsunoda', image: '/assets/drivers/yuki-tsunoda.png', number: 22, position: 'Driver' }
      ],
      teamColor: 'from-blue-600 via-blue-700 to-blue-800',
      accent: 'blue-500',
      logo: '/assets/teams/redbull-logo.png',
      car: '/assets/car/red-bull-car.png',
      description: 'Dominant force in modern F1 with innovative design and strategy.',
      status: 'Champions'
    },  
    {
      name: 'Mercedes-AMG Petronas',
      country: 'Germany',
      founded: 2010,
      championships: 8,
      drivers: [
        { name: 'Andrea Kimi Antonelli', image: 'assets/drivers/kimi-antonelli.png', number: 12, position: 'Driver' },
        { name: 'George Russell', image: 'assets/drivers/george-russell.png', number: 63, position: 'Lead Driver' }
      ],
      teamColor: 'from-teal-500 via-teal-600 to-teal-700',
      accent: 'teal-400',
      logo: '/assets/teams/mercedes-logo.png',
      car: '/assets/car/mercedes-car.png',
      description: 'Silver Arrows with a legacy of engineering excellence.',
      status: 'Contenders'
    },
    {
      name: 'Scuderia Ferrari',
      country: 'Italy',
      founded: 1950,
      championships: 16,
      drivers: [
        { name: 'Charles Leclerc', image: 'assets/drivers/charles-leclerc.png', number: 16, position: 'Lead Driver' },
        { name: 'Lewis Hamilton', image: 'assets/drivers/lewis-hamilton.png', number: 44, position: 'Champion Driver' }
      ],
      teamColor: 'from-red-600 via-red-700 to-red-800',
      accent: 'red-500',
      logo: '/assets/teams/ferrari-logo.png',
      car: '/assets/car/ferrari-car.png',
      description: 'The most successful and historic team in Formula 1.',
      status: 'Legacy'
    },
    {
      name: 'McLaren Racing',
      country: 'United Kingdom',
      founded: 1966,
      championships: 8,
      drivers: [
        { name: 'Lando Norris', image: 'assets/drivers/lando-norris.png', number: 4, position: 'Lead Driver' },
        { name: 'Oscar Piastri', image: 'assets/drivers/oscar-piastri.png', number: 81, position: 'Rising Star' }
      ],
      teamColor: 'from-orange-500 via-orange-600 to-orange-700',
      accent: 'orange-400',
      logo: '/assets/teams/mclaren-logo.png',
      car: '/assets/car/mclaren-car.png',
      description: 'Racing heritage with cutting-edge technology and innovation.',
      status: 'Innovators'
    },
    {
      name: 'Aston Martin Aramco',
      country: 'United Kingdom',
      founded: 2021,
      championships: 0,
      drivers: [
        { name: 'Fernando Alonso', image: 'assets/drivers/fernando-alonso.png', number: 14, position: 'Veteran Champion' },
        { name: 'Lance Stroll', image: 'assets/drivers/lance-stroll.png', number: 18, position: 'Driver' }
      ],
      teamColor: 'from-green-600 via-green-700 to-green-800',
      accent: 'green-500',
      logo: '/assets/teams/aston-martin-logo.png',
      car: '/assets/car/aston-martin-car.png',
      description: 'Luxury automotive brand bringing prestige to Formula 1.',
      status: 'Rising'
    },
    {
      name: 'Alpine F1 Team',
      country: 'France',
      founded: 2021,
      championships: 2,
      drivers: [
        { name: 'Pierre Gasly', image: 'assets/drivers/pierre-gasly.png', number: 10, position: 'Lead Driver' },
        { name: 'Franco Colapinto', image: 'assets/drivers/franco-colapinto.png', number: 43, position: 'Rookie' }
      ],
      teamColor: 'from-blue-400 via-blue-500 to-blue-600',
      accent: 'blue-400',
      logo: '/assets/teams/alpine-logo.png',
      car: '/assets/car/alpine-car.png',
      description: 'French manufacturer with Alpine racing DNA.',
      status: 'Rebuilding'
    },
    {
      name: 'Visa Cash App RB',
      country: 'Italy',
      founded: 2006,
      championships: 0,
      drivers: [
        { name: 'Isack Hadjar', image: 'assets/drivers/isack-hadjar.png', number: 6, position: 'Rookie' },
        { name: 'Liam Lawson', image: 'assets/drivers/liam-lawson.png', number: 30, position: 'Driver' }
      ],
      teamColor: 'from-indigo-500 via-indigo-600 to-indigo-700',
      accent: 'indigo-400',
      logo: '/assets/teams/vcarb-logo.png',
      car: '/assets/car/vcarb-car.png',
      description: 'Red Bull sister team, focused on driver development.',
      status: 'Development'
    },
    {
      name: 'Stake F1 Team Kick Sauber',
      country: 'Switzerland',
      founded: 1993,
      championships: 0,
      drivers: [
        { name: 'Gabriel Bortoleto', image: 'assets/drivers/gabriel-bortoleto.png', number: 5, position: 'Rookie' },
        { name: 'Nico Hülkenberg', image: 'assets/drivers/nico-hulkenberg.png', number: 27, position: 'Veteran' }
      ],
      teamColor: 'from-lime-500 via-lime-600 to-lime-700',
      accent: 'lime-400',
      logo: '/assets/teams/sauber-logo.png',
      car: '/assets/car/sauber-car.png',
      description: 'Transitioning towards Audi 2026 entry.',
      status: 'Transition'
    },
    {
      name: 'Haas F1 Team',
      country: 'United States',
      founded: 2016,
      championships: 0,
      drivers: [
        { name: 'Oliver Bearman', image: 'assets/drivers/oliver-bearman.png', number: 87, position: 'Rookie' },
        { name: 'Esteban Ocon', image: 'assets/drivers/esteban-ocon.png', number: 31, position: 'Experienced' }
      ],
      teamColor: 'from-gray-500 via-gray-600 to-gray-700',
      accent: 'gray-400',
      logo: '/assets/teams/haas-logo.png',
      car: '/assets/car/haas-car.png',
      description: 'American team focused on efficient performance.',
      status: 'Steady'
    },
    {
      name: 'Williams Racing',
      country: 'United Kingdom',
      founded: 1977,
      championships: 9,
      drivers: [
        { name: 'Alex Albon', image: 'assets/drivers/alex-albon.png', number: 23, position: 'Lead Driver' },
        { name: 'Carlos Sainz', image: 'assets/drivers/carlos-sainz.png', number: 55, position: 'Star Signing' }
      ],
      teamColor: 'from-cyan-500 via-cyan-600 to-cyan-700',
      accent: 'cyan-400',
      logo: '/assets/teams/williams-logo.png',
      car: '/assets/car/williams-car.png',
      description: 'Legendary name rebuilding its legacy.',
      status: 'Revival'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container relative mx-auto px-4 py-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
                <div className="relative rounded-full bg-gradient-to-br from-primary/20 to-accent/20 p-6 border border-primary/20">
                  <Trophy className="h-16 w-16 text-primary" />
                </div>
              </div>
            </div>
            <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-7xl bg-gradient-to-r from-primary via-foreground to-primary bg-clip-text text-transparent">
              F1 Teams & Drivers
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-muted-foreground leading-relaxed">
              Meet the constructors and the world's fastest drivers competing for glory in the 2025 Formula 1 Championship
            </p>
            
            {/* Quick Stats */}
            <div className="mt-12 flex justify-center gap-8 text-center">
              <div className="space-y-1">
                <div className="text-3xl font-bold text-primary">{teams.length}</div>
                <div className="text-sm text-muted-foreground">Teams</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-primary">{teams.length * 2}</div>
                <div className="text-sm text-muted-foreground">Drivers</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-primary">{teams.reduce((acc, team) => acc + team.championships, 0)}</div>
                <div className="text-sm text-muted-foreground">Championships</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Teams Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {teams.map((team, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="group overflow-hidden border-0 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
                {/* Team Header */}
                <div className={`relative h-32 bg-gradient-to-r ${team.teamColor} overflow-hidden`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
                  </div>
                  
                  {/* Team Logo */}
                  <div className="absolute left-8 top-1/2 -translate-y-1/2">
  <div className="relative">
    <div className="w-20 h-20 rounded-2xl bg-gray/90 backdrop-blur-sm flex items-center justify-center shadow-lg border border-white/20">
      <img 
        src={team.logo} 
        alt={`${team.name} logo`}
        className="w-16 h-16 object-contain"
      />
    </div>
  </div>
</div>

                  {/* Team Info */}
                  <div className="absolute left-32 top-1/2 -translate-y-1/2 text-white">
                    <h2 className="text-2xl font-bold mb-1">{team.name}</h2>
                    <div className="flex items-center gap-4 text-sm opacity-90">
                      <div className="flex items-center gap-1">
                        <Flag className="h-4 w-4" />
                        {team.country}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Est. {team.founded}
                      </div>
                      <div className="flex items-center gap-1">
                        <Trophy className="h-4 w-4" />
                        {team.championships} Titles
                      </div>
                    </div>
                  </div>

                  {/* Car Image */}
                  <div className="absolute right-8 top-1/2 -translate-y-1/2">
  <div className="relative">
    <div className="w-32 h-20 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
      <img
        src={team.car}
        alt={`${team.name} car`}
        className="w-full h-full object-contain"
      />
    </div>
  </div>
</div>
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                      {team.status}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-8">
                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Team Description */}
                    <div className="lg:col-span-1 space-y-4">
                      <div className="flex items-center gap-2 mb-4">
                        <Users className={`h-5 w-5 text-${team.accent}`} />
                        <span className="font-semibold">Team Overview</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {team.description}
                      </p>
                      <div className="pt-4">
                        <div className="text-sm text-muted-foreground mb-2">Championship History</div>
                        <div className="flex items-center gap-2">
                          <div className={`text-2xl font-bold text-${team.accent}`}>
                            {team.championships}
                          </div>
                          <div className="text-sm">
                            Constructor{team.championships !== 1 ? 's' : ''} Championship{team.championships !== 1 ? 's' : ''}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Drivers Section */}
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-2 mb-6">
                        <Zap className={`h-5 w-5 text-${team.accent}`} />
                        <span className="font-semibold">2025 Driver Lineup</span>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        {team.drivers.map((driver, driverIndex) => (
                          <div
                            key={driverIndex}
                            className={`group/driver relative overflow-hidden rounded-2xl bg-gradient-to-br from-${team.accent}/5 to-${team.accent}/10 border border-${team.accent}/20 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                          >
                            {/* Driver Photo & Info */}
                            <div className="flex items-start gap-4">
                              <div className="relative">
                                <Avatar className="w-20 h-20 border-3 border-background shadow-lg">
                                  <AvatarImage 
                                    src={driver.image} 
                                    alt={driver.name}
                                    className="object-cover"
                                  />
                                  <AvatarFallback className={`text-xl font-bold bg-gradient-to-br from-${team.accent}/20 to-${team.accent}/10`}>
                                    {driver.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                
                                {/* Racing Number */}
                                <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-${team.accent} text-black flex items-center justify-center text-sm font-bold shadow-lg`}>
                                  {driver.number}
                                </div>
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <h3 className="text-xl font-bold mb-1 truncate">{driver.name}</h3>
                                <div className={`text-sm font-medium text-${team.accent} mb-2`}>
                                  {driver.position}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  #{driver.number} • {team.name.split(' ')[0]}
                                </div>
                                
                                {/* Driver Stats */}
                                <div className="mt-4 flex gap-4 text-xs">
                                  <div className="text-center">
                                    <div className="font-bold text-foreground">#{driver.number}</div>
                                    <div className="text-muted-foreground">Number</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="font-bold text-foreground">2025</div>
                                    <div className="text-muted-foreground">Season</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Championship Standings Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Championship Legacy
            </h2>
            <p className="text-muted-foreground text-lg">
              All-time Constructor Championships won by each team
            </p>
          </div>
          
          <Card className="border-0 bg-gradient-to-br from-card/30 to-card/10 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {teams
                  .sort((a, b) => b.championships - a.championships)
                  .slice(0, 10)
                  .map((team, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6 + (index * 0.1) }}
                    className="text-center group cursor-pointer"
                  >
                    <div className="relative mb-4">
                      <div className={`mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${team.teamColor} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {index < 3 ? (
                          <Star className="h-10 w-10 text-white" />
                        ) : (
                          <Trophy className="h-8 w-8 text-white" />
                        )}
                      </div>
                      {index < 3 && (
                        <div className={`absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-500 text-xs font-bold text-white shadow-lg`}>
                          {index + 1}
                        </div>
                      )}
                    </div>
                    <div className="text-3xl font-bold mb-1">{team.championships}</div>
                    <div className="text-sm text-muted-foreground font-medium">
                      {team.name.length > 15 ? team.name.split(' ')[0] : team.name}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Teams;