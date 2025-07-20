import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Clock, Trophy, Flag, Users, Calendar, Settings, Shield, Gauge, Disc3, ScrollText, Award, Zap,
  MapPin, Car, Wind, Fuel, Timer, Target, CheckCircle, AlertTriangle, TrendingUp, BarChart3,
  Globe, Star, Wrench, Brain, Eye, Heart, ThumbsUp, ArrowRight, Play, BookOpen, Info
} from 'lucide-react';
import { motion } from 'framer-motion';

const Guide = () => {
  const heroStats = [
    { value: "75", label: "Years of History", icon: Clock, color: "text-blue-500" },
    { value: "10", label: "Teams", icon: Users, color: "text-green-500" },
    { value: "20", label: "Drivers", icon: Car, color: "text-red-500" },
    { value: "23+", label: "Races", icon: Flag, color: "text-purple-500" },
    { value: "370+", label: "km/h Top Speed", icon: Zap, color: "text-yellow-500" },
    { value: "1000+", label: "Horsepower", icon: Settings, color: "text-orange-500" }
  ];

  const essentialTopics = [
    {
      id: 'basics',
      title: 'F1 Basics',
      icon: BookOpen,
      color: 'bg-blue-500',
      gradient: 'from-blue-500 to-blue-600',
      description: 'Fundamental concepts every F1 fan should know',
      content: {
        whatIs: [
          "Formula 1 is the pinnacle of international motorsport",
          "Single-seater open-wheel racing cars",
          "10 teams with 2 drivers each (20 drivers total)",
          "Races held on 5+ continents annually",
          "Governed by the FIA (Federation Internationale de l'Automobile)"
        ],
        whySpecial: [
          "Cutting-edge automotive technology",
          "Extreme speeds (370+ km/h on straights)",
          "G-forces up to 6G in corners",
          "Precision driving at the absolute limit",
          "Global championship spanning 8+ months"
        ],
        history: [
          "First World Championship: 1950",
          "Most successful driver: Lewis Hamilton (7 titles)",
          "Most successful team: Ferrari (16 Constructors' titles)",
          "Legendary circuits: Monaco, Silverstone, Monza, Spa",
          "Evolution from 1.5L engines to current 1.6L hybrids"
        ]
      }
    },
    {
      id: 'weekend',
      title: 'Race Weekend',
      icon: Calendar,
      color: 'bg-green-500',
      gradient: 'from-green-500 to-green-600',
      description: 'Complete weekend format and schedule',
      content: {
        friday: [
          "Free Practice 1 (FP1) - 90 minutes",
          "Initial car setup and baseline runs",
          "Free Practice 2 (FP2) - 90 minutes", 
          "Race simulation and long runs",
          "Tire testing for different compounds"
        ],
        saturday: [
          "Free Practice 3 (FP3) - 60 minutes",
          "Final setup adjustments",
          "Qualifying Session - 60 minutes total",
          "Q1: 18 min (bottom 5 eliminated)",
          "Q2: 15 min (bottom 5 eliminated)",
          "Q3: 12 min (top 10 fight for pole)"
        ],
        sunday: [
          "Formation Lap and Grid Formation",
          "Race Start (Lights Out)",
          "Race Distance: ~300km or 2 hours max",
          "Pit Stops for tire changes",
          "Podium Ceremony for top 3"
        ],
        special: [
          "Sprint Weekends: 6 events per season",
          "Sprint Qualifying on Friday",
          "Sprint Race on Saturday (100km)",
          "Points: 8-7-6-5-4-3-2-1 for top 8",
          "Traditional Qualifying determines Sunday grid"
        ]
      }
    },
    {
      id: 'scoring',
      title: 'Points & Championships',
      icon: Trophy,
      color: 'bg-yellow-500',
      gradient: 'from-yellow-500 to-yellow-600',
      description: 'How points and championships work',
      content: {
        racePoints: [
          "1st Place: 25 points",
          "2nd Place: 18 points", 
          "3rd Place: 15 points",
          "4th Place: 12 points",
          "5th Place: 10 points",
          "6th-10th: 8, 6, 4, 2, 1 points",
          "Fastest Lap: +1 point (if in top 10)"
        ],
        championships: [
          "Drivers' Championship: Individual points",
          "Constructors' Championship: Team points combined",
          "Season runs March to November/December",
          "Most points wins the championship",
          "Prize money distributed based on final position"
        ],
        records: [
          "Most Wins: Lewis Hamilton (103 wins)",
          "Most Poles: Lewis Hamilton (104 poles)",
          "Most Championships: Lewis Hamilton (7 titles)",
          "Most Team Titles: Ferrari (16 titles)",
          "Youngest Winner: Max Verstappen (18y 228d)"
        ]
      }
    },
    {
      id: 'technology',
      title: 'Car Technology',
      icon: Settings,
      color: 'bg-purple-500',
      gradient: 'from-purple-500 to-purple-600',
      description: 'Engineering marvels of modern F1',
      content: {
        powerUnit: [
          "1.6L V6 Turbo Engine",
          "MGU-K: Kinetic Energy Recovery (160hp)",
          "MGU-H: Heat Energy Recovery (120hp)",
          "Total Power Output: 1000+ horsepower",
          "Fuel Flow Limit: 100kg/hour maximum"
        ],
        chassis: [
          "Carbon Fiber Monocoque Construction",
          "Weight: 798kg minimum (including driver)",
          "Wheelbase: 3.7m maximum length",
          "Ground Effect Aerodynamics",
          "Active Suspension Systems Banned"
        ],
        safety: [
          "Halo: Titanium cockpit protection device",
          "HANS Device: Head and neck support",
          "Impact-absorbing barriers at circuits",
          "Crash testing at 15m/s minimum",
          "Fire suppression systems onboard"
        ],
        electronics: [
          "Standardized ECU (Electronic Control Unit)",
          "No traction control or ABS allowed",
          "DRS: Drag Reduction System for overtaking",
          "Radio communication with pit wall",
          "Onboard cameras for broadcast"
        ]
      }
    },
    {
      id: 'strategy',
      title: 'Race Strategy',
      icon: Brain,
      color: 'bg-red-500',
      gradient: 'from-red-500 to-red-600',
      description: 'The chess game behind the speed',
      content: {
        tireStrategy: [
          "Soft Tires: Fastest grip, shortest lifespan",
          "Medium Tires: Balanced performance and durability",
          "Hard Tires: Longest lasting, slower lap times",
          "Must use 2 different compounds in dry race",
          "Intermediate & Full Wet for rain conditions"
        ],
        pitStops: [
          "Mandatory tire change during race",
          "Pit window: Strategic timing crucial",
          "Undercut: Pit early to gain track position",
          "Overcut: Stay out longer for tire advantage",
          "Double-stacking: Both team cars pit together"
        ],
        weatherStrategy: [
          "Dry-to-wet: Early switch to intermediates",
          "Wet-to-dry: Timing the crossover point",
          "Full wet conditions: Patience and precision",
          "Track position vs tire advantage",
          "Safety car periods change strategies"
        ],
        raceManagement: [
          "Fuel saving modes to reach finish",
          "Engine modes: Qualify vs Race settings",
          "Battery deployment for overtaking",
          "Managing tire degradation over stint",
          "Team radio: Strategy updates and coaching"
        ]
      }
    },
    {
      id: 'rules',
      title: 'Rules & Regulations',
      icon: Shield,
      color: 'bg-orange-500',
      gradient: 'from-orange-500 to-orange-600',
      description: 'Understanding F1 regulations',
      content: {
        flagSigns: [
          "Green Flag: Race start or all clear",
          "Yellow Flag: Caution, slow down, no overtaking",
          "Red Flag: Session stopped, return to pits",
          "Blue Flag: Faster car approaching to lap you",
          "Checkered Flag: Session or race finished"
        ],
        penalties: [
          "5-second time penalty: Minor infractions",
          "10-second time penalty: More serious incidents",
          "Drive-through penalty: Pass through pit lane",
          "Grid penalty: Start further back next race",
          "Disqualification: Excluded from results"
        ],
        trackLimits: [
          "All four wheels must stay within white lines",
          "Kerbs considered part of the track",
          "Consistent offenders receive penalties",
          "Some corners have specific exceptions",
          "Race control monitors via cameras and sensors"
        ],
        technical: [
          "Minimum weight requirements strictly enforced",
          "Fuel samples taken after each session",
          "Aerodynamic components must pass flex tests",
          "Engine component allocation limits per season",
          "Parc fermé: No major changes after qualifying"
        ]
      }
    },
    {
      id: 'circuits',
      title: 'Iconic Circuits',
      icon: MapPin,
      color: 'bg-teal-500',
      gradient: 'from-teal-500 to-teal-600',
      description: 'Legendary tracks around the world',
      content: {
        legendary: [
          "Monaco: Glamour and precision on tight streets",
          "Silverstone: Home of the British GP since 1950",
          "Monza: Temple of Speed in Italy",
          "Spa-Francorchamps: Epic through Belgian forests",
          "Suzuka: Technical masterpiece in Japan"
        ],
        characteristics: [
          "Street Circuits: Monaco, Singapore, Baku",
          "Permanent Tracks: Silverstone, Spa, Suzuka",
          "High Speed: Monza, Silverstone, Spa straights",
          "Technical: Monaco, Hungary, Singapore",
          "Historic: Silverstone, Monza, Spa, Monaco"
        ],
        challenges: [
          "Weather: Rain adds complexity and danger",
          "Elevation: Spa and COTA have significant hills",
          "Temperature: Hot races stress cars and drivers",
          "Layout: Clockwise vs counterclockwise direction",
          "Surface: Grip levels evolve throughout weekend"
        ]
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10"></div>
        <div className="container mx-auto px-4 py-16 relative">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-primary/10 rounded-2xl">
                <Flag className="h-12 w-12 text-primary animate-flag-wave" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-red-500 to-blue-500">
              Master Formula 1
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Your complete guide to understanding the pinnacle of motorsport
            </p>
          </motion.div>

          {/* Hero Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16"
          >
            {heroStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card/50 backdrop-blur border rounded-xl p-4 text-center hover:bg-card/80 transition-all duration-300 group"
              >
                <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
                <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Main Content - Tabbed Interface */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="basics" className="max-w-6xl mx-auto">
          <TabsList className="grid grid-cols-2 md:grid-cols-6 mb-12 h-auto p-1">
            {essentialTopics.map((topic) => (
              <TabsTrigger 
                key={topic.id} 
                value={topic.id}
                className="flex flex-col items-center gap-2 py-4 px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <topic.icon className="h-5 w-5" />
                <span className="text-xs font-medium">{topic.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {essentialTopics.map((topic, topicIndex) => (
            <TabsContent key={topic.id} value={topic.id} className="space-y-8">
              {/* Topic Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r ${topic.gradient} mb-6`}>
                  <topic.icon className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">{topic.title}</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{topic.description}</p>
              </motion.div>

              {/* Topic Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Object.entries(topic.content).map(([sectionKey, sectionContent], sectionIndex) => (
                  <motion.div
                    key={sectionKey}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
                  >
                    <Card className="h-full card-racing group">
                      <CardHeader className="pb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${topic.color}`}></div>
                          <CardTitle className="text-xl capitalize">
                            {sectionKey.replace(/([A-Z])/g, ' $1').trim()}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {(sectionContent as string[]).map((item, itemIndex) => (
                            <motion.div
                              key={itemIndex}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: itemIndex * 0.05 }}
                              className="flex items-start space-x-3 group/item"
                            >
                              <div className="mt-2">
                                <div className={`w-2 h-2 rounded-full ${topic.color} group-hover/item:scale-125 transition-transform duration-200`}></div>
                              </div>
                              <div className="flex-1">
                                <p className="text-muted-foreground leading-relaxed group-hover/item:text-foreground transition-colors duration-200">
                                  {item}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Quick Tips for each topic */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-12"
              >
                <Card className={`bg-gradient-to-r ${topic.gradient} text-white`}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-white">
                      <ThumbsUp className="h-5 w-5" />
                      <span>Pro Tips</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white/90">
                      {topic.id === 'basics' && (
                        <>
                          <div className="space-y-2">
                            <Eye className="h-5 w-5 mb-2" />
                            <h4 className="font-semibold">Watch Qualifying</h4>
                            <p className="text-sm">Start with qualifying sessions to understand the pure speed of F1 cars</p>
                          </div>
                          <div className="space-y-2">
                            <Users className="h-5 w-5 mb-2" />
                            <h4 className="font-semibold">Pick a Driver</h4>
                            <p className="text-sm">Follow one driver initially to understand their journey and team dynamics</p>
                          </div>
                          <div className="space-y-2">
                            <Globe className="h-5 w-5 mb-2" />
                            <h4 className="font-semibold">Learn the Calendar</h4>
                            <p className="text-sm">Understand which races are classics: Monaco, Silverstone, Monza, Spa</p>
                          </div>
                        </>
                      )}
                      {topic.id === 'weekend' && (
                        <>
                          <div className="space-y-2">
                            <Clock className="h-5 w-5 mb-2" />
                            <h4 className="font-semibold">Friday Matters</h4>
                            <p className="text-sm">Practice sessions show who has pace and setup direction</p>
                          </div>
                          <div className="space-y-2">
                            <Target className="h-5 w-5 mb-2" />
                            <h4 className="font-semibold">Qualifying is Key</h4>
                            <p className="text-sm">Grid position often determines race outcome, especially at Monaco</p>
                          </div>
                          <div className="space-y-2">
                            <Flag className="h-5 w-5 mb-2" />
                            <h4 className="font-semibold">Race Day Drama</h4>
                            <p className="text-sm">Weather, strategy, and safety cars can completely change the outcome</p>
                          </div>
                        </>
                      )}
                      {topic.id === 'scoring' && (
                        <>
                          <div className="space-y-2">
                            <Trophy className="h-5 w-5 mb-2" />
                            <h4 className="font-semibold">Consistency Wins</h4>
                            <p className="text-sm">Regular points finishes often beat occasional wins for championships</p>
                          </div>
                          <div className="space-y-2">
                            <TrendingUp className="h-5 w-5 mb-2" />
                            <h4 className="font-semibold">Team Battles</h4>
                            <p className="text-sm">Constructors' championship affects prize money and team prestige</p>
                          </div>
                          <div className="space-y-2">
                            <Zap className="h-5 w-5 mb-2" />
                            <h4 className="font-semibold">Fastest Lap</h4>
                            <p className="text-sm">Extra point for fastest lap adds strategic element to race end</p>
                          </div>
                        </>
                      )}
                      {topic.id === 'technology' && (
                        <>
                          <div className="space-y-2">
                            <Settings className="h-5 w-5 mb-2" />
                            <h4 className="font-semibold">Hybrid Power</h4>
                            <p className="text-sm">ERS deployment is key to overtaking and defending position</p>
                          </div>
                          <div className="space-y-2">
                            <Wind className="h-5 w-5 mb-2" />
                            <h4 className="font-semibold">Aerodynamics</h4>
                            <p className="text-sm">Setup changes affect balance between straight-line speed and cornering</p>
                          </div>
                          <div className="space-y-2">
                            <Shield className="h-5 w-5 mb-2" />
                            <h4 className="font-semibold">Safety First</h4>
                            <p className="text-sm">Modern F1 is incredibly safe thanks to continuous innovation</p>
                          </div>
                        </>
                      )}
                      {topic.id === 'strategy' && (
                        <>
                          <div className="space-y-2">
                            <Disc3 className="h-5 w-5 mb-2" />
                            <h4 className="font-semibold">Tire Choice</h4>
                            <p className="text-sm">Track temperature and weather heavily influence optimal tire strategy</p>
                          </div>
                          <div className="space-y-2">
                            <Timer className="h-5 w-5 mb-2" />
                            <h4 className="font-semibold">Pit Windows</h4>
                            <p className="text-sm">Teams calculate optimal pit windows based on tire degradation curves</p>
                          </div>
                          <div className="space-y-2">
                            <BarChart3 className="h-5 w-5 mb-2" />
                            <h4 className="font-semibold">Live Strategy</h4>
                            <p className="text-sm">Safety cars and weather changes force real-time strategy adaptations</p>
                          </div>
                        </>
                      )}
                      {topic.id === 'rules' && (
                        <>
                          <div className="space-y-2">
                            <Flag className="h-5 w-5 mb-2" />
                            <h4 className="font-semibold">Flag Meanings</h4>
                            <p className="text-sm">Understanding flags helps follow safety situations and race flow</p>
                          </div>
                          <div className="space-y-2">
                            <AlertTriangle className="h-5 w-5 mb-2" />
                            <h4 className="font-semibold">Penalty System</h4>
                            <p className="text-sm">Stewards decisions can dramatically affect championship standings</p>
                          </div>
                          <div className="space-y-2">
                            <Wrench className="h-5 w-5 mb-2" />
                            <h4 className="font-semibold">Technical Rules</h4>
                            <p className="text-sm">Teams push boundaries while staying within complex regulations</p>
                          </div>
                        </>
                      )}
                      {topic.id === 'circuits' && (
                        <>
                          <div className="space-y-2">
                            <MapPin className="h-5 w-5 mb-2" />
                            <h4 className="font-semibold">Track Types</h4>
                            <p className="text-sm">Each circuit type rewards different car setups and driving styles</p>
                          </div>
                          <div className="space-y-2">
                            <Star className="h-5 w-5 mb-2" />
                            <h4 className="font-semibold">Legendary Venues</h4>
                            <p className="text-sm">Historic tracks like Monaco and Silverstone have unique character and challenges</p>
                          </div>
                          <div className="space-y-2">
                            <Gauge className="h-5 w-5 mb-2" />
                            <h4 className="font-semibold">Track Evolution</h4>
                            <p className="text-sm">Lap times improve throughout weekend as rubber builds up on track surface</p>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Learning Progress Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">Continue Your F1 Journey</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Now that you understand the basics, explore our interactive tools and simulations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Interactive Simulations",
              description: "Practice pit stops and qualifying",
              icon: Play,
              color: "bg-blue-500",
              link: "/simulations"
            },
            {
              title: "F1 Terminology",
              description: "Master the racing vocabulary",
              icon: BookOpen,
              color: "bg-green-500",
              link: "/terms"
            },
            {
              title: "Teams & Drivers",
              description: "Meet the current grid",
              icon: Users,
              color: "bg-red-500",
              link: "/teams"
            },
            {
              title: "Legendary Tracks",
              description: "Explore iconic circuits",
              icon: MapPin,
              color: "bg-purple-500",
              link: "/tracks"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="h-full card-racing group-hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="flex items-center justify-center text-primary group-hover:text-primary/80 transition-colors">
                    <span className="mr-2">Explore</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Final CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center bg-gradient-to-r from-primary to-secondary rounded-2xl p-12 text-white"
        >
          <Heart className="h-12 w-12 mx-auto mb-6 animate-pulse" />
          <h3 className="text-3xl font-bold mb-4">Welcome to the F1 Family!</h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            You now have the foundation to enjoy Formula 1 at its fullest. The more you watch, the more you'll appreciate the incredible skill, strategy, and technology that makes F1 the pinnacle of motorsport.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors">
              Watch Your First Race
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Explore More Guides
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Guide;