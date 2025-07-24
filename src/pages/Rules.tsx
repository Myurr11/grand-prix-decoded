import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Flag, AlertTriangle, BookOpen, Scale, Clock, Car, Zap, Download, FileText, Eye, RotateCcw, Triangle, X, Minus, CircleDot, Users, Fuel, Timer, Target } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Rules = () => {
  // Complete F1 Flag definitions
  const flags = [
    {
      name: 'Red Flag',
      color: 'bg-red-600',
      icon: Flag,
      description: 'Session suspended. All cars must return to pit lane immediately.',
      usage: 'Used when track conditions are unsafe to continue racing or in case of a serious incident.',
      category: 'Emergency'
    },
    {
      name: 'Yellow Flag',
      color: 'bg-yellow-500',
      icon: Flag,
      description: 'Danger on track. Reduce speed, no overtaking.',
      usage: 'Displayed when there is an incident or hazard on or near the track.',
      category: 'Caution'
    },
    {
      name: 'Double Yellow Flags',
      color: 'bg-yellow-500',
      icon: Flag,
      description: 'Serious hazard. Be prepared to stop. No overtaking.',
      usage: 'Shown when there is a major incident or when marshals are working on or near the track.',
      category: 'Caution'
    },
    {
      name: 'Green Flag',
      color: 'bg-green-600',
      icon: Flag,
      description: 'Track clear. Racing conditions resume.',
      usage: 'Displayed after a yellow flag section to indicate normal racing can resume.',
      category: 'All Clear'
    },
    {
      name: 'Blue Flag',
      color: 'bg-blue-600',
      icon: Flag,
      description: 'Faster car approaching to lap you. Let them pass.',
      usage: 'Shown to a driver who is about to be lapped and must allow the faster car to pass at the first opportunity.',
      category: 'Information'
    },
    {
      name: 'White Flag',
      color: 'bg-gray-300 text-gray-800',
      icon: Flag,
      description: 'Slow-moving vehicle on track.',
      usage: 'Indicates there is an ambulance, recovery vehicle, or official car on the racing circuit.',
      category: 'Information'
    },
    {
      name: 'Black & White Flag',
      color: 'bg-gray-900',
      icon: Flag,
      description: 'Warning for unsportsmanlike behavior.',
      usage: 'Final warning before penalties are applied for driving infractions.',
      category: 'Warning'
    },
    {
      name: 'Black Flag',
      color: 'bg-black',
      icon: Flag,
      description: 'Driver disqualified. Return to pits immediately.',
      usage: 'Shown when a driver has been disqualified from the race for a serious rule violation.',
      category: 'Disqualification'
    },
    {
      name: 'Black Flag with Orange Circle',
      color: 'bg-black',
      icon: CircleDot,
      description: 'Mechanical problem suspected. Return to pits for inspection.',
      usage: 'Displayed when officials suspect a car has a mechanical issue that could be dangerous.',
      category: 'Technical'
    },
    {
      name: 'Chequered Flag',
      color: 'bg-gray-800',
      icon: Flag,
      description: 'End of session or race.',
      usage: 'Waved to signal the completion of a practice session, qualifying, or race.',
      category: 'Finish'
    }
  ];

  // Complete F1 Penalty definitions
  const penalties = [
    {
      name: 'Time Penalties',
      icon: Clock,
      color: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
      description: 'Added time to a driver\'s race result or served during pit stops',
      examples: [
        { penalty: '5-Second Penalty', description: 'Track limits violations, minor collisions, unsafe releases' },
        { penalty: '10-Second Penalty', description: 'Causing collisions, forcing another driver off track' },
        { penalty: '20-Second Penalty', description: 'Serious driving infractions or multiple offenses' },
        { penalty: '30-Second Penalty', description: 'Severe breaches of sporting regulations' }
      ]
    },
    {
      name: 'Stop & Go Penalties',
      icon: Target,
      color: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
      description: 'Driver must enter pit lane, stop for specified time, then continue',
      examples: [
        { penalty: '5-Second Stop & Go', description: 'Pit lane speeding or unsafe pit releases' },
        { penalty: '10-Second Stop & Go', description: 'False starts or causing avoidable collisions' }
      ]
    },
    {
      name: 'Drive-Through Penalty',
      icon: Zap,
      color: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
      description: 'Driver must pass through the pit lane without stopping',
      examples: [
        { penalty: 'False Start', description: 'Moving before the lights go out at race start' },
        { penalty: 'Pit Lane Speeding', description: 'Exceeding the pit lane speed limit' },
        { penalty: 'Jump Start', description: 'Leaving grid position before formation lap' }
      ]
    },
    {
      name: 'Grid Penalties',
      icon: Car,
      color: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20',
      description: 'Starting positions moved back on the grid',
      examples: [
        { penalty: '3-Place Grid Penalty', description: 'Impeding during qualifying sessions' },
        { penalty: '5-Place Grid Penalty', description: 'Unscheduled gearbox changes' },
        { penalty: '10-Place Grid Penalty', description: 'Engine component changes beyond allocation' },
        { penalty: 'Back of Grid', description: 'Multiple power unit component changes' }
      ]
    },
    {
      name: 'Championship Point Deductions',
      icon: Minus,
      color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
      description: 'Points removed from driver or constructor standings',
      examples: [
        { penalty: 'Driver Points Deduction', description: 'Serious breaches of sporting conduct' },
        { penalty: 'Constructor Points Deduction', description: 'Technical regulation violations' }
      ]
    },
    {
      name: 'Race Bans & Suspensions',
      icon: X,
      color: 'bg-red-500/10 text-red-600 border-red-500/20',
      description: 'Exclusion from racing events',
      examples: [
        { penalty: 'Race Ban', description: 'Accumulating 12 penalty points in 12 months' },
        { penalty: 'Season Suspension', description: 'Extremely serious misconduct or safety violations' }
      ]
    },
    {
      name: 'Disqualification',
      icon: AlertTriangle,
      color: 'bg-red-500/10 text-red-600 border-red-500/20',
      description: 'Exclusion from session or race results',
      examples: [
        { penalty: 'Session Disqualification', description: 'Technical infringements or dangerous driving' },
        { penalty: 'Race Disqualification', description: 'Car fails post-race scrutineering' },
        { penalty: 'Championship Exclusion', description: 'Systematic rule violations' }
      ]
    },
    {
      name: 'Financial Penalties',
      icon: FileText,
      color: 'bg-green-500/10 text-green-600 border-green-500/20',
      description: 'Monetary fines imposed on drivers or teams',
      examples: [
        { penalty: 'Driver Fine', description: 'Minor protocol violations or unsportsmanlike conduct' },
        { penalty: 'Team Fine', description: 'Administrative breaches or equipment violations' }
      ]
    }
  ];

  // Comprehensive F1 Racing Regulations
  const sportingRegulations = [
    {
      title: 'Track Limits & Racing Surface',
      description: 'Drivers must keep all four wheels within the white lines. Track limits violations result in warnings, then time penalties.',
      details: 'Consistently exceeding track limits at the same corner can lead to time penalties or lap time deletions.'
    },
    {
      title: 'Overtaking & Racing Conduct',
      description: 'Drivers must leave racing room when alongside another car. Forcing a driver off track is prohibited.',
      details: 'The driver on the outside must be left at least one car width of space if they are significantly alongside.'
    },
    {
      title: 'Blue Flag Procedures',
      description: 'Lapped drivers must allow faster cars to pass within 3 marshal posts after being shown the blue flag.',
      details: 'Failure to comply can result in time penalties. The blue flag system uses electronic detection.'
    },
    {
      title: 'Safety Car & Virtual Safety Car',
      description: 'During SC periods, no overtaking allowed. Under VSC, drivers must maintain minimum sector times.',
      details: 'Cars must maintain specific distances and cannot gain advantage during safety car periods.'
    },
    {
      title: 'DRS (Drag Reduction System)',
      description: 'Can only be used in designated zones when within 1 second of car ahead at detection point.',
      details: 'DRS is disabled during yellow flag conditions and first two laps after race start or restart.'
    },
    {
      title: 'Formation Lap & Race Start',
      description: 'Drivers must maintain grid position during formation lap. No practice starts allowed.',
      details: 'Jump starts or gaining positions during formation lap result in penalties.'
    }
  ];

  const technicalRegulations = [
    {
      title: 'Car Dimensions & Weight',
      description: 'Minimum weight 798kg including driver. Strict dimensional requirements for aerodynamics.',
      details: 'Cars are measured and weighed before and after each session to ensure compliance.'
    },
    {
      title: 'Power Unit Regulations',
      description: 'Hybrid power units with strict component allocation limits per season.',
      details: 'Exceeding allocation results in grid penalties. Fuel flow limited to 100kg/h maximum.'
    },
    {
      title: 'Aerodynamic Regulations',
      description: 'Specific rules governing front wing, rear wing, floor, and bodywork design.',
      details: 'All aerodynamic components must pass rigorous scrutineering and deflection tests.'
    },
    {
      title: 'Tire Regulations',
      description: 'Mandatory tire allocation for practice, qualifying, and race with specific compound requirements.',
      details: 'Q2 tire rule requires top 10 qualifiers to start race on their Q2 qualifying tire.'
    },
    {
      title: 'Parc Fermé Conditions',
      description: 'After qualifying, car setup cannot be changed except for specific allowed adjustments.',
      details: 'Limited to front wing angle, tire pressure, and specific safety-related modifications.'
    },
    {
      title: 'Fuel & Refueling',
      description: 'No refueling during race. Maximum 110kg of fuel allowed for race start.',
      details: 'Fuel samples are taken for analysis to ensure compliance with technical regulations.'
    }
  ];

  const procedureRegulations = [
    {
      title: 'Qualifying Format',
      description: 'Three knockout sessions (Q1, Q2, Q3) with specific time allocations and elimination rules.',
      details: 'Q1: 18 minutes, eliminate slowest 5. Q2: 15 minutes, eliminate next 5. Q3: 12 minutes, top 10 fight for pole.'
    },
    {
      title: 'Pit Lane Procedures',
      description: 'Speed limits enforced electronically. Specific rules for pit entry, stops, and exit.',
      details: 'Pit lane speed limit varies by circuit (60-80 km/h). Unsafe releases result in penalties.'
    },
    {
      title: 'Scrutineering Process',
      description: 'Mandatory technical inspections before and after sessions to ensure regulatory compliance.',
      details: 'Random cars selected for detailed scrutineering including weight, dimensions, and component checks.'
    },
    {
      title: 'Driver Equipment',
      description: 'Strict safety requirements for helmets, HANS device, racing suits, and other protective gear.',
      details: 'All equipment must meet FIA safety standards and be approved before use in competition.'
    },
    {
      title: 'Communication Rules',
      description: 'Limited radio communication allowed between team and driver during race conditions.',
      details: 'Certain information prohibited to maintain driver skill importance and prevent excessive assistance.'
    },
    {
      title: 'Medical & Safety Procedures',
      description: 'Comprehensive medical facilities and extraction procedures required at all circuits.',
      details: 'Medical helicopter and extraction team must be operational for all sessions to proceed.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6 px-4 py-2 text-sm font-medium border-primary/20 bg-primary/5">
              <BookOpen className="h-4 w-4 mr-2" />
              Official F1 Regulations
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                Formula 1
              </span>
              <br />
              <span className="text-foreground">Rules & Regulations</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Complete guide to Formula 1 flags, penalties, sporting regulations, and technical rules governing the pinnacle of motorsport.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 h-auto">
                <Download className="h-5 w-5 mr-2 group-hover:translate-y-0.5 transition-transform" />
                Download Official FIA Rulebook 2024
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-3 h-auto">
                <Eye className="h-5 w-5 mr-2" />
                View Quick Reference
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">

        <Tabs defaultValue="flags" className="max-w-7xl mx-auto">
          <TabsList className="grid grid-cols-4 mb-12 bg-muted/50">
            <TabsTrigger value="flags" className="flex items-center space-x-2 data-[state=active]:bg-background">
              <Flag className="h-4 w-4" />
              <span className="hidden sm:inline">Race Flags</span>
              <span className="sm:hidden">Flags</span>
            </TabsTrigger>
            <TabsTrigger value="penalties" className="flex items-center space-x-2 data-[state=active]:bg-background">
              <Scale className="h-4 w-4" />
              <span className="hidden sm:inline">Penalties</span>
              <span className="sm:hidden">Penalties</span>
            </TabsTrigger>
            <TabsTrigger value="sporting" className="flex items-center space-x-2 data-[state=active]:bg-background">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Sporting Rules</span>
              <span className="sm:hidden">Sporting</span>
            </TabsTrigger>
            <TabsTrigger value="technical" className="flex items-center space-x-2 data-[state=active]:bg-background">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Technical Rules</span>
              <span className="sm:hidden">Technical</span>
            </TabsTrigger>
          </TabsList>

          {/* Flags Tab */}
          <TabsContent value="flags" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Formula 1 Race Flags</h2>
              <p className="text-muted-foreground">Official flag signals used to communicate with drivers during sessions</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {flags.map((flag, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden border-l-4 border-l-primary">
                  <div className={`h-3 ${flag.color} transition-all duration-300`}></div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-xl ${flag.color} text-white shadow-lg`}>
                          <flag.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{flag.name}</CardTitle>
                          <Badge variant="secondary" className="text-xs mt-1">{flag.category}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="font-medium text-sm">{flag.description}</p>
                    <div className="bg-muted/30 p-3 rounded-lg">
                      <p className="text-xs text-muted-foreground">{flag.usage}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Penalties Tab */}
          <TabsContent value="penalties" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">F1 Penalties & Sanctions</h2>
              <p className="text-muted-foreground">Complete overview of disciplinary measures in Formula 1</p>
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {penalties.map((penalty, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="pb-4">
                    <div className="flex items-start space-x-4">
                      <div className={`p-4 rounded-xl ${penalty.color} shadow-sm`}>
                        <penalty.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{penalty.name}</CardTitle>
                        <CardDescription className="text-base">
                          {penalty.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {penalty.examples.map((example, exampleIndex) => (
                        <div key={exampleIndex} className="bg-muted/40 p-4 rounded-lg border border-border/50">
                          <h4 className="font-semibold text-sm mb-2 text-primary">{example.penalty}</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{example.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Sporting Regulations Tab */}
          <TabsContent value="sporting" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Sporting Regulations</h2>
              <p className="text-muted-foreground">Racing conduct, procedures, and competition rules</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {sportingRegulations.map((regulation, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-primary">{regulation.title}</CardTitle>
                    <CardDescription className="text-base">{regulation.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">{regulation.details}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
              {procedureRegulations.map((regulation, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-primary">{regulation.title}</CardTitle>
                    <CardDescription className="text-base">{regulation.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">{regulation.details}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Technical Regulations Tab */}
          <TabsContent value="technical" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Technical Regulations</h2>
              <p className="text-muted-foreground">Car specifications, safety requirements, and technical compliance</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {technicalRegulations.map((regulation, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-primary">{regulation.title}</CardTitle>
                    <CardDescription className="text-base">{regulation.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">{regulation.details}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* FIA Rulebook Download Section */}
        <div className="mt-20 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-2xl p-8 lg:p-12 border border-primary/10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary/10 rounded-2xl">
                <FileText className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-4">Official FIA Rulebook 2024</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Download the complete Formula 1 Sporting and Technical Regulations directly from the FIA. 
              This comprehensive document contains all official rules governing the championship.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background/50 p-6 rounded-xl border">
                <BookOpen className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Sporting Regulations</h3>
                <p className="text-sm text-muted-foreground">Competition procedures, penalties, and race conduct</p>
              </div>
              <div className="bg-background/50 p-6 rounded-xl border">
                <Car className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Technical Regulations</h3>
                <p className="text-sm text-muted-foreground">Car specifications, safety requirements, and technical compliance</p>
              </div>
              <div className="bg-background/50 p-6 rounded-xl border">
                <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Safety Standards</h3>
                <p className="text-sm text-muted-foreground">Driver equipment, circuit safety, and emergency procedures</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 h-auto">
                <Download className="h-5 w-5 mr-2" />
                Download 2024 Sporting Regulations (PDF)
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-3 h-auto">
                <Download className="h-5 w-5 mr-2" />
                Download 2024 Technical Regulations (PDF)
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mt-6">
              Documents are updated regularly. Last update: Formula 1 Technical Regulations v1.3 (2024)
            </p>
          </div>
        </div>

        {/* Educational Insights */}
        <div className="mt-20 bg-muted/30 rounded-2xl p-8 lg:p-12">
          <h2 className="text-3xl font-bold text-center mb-12">Formula 1 Regulations Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="p-4 bg-primary/10 rounded-2xl w-fit mx-auto mb-4">
                <Flag className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-3">Flag Communication</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The flag system has evolved from simple fabric signals to electronic displays and LED marshal boards for instant communication.
              </p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-primary/10 rounded-2xl w-fit mx-auto mb-4">
                <Scale className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-3">Penalty Evolution</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Modern F1 uses sophisticated timing systems and multiple camera angles to ensure fair and accurate penalty decisions.
              </p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-primary/10 rounded-2xl w-fit mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-3">Safety First</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                F1 safety regulations are continuously updated based on research, incidents, and technological advances in motorsport safety.
              </p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-primary/10 rounded-2xl w-fit mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-3">Living Document</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The FIA regulations are updated multiple times per season to address new technologies and improve competition fairness.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rules;