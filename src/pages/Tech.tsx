import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Car, Zap, Wind, Settings } from 'lucide-react';

const Tech = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
          Cars & Technology
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover the cutting-edge technology behind F1 cars
        </p>
      </div>

      <div className="text-center py-20">
        <Car className="h-16 w-16 text-primary mx-auto mb-6" />
        <h3 className="text-2xl font-bold mb-4">Coming Soon</h3>
        <p className="text-muted-foreground">
          In-depth technical guides and car anatomy
        </p>
      </div>
    </div>
  );
};

export default Tech;