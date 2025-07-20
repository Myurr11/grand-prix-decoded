import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Flag, AlertTriangle, BookOpen, Scale, Clock, Car, Zap } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Rules = () => {
  // Flag definitions
  const flags = [
    {
      name: 'Red Flag',
      color: 'bg-red-600',
      icon: Flag,
      description: 'Session suspended. All cars must return to pit lane immediately.',
      usage: 'Used when track conditions are unsafe to continue racing or in case of a serious incident.'
    },
    {
      name: 'Yellow Flag',
      color: 'bg-yellow-500',
      icon: Flag,
      description: 'Danger on track. Reduce speed, no overtaking.',
      usage: 'Displayed when there is an incident or hazard on or near the track.'
    },
    {
      name: 'Double Yellow Flags',
      color: 'bg-yellow-500',
      icon: Flag,
      description: 'Serious hazard. Be prepared to stop. No overtaking.',
      usage: 'Shown when there is a major incident or when marshals are working on or near the track.'
    },
    {
      name: 'Green Flag',
      color: 'bg-green-600',
      icon: Flag,
      description: 'Track clear. Racing conditions resume.',
      usage: 'Displayed after a yellow flag section to indicate normal racing can resume.'
    },
    {
      name: 'Blue Flag',
      color: 'bg-blue-600',
      icon: Flag,
      description: 'Faster car approaching to lap you. Let them pass.',
      usage: 'Shown to a driver who is about to be lapped and must allow the faster car to pass at the first opportunity.'
    },
    {
      name: 'Black & White Flag',
      color: 'bg-gray-900',
      icon: Flag,
      description: 'Warning for unsportsmanlike behavior.',
      usage: 'Final warning before penalties are applied for driving infractions.'
    },
    {
      name: 'Black Flag',
      color: 'bg-black',
      icon: Flag,
      description: 'Driver disqualified. Return to pits immediately.',
      usage: 'Shown when a driver has been disqualified from the race for a serious rule violation.'
    },
    {
      name: 'Checkered Flag',
      color: 'bg-gray-800',
      icon: Flag,
      description: 'End of session or race.',
      usage: 'Waved to signal the completion of a practice session, qualifying, or race.'
    }
  ];

  // Penalty definitions
  const penalties = [
    {
      name: 'Time Penalty',
      icon: Clock,
      color: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
      description: 'Added time to a driver\'s race result',
      examples: [
        { penalty: '5-Second Penalty', description: 'For minor infractions like exceeding track limits or causing a small collision' },
        { penalty: '10-Second Penalty', description: 'For more serious infractions like causing a collision with significant impact' }
      ]
    },
    {
      name: 'Grid Penalty',
      icon: Car,
      color: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
      description: 'Starting positions moved back on the grid',
      examples: [
        { penalty: 'Engine/Gearbox Change', description: 'Exceeding the season allocation of power unit components' },
        { penalty: 'Impeding Qualification', description: 'Blocking another driver during qualifying' }
      ]
    },
    {
      name: 'Drive-Through Penalty',
      icon: Zap,
      color: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
      description: 'Driver must pass through the pit lane without stopping',
      examples: [
        { penalty: 'False Start', description: 'Moving before the lights go out at race start' },
        { penalty: 'Pit Lane Speeding', description: 'Exceeding the pit lane speed limit' }
      ]
    },
    {
      name: 'Disqualification',
      icon: AlertTriangle,
      color: 'bg-red-500/10 text-red-600 border-red-500/20',
      description: 'Exclusion from race results',
      examples: [
        { penalty: 'Technical Infringement', description: 'Car fails to meet technical regulations' },
        { penalty: 'Dangerous Driving', description: 'Extremely dangerous behavior on track' }
      ]
    }
  ];

  // Racing regulations
  const regulations = [
    {
      title: 'Track Limits',
      description: 'Drivers must keep all four wheels within the white lines defining the track. Repeatedly exceeding track limits can result in penalties.'
    },
    {
      title: 'Blue Flag Rules',
      description: 'When shown a blue flag, a driver being lapped must allow the faster car to pass at the earliest safe opportunity, typically within 3 corners.'
    },
    {
      title: 'Safety Car Procedures',
      description: 'During a safety car period, drivers must maintain position and not overtake. They must also maintain a maximum of 10 car lengths from the car in front.'
    },
    {
      title: 'Formation Lap',
      description: 'Drivers must maintain their grid position during the formation lap and are not allowed to perform practice starts.'
    },
    {
      title: 'Parc Fermé',
      description: 'After qualifying, cars enter parc fermé conditions where teams cannot make significant changes to the car setup before the race.'
    },
    {
      title: 'DRS Usage',
      description: 'Drag Reduction System can only be used in designated DRS zones and when a driver is within 1 second of the car ahead at the detection point.'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
          Rules & Penalties
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Understanding F1 regulations and race procedures
        </p>
      </div>

      <Tabs defaultValue="flags" className="max-w-4xl mx-auto">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="flags">
            <div className="flex items-center space-x-2">
              <Flag className="h-4 w-4" />
              <span>Flags</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="penalties">
            <div className="flex items-center space-x-2">
              <Scale className="h-4 w-4" />
              <span>Penalties</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="regulations">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span>Regulations</span>
            </div>
          </TabsTrigger>
        </TabsList>

        {/* Flags Tab */}
        <TabsContent value="flags" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {flags.map((flag, index) => (
              <Card key={index} className="card-racing overflow-hidden">
                <div className={`h-2 ${flag.color}`}></div>
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${flag.color} text-white`}>
                      <flag.icon className="h-5 w-5" />
                    </div>
                    <CardTitle>{flag.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="font-medium">{flag.description}</p>
                  <p className="text-sm text-muted-foreground">{flag.usage}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Penalties Tab */}
        <TabsContent value="penalties" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {penalties.map((penalty, index) => (
              <Card key={index} className="card-racing">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-xl ${penalty.color}`}>
                      <penalty.icon className="h-5 w-5" />
                    </div>
                    <CardTitle>{penalty.name}</CardTitle>
                  </div>
                  <CardDescription className="mt-2">
                    {penalty.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {penalty.examples.map((example, exampleIndex) => (
                      <div key={exampleIndex} className="bg-muted/30 p-4 rounded-lg">
                        <h4 className="font-semibold mb-1">{example.penalty}</h4>
                        <p className="text-sm text-muted-foreground">{example.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Regulations Tab */}
        <TabsContent value="regulations" className="space-y-6">
          <Card className="card-racing">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <BookOpen className="h-5 w-5" />
                </div>
                <CardTitle>Key Racing Regulations</CardTitle>
              </div>
              <CardDescription className="mt-2">
                Essential rules that govern Formula 1 racing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {regulations.map((regulation, index) => (
                  <div key={index} className="border-b border-border pb-4 last:border-0 last:pb-0">
                    <h4 className="font-semibold mb-1">{regulation.title}</h4>
                    <p className="text-sm text-muted-foreground">{regulation.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Educational Info */}
      <div className="mt-16 bg-secondary rounded-xl p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-secondary-foreground mb-6 text-center">
          Did You Know?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <Flag className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Flag History</h3>
            <p className="text-sm text-muted-foreground">
              F1's flag system dates back to early motorsport when it was the only reliable way to communicate with drivers.
            </p>
          </div>
          <div>
            <AlertTriangle className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Penalty Points</h3>
            <p className="text-sm text-muted-foreground">
              Drivers accumulate penalty points on their license. Reaching 12 points within 12 months results in a race ban.
            </p>
          </div>
          <div>
            <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Rule Evolution</h3>
            <p className="text-sm text-muted-foreground">
              F1 regulations are constantly evolving, with major rule changes often implemented to improve safety and racing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rules;