 import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Zap, Wind, Trophy, Timer, Flag, Car, Settings, Users, Target, AlertTriangle, Radio, Fuel, Gauge, MapPin, Clock, Shield, ChevronRight } from 'lucide-react';
import { fetchAllTerms, fetchTermsByCategory, searchTerms } from '@/services/termsService';

// Define the Term type
interface Term {
  term: string;
  definition: string;
  category: string;
  icon: string;
}

// Map icon strings to actual components
const iconComponents: Record<string, React.ComponentType<any>> = {
  'Flag': Flag,
  'Target': Target,
  'AlertTriangle': AlertTriangle,
  'Timer': Timer,
  'Radio': Radio,
  'Gauge': Gauge,
  'Zap': Zap,
  'Wind': Wind,
  'Fuel': Fuel,
  'Trophy': Trophy,
  'Car': Car,
  'Users': Users,
  'Shield': Shield,
  'MapPin': MapPin,
  'Clock': Clock
};

const Terms = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [terms, setTerms] = useState<Term[]>([]);
  const [filteredTerms, setFilteredTerms] = useState<Term[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);

  // Load terms from Firebase
  useEffect(() => {
    const loadTerms = async () => {
      setIsLoading(true);
      try {
        const allTerms = await fetchAllTerms();
        setTerms(allTerms);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(allTerms.map(term => term.category))];
        setCategories(uniqueCategories);
        
        setFilteredTerms(allTerms);
      } catch (error) {
        console.error("Failed to load terms:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadTerms();
  }, []);

  // Filter terms based on search and category
  useEffect(() => {
    const filterTerms = async () => {
      if (searchTerm) {
        const searchedTerms = await searchTerms(searchTerm);
        const filtered = selectedCategory === 'all' 
          ? searchedTerms 
          : searchedTerms.filter(term => term.category === selectedCategory);
        setFilteredTerms(filtered);
      } else {
        const termsToFilter = selectedCategory === 'all' 
          ? terms 
          : await fetchTermsByCategory(selectedCategory);
        setFilteredTerms(termsToFilter);
      }
    };

    filterTerms();
  }, [searchTerm, selectedCategory, terms]);

  const getCategoryColor = (category: string) => {
    const colors = {
      'Racing Basics': 'border-red-500 text-red-600 hover:bg-red-500/5',
      'Strategy': 'border-green-500 text-green-600 hover:bg-green-500/5',
      'Technology': 'border-blue-500 text-blue-600 hover:bg-blue-500/5',
      'Aerodynamics': 'border-purple-500 text-purple-600 hover:bg-purple-500/5',
      'Rules': 'border-yellow-500 text-yellow-600 hover:bg-yellow-500/5',
      'Safety': 'border-orange-500 text-orange-600 hover:bg-orange-500/5',
      'Communication': 'border-cyan-500 text-cyan-600 hover:bg-cyan-500/5',
      'Track Terms': 'border-indigo-500 text-indigo-600 hover:bg-indigo-500/5',
      'Slang': 'border-pink-500 text-pink-600 hover:bg-pink-500/5'
    };
    return colors[category as keyof typeof colors] || 'border-gray-500 text-gray-600 hover:bg-gray-500/5';
  };

  const getCategoryStats = () => {
    return categories.map(category => ({
      name: category,
      count: terms.filter(term => term.category === category).length
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading F1 terminology...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border-b border-border/50">
        <div className="container mx-auto px-4 py-16 relative">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              F1 Dictionary
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Decode Formula 1's essential terminology. From basic racing concepts to advanced technical jargon - your complete guide to speaking F1.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {getCategoryStats().slice(0, 4).map((stat) => (
                <div key={stat.name} className="p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50">
                  <div className="text-2xl font-bold text-primary mb-1">{stat.count}</div>
                  <div className="text-sm text-muted-foreground">{stat.name.replace('Racing Basics', 'Basics')}</div>
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
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          {/* Category Tabs */}
          <div className="flex justify-center mb-8 overflow-x-auto">
            <TabsList className="inline-flex h-auto p-1 bg-muted/50 rounded-lg">
              <TabsTrigger 
                value="all" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-3 py-2 text-xs whitespace-nowrap"
              >
                All ({terms.length})
              </TabsTrigger>
              {categories.map((category) => {
                const count = terms.filter(term => term.category === category).length;
                return (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-3 py-2 text-xs whitespace-nowrap"
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
                const IconComponent = iconComponents[termData.icon] || Flag;
                return (
                  <Card key={index} className="group relative overflow-hidden bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                    <CardHeader className="pb-4">
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                          <IconComponent className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg font-bold text-foreground mb-2 leading-tight">
                            {termData.term}
                          </CardTitle>
                          <Badge variant="outline" className={`${getCategoryColor(termData.category)} text-xs font-medium px-2 py-1 rounded-full`}>
                            {termData.category}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <p className="text-muted-foreground leading-relaxed">
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
                  {searchTerm && `No terms found matching "${searchTerm}"`}
                  {selectedCategory !== 'all' && ` in ${selectedCategory}`}
                </p>
                <div className="flex gap-2 justify-center">
                  {searchTerm && (
                    <button 
                      onClick={() => setSearchTerm('')}
                      className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md"
                    >
                      Clear search
                    </button>
                  )}
                  {selectedCategory !== 'all' && (
                    <button 
                      onClick={() => setSelectedCategory('all')}
                      className="px-4 py-2 text-sm bg-secondary text-secondary-foreground rounded-md"
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