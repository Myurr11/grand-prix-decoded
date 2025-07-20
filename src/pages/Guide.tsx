import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Clock, Trophy, Flag, Users, Calendar, Settings, 
  Shield, Gauge, Disc3, ScrollText, Award, Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

const Guide = () => {
  const sections = [
    // Full-width featured sections
    {
      title: 'What is Formula 1?',
      description: 'The pinnacle of motorsport racing',
      icon: Flag,
      featured: true,
      content: [
        "Formula 1 is the highest class of international single-seater auto racing sanctioned by the FIA.",
        "Features hybrid power units producing 1000+ horsepower from 1.6L V6 turbo engines with energy recovery systems.",
        "10 teams with 2 drivers compete in 23+ Grands Prix across 5 continents annually.",
        "Cars reach 370+ km/h (230+ mph) with up to 6G cornering forces.",
        "Over 500 million global viewers annually make it one of the most watched sports."
      ]
    },
    {
      title: 'Race Weekend Format',
      description: 'From practice to podium',
      icon: Calendar,
      featured: true,
      content: [
        "• Friday:",
        "  - Free Practice 1 (FP1): 60 minutes of initial setup work",
        "  - Free Practice 2 (FP2): 60 minutes of race simulations",
        "• Saturday:",
        "  - Free Practice 3 (FP3): Final 60-minute practice",
        "  - Qualifying: Three-stage knockout session (Q1-Q3)",
        "• Sunday:",
        "  - Race: Approximately 300km or 2 hours maximum",
        "Special formats:",
        "  - Sprint weekends: Qualifying → Sprint → Main Race",
        "  - Monaco: Thursday practice, Friday off"
      ]
    },

    // Paired smaller sections
    {
      title: 'Points System',
      description: 'How championship scoring works',
      icon: Trophy,
      content: [
        "Standard Race Points:",
        "1st: 25 | 2nd: 18 | 3rd: 15 | 4th: 12 | 5th: 10",
        "6th: 8 | 7th: 6 | 8th: 4 | 9th: 2 | 10th: 1",
        "+1 pt for fastest lap (if in top 10)",
        "Sprint races: 8-7-6-5-4-3-2-1 for top 8",
        "Half points if race stopped before 75% distance"
      ]
    },
    {
      title: 'Championships',
      description: 'Dual titles up for grabs',
      icon: Award,
      content: [
        "Drivers': Individual points (record: 7 titles)",
        "Constructors': Combined team points (Ferrari leads with 16)",
        "Winning both = 'the double'",
        "Prize money based on position",
        "Current champions: Verstappen & Red Bull (2023)"
      ]
    },
    {
      title: 'Car Technology',
      description: 'Engineering marvels',
      icon: Settings,
      content: [
        "1.6L V6 turbo hybrid (1000+ hp)",
        "Carbon fiber monocoque chassis",
        "Ground effect aerodynamics",
        "DRS overtaking system",
        "Minimum weight: 798kg (with driver)"
      ]
    },
    {
      title: 'Team Structure',
      description: 'Who does what in a team',
      icon: Users,
      content: [
        "Team Principal: Overall leadership",
        "Technical Director: Car development",
        "Race Engineers: Driver communication",
        "Strategists: Race planning",
        "Pit Crew: <2 second stops"
      ]
    },

    // Expanded key sections
    {
      title: 'Race Strategy',
      description: 'The chess game behind the speed',
      icon: ScrollText,
      featured: true,
      content: [
        "F1 races are won through perfect strategy execution:",
        
        "• Tire Strategies:",
        "  - Soft: Fast but degrade quickly (15-25 laps)",
        "  - Medium: Balance of speed/longevity (25-40 laps)",
        "  - Hard: Slow but durable (40+ laps)",
        "  - Must use 2 different dry compounds",
        
        "• Common Approaches:",
        "  - One-Stop: Hard → Medium (conservative)",
        "  - Two-Stop: Soft → Soft → Medium (aggressive)",
        "  - UnderCut: Pit early to gain position",
        "  - OverCut: Extend stint for late speed",
        
        "• Weather Considerations:",
        "  - Dry-to-Wet: Early switch to intermediates",
        "  - Wet-to-Dry: Wait for optimal dry line",
        
        "• Key Moments:",
        "  - Safety Car: Cheap pit stop opportunity",
        "  - Red Flag: Free tire/setup changes"
      ]
    },
    {
      title: 'Tire Compounds',
      description: 'Pirelli rubber choices',
      icon: Disc3,
      content: [
        "5 dry compounds: C1 (hardest) to C5 (softest)",
        "Colors: White (hard), Yellow (medium), Red (soft)",
        "Intermediate (green): Wet but drying track",
        "Full wet (blue): Heavy rain conditions",
        "Teams must use 2 dry compounds in dry races"
      ]
    },
    {
      title: 'Safety Systems',
      description: 'Protecting drivers',
      icon: Shield,
      content: [
        "Halo: Titanium cockpit protection",
        "Safety Car: Slows field after incidents",
        "Virtual SC: Maintain delta time",
        "Red Flag: Race suspension",
        "Medical Car: Immediate response"
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-blue-500">
          Beginner's Guide to F1
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Your essential introduction to Formula 1 racing
        </p>
      </motion.div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section, index) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={section.featured ? 'md:col-span-2' : ''}
            >
              <Card className="h-full hover:shadow-md transition-shadow border-border/50">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{section.title}</CardTitle>
                      <CardDescription>{section.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    {section.content.map((item, i) => (
                      <li 
                        key={i} 
                        className={`
                          ${item.startsWith('  -') ? 'ml-6 text-sm' : ''}
                          ${item.startsWith('•') ? 'ml-4' : ''}
                          flex
                        `}
                      >
                        {item.startsWith('•') || item.startsWith('  -') ? (
                          <span className="text-primary mr-2">•</span>
                        ) : null}
                        <span>{item.replace(/^[•\s-]+/, '')}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Stats Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mt-20"
      >
        <h2 className="text-3xl font-bold text-center mb-12 relative">
          <span className="relative z-10 px-4 bg-background">
            F1 By The Numbers
          </span>
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent -z-0"></div>
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "20", label: "Drivers", icon: Users },
            { value: "10", label: "Teams", icon: Flag },
            { value: "23+", label: "Races", icon: Calendar },
            { value: "1000+", label: "HP", icon: Zap },
            { value: "370+", label: "km/h", icon: Gauge },
            { value: "5G", label: "Cornering", icon: Disc3 },
            { value: "1.8s", label: "Pit Stop", icon: Clock },
            { value: "500M+", label: "Viewers", icon: Users }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -3 }}
              className="bg-background border rounded-lg p-4 text-center hover:shadow-sm transition-shadow"
            >
              <stat.icon className="h-5 w-5 mx-auto text-primary mb-2" />
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="mt-20 text-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-8 border border-primary/10"
      >
        <h3 className="text-2xl font-bold mb-4">Ready for More?</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Explore our interactive track guides and driver profiles to deepen your F1 knowledge.
        </p>
        <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors">
          Continue Learning
        </button>
      </motion.div>
    </div>
  );
};

export default Guide;