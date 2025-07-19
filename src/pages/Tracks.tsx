import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Zap, Trophy } from 'lucide-react';

const Tracks = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
          Race Tracks
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore the legendary circuits where F1 history is made
        </p>
      </div>

      <div className="text-center py-20">
        <MapPin className="h-16 w-16 text-primary mx-auto mb-6" />
        <h3 className="text-2xl font-bold mb-4">Coming Soon</h3>
        <p className="text-muted-foreground">
          Interactive track guide with circuit maps and race data
        </p>
      </div>
    </div>
  );
};

export default Tracks;