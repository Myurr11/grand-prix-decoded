import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen, Users, MapPin, Zap, Trophy, Flag } from 'lucide-react';
import heroImage from '@/assets/f1-hero.jpg';

const Index = () => {
  const features = [
    {
      title: 'Beginner\'s Guide',
      description: 'Learn F1 basics, race formats, and point systems',
      icon: BookOpen,
      link: '/guide',
      color: 'bg-blue-500/10 text-blue-600'
    },
    {
      title: 'F1 Terminology',
      description: 'Master essential racing terms and concepts',
      icon: Zap,
      link: '/terms',
      color: 'bg-yellow-500/10 text-yellow-600'
    },
    {
      title: 'Teams & Drivers',
      description: 'Meet the constructors and racing stars',
      icon: Users,
      link: '/teams',
      color: 'bg-red-500/10 text-red-600'
    },
    {
      title: 'Race Tracks',
      description: 'Explore circuits from around the world',
      icon: MapPin,
      link: '/tracks',
      color: 'bg-green-500/10 text-green-600'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80" />
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <Flag className="h-16 w-16 mx-auto mb-6 text-primary animate-flag-wave" />
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Master <span className="gradient-text">Formula 1</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 animate-fade-in">
            Your complete guide to understanding the pinnacle of motorsport
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Link to="/guide">
              <Button className="btn-hero">
                Start Learning F1
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/terms">
              <Button className="btn-track">
                Explore Terms
              </Button>
            </Link>
          </div>
        </div>

        {/* Speed lines effect */}
        <div className="absolute bottom-0 left-0 right-0 h-1 speed-lines opacity-70"></div>
      </section>

      {/* What is F1 Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What is <span className="gradient-text">Formula 1?</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Formula 1 is the highest class of international racing for open-wheel single-seater 
              formula racing cars. Twenty drivers compete in the world's most advanced racing machines, 
              reaching speeds over 370 km/h on legendary circuits around the globe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="text-center p-6 card-racing">
              <Trophy className="h-12 w-12 text-primary mx-auto mb-4" />
              <div className="text-3xl font-bold text-primary mb-2">75</div>
              <div className="text-muted-foreground">Years of Racing</div>
            </div>
            <div className="text-center p-6 card-racing">
              <Flag className="h-12 w-12 text-primary mx-auto mb-4" />
              <div className="text-3xl font-bold text-primary mb-2">23</div>
              <div className="text-muted-foreground">Races per Season</div>
            </div>
            <div className="text-center p-6 card-racing">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <div className="text-3xl font-bold text-primary mb-2">20</div>
              <div className="text-muted-foreground">Elite Drivers</div>
            </div>
            <div className="text-center p-6 card-racing">
              <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
              <div className="text-3xl font-bold text-primary mb-2">370+</div>
              <div className="text-muted-foreground">km/h Top Speed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Your <span className="gradient-text">F1 Journey</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you're new to F1 or want to deepen your knowledge, 
              we've got everything you need to become a true racing fan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link key={index} to={feature.link}>
                  <Card className="card-racing h-full group cursor-pointer">
                    <CardHeader className="text-center">
                      <div className={`w-16 h-16 rounded-xl ${feature.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-8 w-8" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <ArrowRight className="h-5 w-5 mx-auto text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-foreground mb-6">
            Ready to Become an F1 Expert?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of fans who've transformed their F1 experience with our comprehensive guides.
          </p>
          <Link to="/guide">
            <Button className="btn-hero">
              Begin Your F1 Education
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
