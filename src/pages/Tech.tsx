import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Car, Zap, Wind, Settings, Shield, Fuel, Gauge } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Tech = () => {
  const carSystems = [
    {
      name: 'Power Unit',
      description: 'The hybrid engine system that powers F1 cars',
      icon: Zap,
      color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
      details: [
        { title: '1.6L V6 Turbo', description: 'Internal combustion engine at the heart of the power unit' },
        { title: 'MGU-K', description: 'Motor Generator Unit-Kinetic recovers energy during braking' },
        { title: 'MGU-H', description: 'Motor Generator Unit-Heat recovers energy from exhaust heat' },
        { title: 'Energy Store', description: 'Battery system that stores recovered energy' },
        { title: 'Control Electronics', description: 'Manages the complex hybrid system' }
      ]
    },
    {
      name: 'Aerodynamics',
      description: 'Elements that control airflow around the car',
      icon: Wind,
      color: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
      details: [
        { title: 'Front Wing', description: 'Generates downforce and directs airflow around the car' },
        { title: 'Floor & Diffuser', description: 'Creates ground effect suction underneath the car' },
        { title: 'Rear Wing', description: 'Provides downforce and includes DRS for overtaking' },
        { title: 'Bargeboards', description: 'Directs turbulent air away from critical aerodynamic surfaces' },
        { title: 'Cooling Inlets', description: 'Allow air to cool the power unit and brakes' }
      ]
    },
    {
      name: 'Chassis & Safety',
      description: 'Structural and protective elements',
      icon: Shield,
      color: 'bg-red-500/10 text-red-600 border-red-500/20',
      details: [
        { title: 'Monocoque', description: 'Carbon fiber survival cell that protects the driver' },
        { title: 'Halo', description: 'Titanium structure protecting the driver\'s head from impacts' },
        { title: 'Crash Structures', description: 'Designed to absorb energy in accidents' },
        { title: 'Safety Harness', description: '6-point seat belt system securing the driver' },
        { title: 'Headrest', description: 'Energy-absorbing foam surrounding the driver\'s head' }
      ]
    },
    {
      name: 'Performance Systems',
      description: 'Components that enhance car performance',
      icon: Gauge,
      color: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
      details: [
        { title: 'Braking System', description: 'Carbon fiber discs and hydraulic calipers for extreme stopping power' },
        { title: 'Suspension', description: 'Pushrod or pullrod systems with torsion bars and dampers' },
        { title: 'Tires', description: 'Pirelli compounds ranging from soft (grip) to hard (durability)' },
        { title: 'DRS', description: 'Drag Reduction System that opens the rear wing for overtaking' },
        { title: 'Steering System', description: 'Precise rack and pinion with driver adjustable settings' }
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
          Cars & Technology
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover the cutting-edge technology behind F1 cars
        </p>
      </div>

      {/* Car Anatomy Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Anatomy of an F1 Car</h2>
        
        <Tabs defaultValue="power-unit" className="max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
            {carSystems.map((system, index) => (
              <TabsTrigger key={index} value={system.name.toLowerCase().replace(' ', '-')}>
                <div className="flex items-center space-x-2">
                  <system.icon className="h-4 w-4" />
                  <span>{system.name}</span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {carSystems.map((system, index) => (
            <TabsContent key={index} value={system.name.toLowerCase().replace(' ', '-')} className="space-y-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-3 rounded-xl ${system.color}`}>
                  <system.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{system.name}</h3>
                  <p className="text-muted-foreground">{system.description}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {system.details.map((detail, detailIndex) => (
                  <Card key={detailIndex} className="card-racing">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{detail.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{detail.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* F1 Car Evolution */}
      <div className="bg-secondary rounded-xl p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-secondary-foreground mb-6 text-center">
          Did You Know?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <Car className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Over 14,000 Parts</h3>
            <p className="text-sm text-muted-foreground">
              A modern F1 car consists of more than 14,000 precision-engineered components
            </p>
          </div>
          <div>
            <Zap className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">1,000+ Horsepower</h3>
            <p className="text-sm text-muted-foreground">
              F1 power units produce over 1,000 horsepower from a small 1.6L engine
            </p>
          </div>
          <div>
            <Wind className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Extreme Downforce</h3>
            <p className="text-sm text-muted-foreground">
              At high speeds, an F1 car generates enough downforce to drive upside down
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tech;