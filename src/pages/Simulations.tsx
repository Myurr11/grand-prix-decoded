import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Timer, Gamepad2, BarChart3, Zap, ArrowRight, Play, Cpu, TrendingUp, Users, Clock, Target, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const Simulations = () => {
  const simulations = [
    {
      title: 'Pit Stop Simulator',
      description: 'Experience the intense pressure of Formula 1 pit stops. Test your reaction time, master each step of the process, and see how you compare to real F1 crews.',
      icon: Timer,
      color: 'bg-red-500/10 text-red-600 border-red-500/20',
      gradientFrom: 'from-red-500/20',
      gradientTo: 'to-red-600/5',
      status: 'Available',
      link: '/simulations/pit-stop',
      difficulty: 'Intermediate',
      duration: '5-10 min',
      features: ['Reaction Time Test', 'Step-by-step Process', 'Performance Rating', 'Real World Data'],
      stats: { users: '12K+', avgTime: '2.8s', difficulty: 8 }
    },
    {
      title: 'Race Strategy Tool',
      description: 'Become a race strategist. Plan tire strategies, simulate race stints, analyze weather impact, and discover how different approaches affect race outcomes.',
      icon: BarChart3,
      color: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
      gradientFrom: 'from-blue-500/20',
      gradientTo: 'to-blue-600/5',
      status: 'Available',
      link: '/simulations/race-strategy',
      difficulty: 'Advanced',
      duration: '15-30 min',
      features: ['Tire Strategy Planning', 'Stint Simulation', 'Weather Impact Analysis', 'Position Optimization'],
      stats: { users: '8K+', strategies: '50+', difficulty: 9 }
    },
    {
      title: 'DRS Visualizer',
      description: 'Dive into the aerodynamics of Formula 1. Explore DRS zones, understand activation timing, and visualize overtaking dynamics across different circuits.',
      icon: Zap,
      color: 'bg-green-500/10 text-green-600 border-green-500/20',
      gradientFrom: 'from-green-500/20',
      gradientTo: 'to-green-600/5',
      status: 'Available',
      link: '/simulations/drs-visualizer',
      difficulty: 'Beginner',
      duration: '10-15 min',
      features: ['Interactive DRS Zones', 'Speed Analysis', 'Overtaking Simulator', 'Circuit Visualization'],
      stats: { users: '15K+', tracks: '24', difficulty: 6 }
    },
    {
      title: 'Qualifying Simulator',
      description: 'Feel the intensity of knockout qualifying. Master the Q1, Q2, Q3 format, set competitive lap times, and experience the pressure of earning pole position.',
      icon: Gamepad2,
      color: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
      gradientFrom: 'from-purple-500/20',
      gradientTo: 'to-purple-600/5',
      status: 'Available',
      link: '/simulations/qualifying-simulator',
      difficulty: 'Intermediate',
      duration: '20-25 min',
      features: ['3-Stage Knockout Format', 'Lap Time Challenge', 'Grid Position Battle', 'Pressure Simulation'],
      stats: { users: '10K+', sessions: '100K+', difficulty: 7 }
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'Intermediate': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'Advanced': return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-accent/10 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-primary/20 rounded-full blur-xl animate-pulse delay-500" />
        
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="text-center max-w-5xl mx-auto">
            <Badge variant="outline" className="mb-6 px-4 py-2 text-sm font-medium border-primary/20 bg-primary/5">
              <Play className="h-4 w-4 mr-2" />
              Interactive F1 Experience
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                Formula 1
              </span>
              <br />
              <span className="text-foreground">Simulations</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
              Step into the fast-paced world of Formula 1 through immersive simulations. Experience pit stops, master race strategy, and feel the pressure of qualifying.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
              <div className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-xl p-6">
                <Users className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold mb-1">45K+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-xl p-6">
                <Activity className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold mb-1">4</div>
                <div className="text-sm text-muted-foreground">Interactive Simulations</div>
              </div>
              <div className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-xl p-6">
                <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold mb-1">Real-time</div>
                <div className="text-sm text-muted-foreground">Performance Data</div>
              </div>
            </div>
            
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 h-auto">
              <Play className="h-5 w-5 mr-2" />
              Start Your F1 Journey
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Simulation</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Each simulation offers a unique perspective into the world of Formula 1, from technical strategy to split-second reactions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {simulations.map((simulation, index) => {
            const Icon = simulation.icon;
            const isAvailable = simulation.status === 'Available';
            
            return (
              <Card key={index} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-background to-muted/20">
                {/* Gradient Header */}
                <div className={`h-24 bg-gradient-to-r ${simulation.gradientFrom} ${simulation.gradientTo} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className={`${getDifficultyColor(simulation.difficulty)} font-medium`}>
                      {simulation.difficulty}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader className="relative -mt-12 pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-4 rounded-2xl ${simulation.color} shadow-lg group-hover:scale-110 transition-transform duration-300 bg-background border-2`}>
                        <Icon className="h-8 w-8" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl mb-2">{simulation.title}</CardTitle>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{simulation.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Target className="h-4 w-4" />
                            <span>{simulation.difficulty}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <CardDescription className="text-base leading-relaxed">
                    {simulation.description}
                  </CardDescription>
                  
                  {/* Stats Section */}
                  <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30 rounded-xl">
                    {Object.entries(simulation.stats).map(([key, value], statIndex) => (
                      <div key={statIndex} className="text-center">
                        <div className="text-lg font-bold text-primary">{value}</div>
                        <div className="text-xs text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Features */}
                  <div className="space-y-3">
                    <div className="font-semibold text-sm flex items-center space-x-2">
                      <Cpu className="h-4 w-4 text-primary" />
                      <span>Key Features</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {simulation.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-3 text-sm text-muted-foreground bg-background/50 p-3 rounded-lg">
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-4">
                    {isAvailable ? (
                      <Link to={simulation.link}>
                        <Button className="w-full h-12 text-base bg-primary hover:bg-primary/90 text-primary-foreground group shadow-lg">
                          <Play className="mr-2 h-5 w-5" />
                          Launch Simulation
                          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    ) : (
                      <Button disabled className="w-full h-12 text-base" variant="outline">
                        <Clock className="mr-2 h-4 w-4" />
                        Coming Soon
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Educational Benefits Section */}
        <div className="mt-20 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-2xl p-8 lg:p-12 border border-primary/10">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Why Interactive F1 Learning?</h2>
            <p className="text-lg text-muted-foreground mb-12">
              Experience Formula 1 through immersive simulations that combine education with engagement, 
              offering insights that go beyond traditional learning methods.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="p-4 bg-primary/10 rounded-2xl w-fit mx-auto mb-4">
                  <Timer className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-3">Real-Time Pressure</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Experience the split-second decisions and intense pressure that define Formula 1 racing.
                </p>
              </div>
              <div className="text-center">
                <div className="p-4 bg-primary/10 rounded-2xl w-fit mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-3">Data-Driven Insights</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Learn from real F1 data and understand the analytics behind race-winning strategies.
                </p>
              </div>
              <div className="text-center">
                <div className="p-4 bg-primary/10 rounded-2xl w-fit mx-auto mb-4">
                  <Gamepad2 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-3">Interactive Learning</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Engage with F1 concepts through hands-on simulations rather than passive observation.
                </p>
              </div>
              <div className="text-center">
                <div className="p-4 bg-primary/10 rounded-2xl w-fit mx-auto mb-4">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-3">Skill Development</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Develop reaction times, strategic thinking, and decision-making skills used in motorsport.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulations;