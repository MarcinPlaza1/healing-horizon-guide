
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeatureCard from "@/components/FeatureCard";
import DailyInspiration from "@/components/DailyInspiration";
import ProgressPreview from "@/components/ProgressPreview";
import DailyCheckin from "@/components/DailyCheckin";
import { Heart, Users, Calendar } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        <HeroSection />
        
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={Heart}
                title="Personal Growth"
                description="Track your progress and celebrate milestones on your journey to recovery."
              />
              <FeatureCard
                icon={Users}
                title="Community Support"
                description="Connect with others who understand and support your journey."
              />
              <FeatureCard
                icon={Calendar}
                title="Daily Practice"
                description="Build healthy habits with daily check-ins and guided exercises."
              />
            </div>
          </div>
        </section>
        
        <section className="py-16 px-4 bg-secondary/30">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <DailyCheckin />
              <div className="space-y-8">
                <DailyInspiration />
                <ProgressPreview />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
