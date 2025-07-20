import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Timer, Gamepad2, BarChart3, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Simulations = () => {
  const simulations = [
    {
      title: 'Pit Stop Simulator',
      description: 'Experience the pressure of F1 pit stops. React quickly to complete each step and measure your reaction time.',
      icon: Timer,
      color: 'bg-red-500/10 text-red-600 border-red-500/20',
      status: 'Available',
      link: '/simulations/pit-stop',
      features: ['Reaction Time Test', 'Step-by-step Process', 'Performance Rating', 'Real World Data']
    },
    {
      title: 'Race Strategy Tool',
      description: 'Plan tire strategies, simulate race stints, and see how different approaches affect race outcomes.',
      icon: BarChart3,
      color: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
      status: 'Available',
      link: '/simulations/race-strategy',
      features: ['Tire Strategy', 'Stint Simulation', 'Weather Impact', 'Position Analysis']
    },
    {
      title: 'DRS Visualizer',
      description: 'Interactive track animation showing DRS zones, activation timing, and overtaking dynamics.',
      icon: Zap,
      color: 'bg-green-500/10 text-green-600 border-green-500/20',
      status: 'Available',
      link: '/simulations/drs-visualizer',
      features: ['DRS Zones', 'Speed Analysis', 'Overtaking Simulator', 'Track Visualization']
    },
    {
      title: 'Qualifying Simulator',
      description: 'Experience the Q1, Q2, Q3 format. Set lap times and feel the pressure of knockout qualifying.',
      icon: Gamepad2,
      color: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
      status: 'Available',
      link: '/simulations/qualifying-simulator',
      features: ['3-Stage Format', 'Lap Time Challenge', 'Grid Position', 'Pressure Simulation']
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
          F1 Interactive Simulations
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Experience Formula 1 through hands-on simulations and interactive tools
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {simulations.map((simulation, index) => {
          const Icon = simulation.icon;
          const isAvailable = simulation.status === 'Available';
          
          return (
            <Card key={index} className="card-racing group overflow-hidden">
              <div className={`h-2 ${isAvailable ? 'bg-primary' : 'bg-muted'}`}></div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-xl ${simulation.color} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{simulation.title}</CardTitle>
                      <Badge 
                        variant={isAvailable ? "default" : "secondary"}
                        className="mt-2"
                      >
                        {simulation.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-base leading-relaxed">
                  {simulation.description}
                </CardDescription>
                
                <div className="space-y-2">
                  <div className="font-semibold text-sm">Features:</div>
                  <div className="grid grid-cols-2 gap-2">
                    {simulation.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  {isAvailable ? (
                    <Link to={simulation.link}>
                      <Button className="w-full btn-hero group">
                        Launch Simulation
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  ) : (
                    <Button disabled className="w-full" variant="outline">
                      Coming Soon
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Educational Info */}
      <div className="mt-16 bg-secondary rounded-xl p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-secondary-foreground mb-6 text-center">
          Why Interactive Learning?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <Timer className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Hands-On Experience</h3>
            <p className="text-sm text-muted-foreground">
              Feel the pressure and timing that F1 teams experience during races
            </p>
          </div>
          <div>
            <Gamepad2 className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Engaging Learning</h3>
            <p className="text-sm text-muted-foreground">
              Learn through interactive gameplay rather than just reading about it
            </p>
          </div>
          <div>
            <BarChart3 className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Real Data</h3>
            <p className="text-sm text-muted-foreground">
              Based on actual F1 timing data and real-world performance metrics
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulations;