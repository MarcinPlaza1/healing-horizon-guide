
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeatureCard from "@/components/FeatureCard";
import { Heart, Users, Calendar } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        <HeroSection />
        
        <section className="py-20 px-4 bg-gradient-to-b from-background to-primary/5">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Why Choose Us</h2>
            <p className="text-muted-foreground text-lg text-center mb-12 max-w-2xl mx-auto">
              Discover the features that make our platform unique and effective in supporting your recovery journey.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={Heart}
                title="Personal Growth"
                description="Track your progress and celebrate milestones on your journey to recovery with our intuitive tools."
              />
              <FeatureCard
                icon={Users}
                title="Community Support"
                description="Connect with others who understand and support your journey in a safe, nurturing environment."
              />
              <FeatureCard
                icon={Calendar}
                title="Daily Practice"
                description="Build healthy habits with daily check-ins, guided exercises, and personalized recommendations."
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
