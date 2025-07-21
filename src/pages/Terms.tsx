import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Zap, Wind, Trophy, Timer, Flag, Car, Settings, Users, Target, AlertTriangle, Radio, Fuel, Gauge, MapPin, Clock, Shield, ChevronRight } from 'lucide-react';

const Terms = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const terms = [
    // Basic Racing Terms
    {
      term: 'Pole Position',
      definition: 'The first starting position on the grid, earned by setting the fastest qualifying time in Q3',
      category: 'Racing Basics',
      icon: Flag
    },
    {
      term: 'Grid',
      definition: 'The starting formation for a race, arranged by qualifying times with fastest on pole position',
      category: 'Racing Basics',
      icon: Target
    },
    {
      term: 'Formation Lap',
      definition: 'A slow lap before the race start where drivers warm up their tires and brakes',
      category: 'Racing Basics',
      icon: Flag
    },
    {
      term: 'DNF',
      definition: 'Did Not Finish - When a driver fails to complete the race due to mechanical failure or crash',
      category: 'Racing Basics',
      icon: AlertTriangle
    },
    {
      term: 'DNS',
      definition: 'Did Not Start - When a driver is unable to take part in the race',
      category: 'Racing Basics',
      icon: AlertTriangle
    },

    // Strategy & Pit Stops
    {
      term: 'Undercut',
      definition: 'Pit stop strategy where a driver stops earlier than rivals to gain track position with fresher tires',
      category: 'Strategy',
      icon: Timer
    },
    {
      term: 'Overcut',
      definition: 'Strategy of staying out longer than rivals to gain track position when they pit',
      category: 'Strategy',
      icon: Clock
    },
    {
      term: 'Box Box',
      definition: 'Radio call instructing driver to enter the pit lane for a pit stop',
      category: 'Strategy',
      icon: Radio
    },
    {
      term: 'Pit Window',
      definition: 'The optimal time period during a race to make a pit stop for maximum strategic advantage',
      category: 'Strategy',
      icon: Timer
    },
    {
      term: 'Tyre Degradation',
      definition: 'The gradual loss of tire performance over time due to wear and temperature',
      category: 'Strategy',
      icon: Gauge
    },

    // Technology & Car Components
    {
      term: 'DRS',
      definition: 'Drag Reduction System - Moveable rear wing element that reduces drag on straights to aid overtaking',
      category: 'Technology',
      icon: Wind
    },
    {
      term: 'ERS',
      definition: 'Energy Recovery System - Hybrid technology that recovers and deploys energy for extra 160hp',
      category: 'Technology',
      icon: Zap
    },
    {
      term: 'MGU-K',
      definition: 'Motor Generator Unit-Kinetic - Recovers energy from braking and deploys it for acceleration',
      category: 'Technology',
      icon: Zap
    },
    {
      term: 'MGU-H',
      definition: 'Motor Generator Unit-Heat - Recovers energy from exhaust gases via the turbocharger',
      category: 'Technology',
      icon: Fuel
    },
    {
      term: 'Telemetry',
      definition: 'Real-time data transmission from the car to the pit wall about performance and systems',
      category: 'Technology',
      icon: Radio
    },

    // Aerodynamics
    {
      term: 'Dirty Air',
      definition: 'Turbulent air behind another car that reduces aerodynamic efficiency and downforce',
      category: 'Aerodynamics',
      icon: Wind
    },
    {
      term: 'Slipstream',
      definition: 'The area of reduced air pressure behind a car that allows following cars to go faster',
      category: 'Aerodynamics',
      icon: Wind
    },
    {
      term: 'Downforce',
      definition: 'Aerodynamic force that pushes the car down onto the track for better grip and cornering',
      category: 'Aerodynamics',
      icon: Target
    },
    {
      term: 'Ground Effect',
      definition: 'Aerodynamic phenomenon where air under the car creates a low-pressure area generating downforce',
      category: 'Aerodynamics',
      icon: Wind
    },
    {
      term: 'Porpoising',
      definition: 'Bouncing motion of the car caused by ground effect aerodynamics at high speeds',
      category: 'Aerodynamics',
      icon: Wind
    },

    // Rules & Regulations
    {
      term: 'Parc Fermé',
      definition: 'Restricted area where cars are held and cannot be modified between qualifying and race',
      category: 'Rules',
      icon: Shield
    },
    {
      term: 'Track Limits',
      definition: 'The defined boundaries of the racing circuit that drivers must stay within',
      category: 'Rules',
      icon: MapPin
    },
    {
      term: 'Blue Flag',
      definition: 'Flag shown to backmarkers to let faster cars through when being lapped',
      category: 'Rules',
      icon: Flag
    },
    {
      term: 'Yellow Flag',
      definition: 'Caution flag indicating danger ahead - no overtaking allowed in that sector',
      category: 'Rules',
      icon: Flag
    },
    {
      term: 'Red Flag',
      definition: 'Flag that stops the session immediately due to dangerous conditions or serious incident',
      category: 'Rules',
      icon: Flag
    },

    // Safety
    {
      term: 'Safety Car',
      definition: 'Official car deployed to neutralize the race during dangerous conditions while keeping cars running',
      category: 'Safety',
      icon: Car
    },
    {
      term: 'Virtual Safety Car',
      definition: 'Electronic system that controls car speeds during caution periods without a physical safety car',
      category: 'Safety',
      icon: Gauge
    },
    {
      term: 'Halo',
      definition: 'Titanium head protection device that sits above the cockpit to protect drivers from debris',
      category: 'Safety',
      icon: Shield
    },
    {
      term: 'Marshals',
      definition: 'Track officials responsible for safety, recovery of broken-down cars, and flag signals',
      category: 'Safety',
      icon: Users
    },

    // Communication & Terms
    {
      term: 'Radio Check',
      definition: 'Communication test between driver and pit crew to ensure clear radio contact',
      category: 'Communication',
      icon: Radio
    },
    {
      term: 'Copy',
      definition: 'Radio confirmation that a message has been received and understood',
      category: 'Communication',
      icon: Radio
    },
    {
      term: 'Gap',
      definition: 'The time difference between two cars, usually measured in seconds',
      category: 'Communication',
      icon: Timer
    },
    {
      term: 'Purple Sector',
      definition: 'The fastest sector time during a session, displayed in purple on timing screens',
      category: 'Communication',
      icon: Trophy
    },

    // Track & Racing Terms
    {
      term: 'Chicane',
      definition: 'A tight sequence of corners in alternate directions designed to slow cars down',
      category: 'Track Terms',
      icon: MapPin
    },
    {
      term: 'Hairpin',
      definition: 'A very tight, slow corner that turns back on itself, usually 180 degrees',
      category: 'Track Terms',
      icon: MapPin
    },
    {
      term: 'Apex',
      definition: 'The geometric center or ideal turning point of a corner for the fastest racing line',
      category: 'Track Terms',
      icon: Target
    },
    {
      term: 'Racing Line',
      definition: 'The fastest route around a circuit, maximizing speed through corners and straights',
      category: 'Track Terms',
      icon: MapPin
    },
    {
      term: 'Kerbs',
      definition: 'Raised strips at corner edges that drivers can use to maximize the racing line',
      category: 'Track Terms',
      icon: MapPin
    }
  ];

  const categories = [...new Set(terms.map(term => term.category))];

  const filteredTerms = terms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      'Racing Basics': 'bg-gradient-to-r from-red-500/10 to-red-600/10 text-red-600 border-red-500/30',
      'Strategy': 'bg-gradient-to-r from-green-500/10 to-green-600/10 text-green-600 border-green-500/30',
      'Technology': 'bg-gradient-to-r from-blue-500/10 to-blue-600/10 text-blue-600 border-blue-500/30',
      'Aerodynamics': 'bg-gradient-to-r from-purple-500/10 to-purple-600/10 text-purple-600 border-purple-500/30',
      'Rules': 'bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 text-yellow-600 border-yellow-500/30',
      'Safety': 'bg-gradient-to-r from-orange-500/10 to-orange-600/10 text-orange-600 border-orange-500/30',
      'Communication': 'bg-gradient-to-r from-cyan-500/10 to-cyan-600/10 text-cyan-600 border-cyan-500/30',
      'Track Terms': 'bg-gradient-to-r from-indigo-500/10 to-indigo-600/10 text-indigo-600 border-indigo-500/30'
    };
    return colors[category as keyof typeof colors] || 'bg-gradient-to-r from-gray-500/10 to-gray-600/10 text-gray-600 border-gray-500/30';
  };

  const getCategoryStats = () => {
    const stats = categories.map(category => ({
      name: category,
      count: terms.filter(term => term.category === category).length
    }));
    return stats;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-background border-b">
        <div className="absolute inset-0 checkered-bg opacity-5"></div>
        <div className="container mx-auto px-4 py-16 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Target className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Master F1 Language</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text leading-tight">
              F1 Dictionary
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Decode Formula 1's essential terminology. From basic racing concepts to advanced technical jargon - your complete guide to speaking F1.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {getCategoryStats().slice(0, 4).map((stat, index) => (
                <div key={stat.name} className="p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50">
                  <div className="text-2xl font-bold text-primary mb-1">{stat.count}</div>
                  <div className="text-sm text-muted-foreground">{stat.name}</div>
                </div>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search terms (e.g., DRS, undercut, pole position...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg bg-background/80 backdrop-blur-sm border-border/50 focus:border-primary/50 rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          {/* Category Tabs */}
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 w-full max-w-6xl h-auto p-1 bg-muted/50">
              <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-3 py-2 text-xs">
                All ({terms.length})
              </TabsTrigger>
              {categories.map((category) => {
                const count = terms.filter(term => term.category === category).length;
                return (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-3 py-2 text-xs"
                  >
                    {category.replace('Racing Basics', 'Basics').replace('Track Terms', 'Track')} ({count})
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          {/* Terms Content */}
          <TabsContent value={selectedCategory} className="mt-8">
            {/* Results Summary */}
            <div className="text-center mb-6">
              <p className="text-muted-foreground">
                {selectedCategory === 'all' 
                  ? `Showing ${filteredTerms.length} of ${terms.length} terms`
                  : `${filteredTerms.length} terms in ${selectedCategory}`
                }
                {searchTerm && ` matching "${searchTerm}"`}
              </p>
            </div>

            {/* Terms Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTerms.map((termData, index) => {
                const Icon = termData.icon;
                return (
                  <Card key={index} className="card-racing group hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl font-bold text-primary mb-2 group-hover:text-primary/90 transition-colors">
                            {termData.term}
                          </CardTitle>
                          <Badge className={`${getCategoryColor(termData.category)} text-xs`}>
                            {termData.category}
                          </Badge>
                        </div>
                        <div className="p-3 bg-primary/5 rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 ml-3">
                          <Icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {termData.definition}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* No Results */}
            {filteredTerms.length === 0 && (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-muted/50 rounded-full mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No terms found</h3>
                <p className="text-muted-foreground mb-4">
                  No terms found matching "{searchTerm}"
                  {selectedCategory !== 'all' && ` in ${selectedCategory}`}
                </p>
                <div className="flex gap-2 justify-center">
                  {searchTerm && (
                    <button 
                      onClick={() => setSearchTerm('')}
                      className="btn-track px-4 py-2 text-sm"
                    >
                      Clear search
                    </button>
                  )}
                  {selectedCategory !== 'all' && (
                    <button 
                      onClick={() => setSelectedCategory('all')}
                      className="btn-hero px-4 py-2 text-sm"
                    >
                      View all categories
                    </button>
                  )}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Terms;