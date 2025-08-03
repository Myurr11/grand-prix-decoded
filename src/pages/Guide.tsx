import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Clock, Trophy, Flag, Users, Calendar, Settings, Zap,
  Car, Heart, BookOpen, Monitor, Cpu, PieChart, Smile, Users2, FileText, Map
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { fetchTopics, Topic } from '../services/guideService';

const Guide = () => {
  const [essentialTopics, setEssentialTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);

  const heroStats = [
    { value: "75", label: "Years of History", icon: Clock, color: "text-blue-500" },
    { value: "10", label: "Teams", icon: Users, color: "text-green-500" },
    { value: "20", label: "Drivers", icon: Car, color: "text-red-500" },
    { value: "23+", label: "Races", icon: Flag, color: "text-purple-500" },
    { value: "370+", label: "km/h Top Speed", icon: Zap, color: "text-yellow-500" },
    { value: "1000+", label: "Horsepower", icon: Settings, color: "text-orange-500" }
  ];

  useEffect(() => {
    const loadTopics = async () => {
      setLoading(true);
      const topics = await fetchTopics();
      setEssentialTopics(topics);
      setLoading(false);
    };
    
    loadTopics();
  }, []);

  // Show loading state while data is being fetched
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Rest of your component remains the same
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
        <Tabs defaultValue={essentialTopics[0]?.id || "intro"} className="max-w-6xl mx-auto">
          <TabsList className="grid grid-cols-2 md:grid-cols-7 mb-12 h-auto p-1">
            {essentialTopics.map((topic) => (
              <TabsTrigger 
                key={topic.id} 
                value={topic.id}
                className="flex flex-col items-center gap-2 py-4 px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {/* You'll need to handle the icon dynamically */}
                {getIconComponent(topic.icon)}
                <span className="text-xs font-medium">{topic.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {essentialTopics.map((topic) => (
            <TabsContent key={topic.id} value={topic.id} className="space-y-8">
              {/* Topic Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r ${topic.gradient} mb-6`}>
                  {getIconComponent(topic.icon, "h-10 w-10 text-white")}
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">{topic.title}</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{topic.description}</p>
              </motion.div>

              {/* Enhanced Topic Content Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(topic.content).map(([sectionKey, sectionContent], sectionIndex) => (
                  <motion.div
                    key={sectionKey}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
                  >
                    <Card className="h-full border border-muted/30 hover:border-primary/50 transition-all duration-300 group relative overflow-hidden bg-gradient-to-br from-card/80 to-card/50 shadow-sm hover:shadow-lg">
                      {/* Gradient accent */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${topic.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                      
                      {/* Decorative corner */}
                      <div className={`absolute top-0 right-0 w-16 h-16 ${topic.color} opacity-10 rounded-bl-full transition-all duration-300 group-hover:opacity-20`}></div>
                      
                      <CardHeader className="pb-3 pt-5 px-5">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${topic.color} bg-opacity-20 group-hover:bg-opacity-30 transition-all`}>
                            {getIconComponent(topic.icon, "h-5 w-5")}
                          </div>
                          <CardTitle className="text-lg font-semibold capitalize">
                            {formatSectionTitle(sectionKey)}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0 px-5 pb-5">
                        {renderSectionContent(sectionContent)}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center bg-gradient-to-r from-primary to-secondary rounded-2xl p-12 text-white shadow-xl"
        >
          <Heart className="h-12 w-12 mx-auto mb-6 animate-pulse" />
          <h3 className="text-3xl font-bold mb-4">Welcome to the F1 Family!</h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            You now have the foundation to enjoy Formula 1 at its fullest. The more you watch, the more you'll appreciate the incredible skill, strategy, and technology that makes F1 the pinnacle of motorsport.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors shadow-md hover:shadow-lg">
              Watch Your First Race
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors shadow-md hover:shadow-lg">
              Explore More Guides
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Helper function to get icon component by name
const getIconComponent = (iconName: string, className = "h-5 w-5") => {
  const icons: Record<string, React.FC<any>> = {
    BookOpen, Users, Cpu, Calendar, Trophy, PieChart, Flag, FileText, Map, Clock, 
    Monitor, Heart, Smile, Users2
  };
  
  const IconComponent = icons[iconName];
  return IconComponent ? <IconComponent className={className} /> : <div className={className} />;
};

// Helper function to format section titles
const formatSectionTitle = (key: string) => {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase());
};

// Helper function to render section content based on type
const renderSectionContent = (content: any) => {
  if (Array.isArray(content)) {
    if (typeof content[0] === 'string') {
      return (
        <ul className="space-y-2 list-disc list-inside text-sm text-muted-foreground">
          {content.map((item, i) => (
            <li key={i} className="leading-relaxed">{item}</li>
          ))}
        </ul>
      );
    } else {
      return (
        <div className="space-y-4">
          {content.map((item, i) => (
            <div key={i} className="border-l-2 border-primary/30 pl-4 py-1">
              <h4 className="font-medium text-sm mb-1">{item.title}</h4>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      );
    }
  }
  return null;
};

export default Guide;