import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Flag, AlertTriangle, BookOpen } from 'lucide-react';

const Rules = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
          Rules & Penalties
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Understanding F1 regulations and race procedures
        </p>
      </div>

      <div className="text-center py-20">
        <Shield className="h-16 w-16 text-primary mx-auto mb-6" />
        <h3 className="text-2xl font-bold mb-4">Coming Soon</h3>
        <p className="text-muted-foreground">
          Complete guide to F1 rules, flags, and penalties
        </p>
      </div>
    </div>
  );
};

export default Rules;