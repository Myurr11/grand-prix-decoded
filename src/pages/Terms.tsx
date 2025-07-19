import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Zap, Wind, Trophy, Timer } from 'lucide-react';

const Terms = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const terms = [
    {
      term: 'DRS',
      definition: 'Drag Reduction System - Moveable rear wing element that reduces drag on straights to aid overtaking',
      category: 'Technology',
      icon: Wind
    },
    {
      term: 'Pole Position',
      definition: 'The first starting position on the grid, earned by setting the fastest qualifying time',
      category: 'Racing',
      icon: Trophy
    },
    {
      term: 'Undercut',
      definition: 'Pit stop strategy where a driver pits earlier than rivals to gain track position',
      category: 'Strategy',
      icon: Timer
    },
    {
      term: 'ERS',
      definition: 'Energy Recovery System - Hybrid technology that recovers and deploys energy for extra power',
      category: 'Technology',
      icon: Zap
    },
    {
      term: 'Dirty Air',
      definition: 'Turbulent air behind another car that reduces aerodynamic efficiency',
      category: 'Aerodynamics',
      icon: Wind
    },
    {
      term: 'Box Box',
      definition: 'Radio call instructing driver to enter the pit lane for a pit stop',
      category: 'Communication',
      icon: Timer
    },
    {
      term: 'Parc Fermé',
      definition: 'Restricted area where cars are held and cannot be modified between qualifying and race',
      category: 'Rules',
      icon: Trophy
    },
    {
      term: 'Safety Car',
      definition: 'Official car deployed to neutralize the race during dangerous conditions',
      category: 'Safety',
      icon: Trophy
    }
  ];

  const categories = [...new Set(terms.map(term => term.category))];

  const filteredTerms = terms.filter(term =>
    term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    term.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
    term.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryColor = (category: string) => {
    const colors = {
      'Technology': 'bg-blue-500/10 text-blue-600 border-blue-500/20',
      'Racing': 'bg-red-500/10 text-red-600 border-red-500/20',
      'Strategy': 'bg-green-500/10 text-green-600 border-green-500/20',
      'Aerodynamics': 'bg-purple-500/10 text-purple-600 border-purple-500/20',
      'Communication': 'bg-orange-500/10 text-orange-600 border-orange-500/20',
      'Rules': 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
      'Safety': 'bg-gray-500/10 text-gray-600 border-gray-500/20'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500/10 text-gray-600';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
          F1 Terminology
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Master the language of Formula 1 racing
        </p>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search F1 terms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <span
            key={category}
            className={`px-3 py-1 rounded-full text-sm border ${getCategoryColor(category)}`}
          >
            {category}
          </span>
        ))}
      </div>

      {/* Terms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTerms.map((termData, index) => {
          const Icon = termData.icon;
          return (
            <Card key={index} className="card-racing group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg font-bold text-primary">
                      {termData.term}
                    </CardTitle>
                    <CardDescription className={`inline-block px-2 py-1 rounded-full text-xs border mt-2 ${getCategoryColor(termData.category)}`}>
                      {termData.category}
                    </CardDescription>
                  </div>
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <Icon className="h-5 w-5 text-primary group-hover:text-primary-foreground" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {termData.definition}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredTerms.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No terms found matching "{searchTerm}"
          </p>
        </div>
      )}
    </div>
  );
};

export default Terms;