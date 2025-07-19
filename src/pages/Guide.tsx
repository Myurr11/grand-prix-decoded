import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Trophy, Flag, Users, Calendar } from 'lucide-react';

const Guide = () => {
  const sections = [
    {
      title: 'What is Formula 1?',
      description: 'The pinnacle of motorsport racing',
      icon: Flag,
      content: 'Formula 1 is the highest class of international racing for open-wheel single-seater formula racing cars. It features the world\'s best drivers competing in high-tech cars at incredible speeds on tracks around the globe.'
    },
    {
      title: 'Race Weekend Format',
      description: 'Friday practice to Sunday race',
      icon: Calendar,
      content: 'A typical F1 weekend includes: Friday Practice (FP1 & FP2), Saturday Practice (FP3) and Qualifying, Sunday Race. Each session serves to prepare drivers and teams for the main event.'
    },
    {
      title: 'Points System',
      description: 'How drivers and teams score',
      icon: Trophy,
      content: 'Points are awarded to the top 10 finishers: 1st (25pts), 2nd (18pts), 3rd (15pts), 4th (12pts), 5th (10pts), 6th (8pts), 7th (6pts), 8th (4pts), 9th (2pts), 10th (1pt). Additional point for fastest lap if finishing in top 10.'
    },
    {
      title: 'Championships',
      description: 'Drivers\' and Constructors\' titles',
      icon: Users,
      content: 'Two championships are contested: Drivers\' Championship (individual driver points) and Constructors\' Championship (combined points of both team drivers). Both are highly prestigious.'
    },
    {
      title: 'Race Duration',
      description: 'Time and distance limits',
      icon: Clock,
      content: 'Races are either 305km in distance or 2 hours in duration, whichever comes first. Most races last 1.5-2 hours depending on the track length and safety car periods.'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
          Beginner's Guide to F1
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Everything you need to know to start enjoying Formula 1 racing
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section, index) => {
          const Icon = section.icon;
          return (
            <Card key={index} className="card-racing group cursor-pointer">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <Icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {section.content}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Facts Section */}
      <div className="mt-16 bg-secondary rounded-xl p-8">
        <h2 className="text-2xl font-bold text-secondary-foreground mb-6 text-center">
          Quick F1 Facts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">20</div>
            <div className="text-secondary-foreground">Drivers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">10</div>
            <div className="text-secondary-foreground">Teams</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">23</div>
            <div className="text-secondary-foreground">Races</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">370+</div>
            <div className="text-secondary-foreground">km/h Top Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guide;