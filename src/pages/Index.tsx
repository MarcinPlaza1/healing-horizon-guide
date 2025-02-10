
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeatureCard from "@/components/FeatureCard";
import { Heart, Users, Calendar, Shield, Book, Trophy, Target, LeafyGreen, Brain, Activity, Weight, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        <HeroSection />
        
        <section className="py-20 px-4 bg-gradient-to-b from-background to-primary/5">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 slide-up">Core Features</h2>
            <p className="text-muted-foreground text-lg text-center mb-12 max-w-2xl mx-auto slide-up">
              Discover our comprehensive suite of wellness and recovery tools
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={Activity}
                title="Recovery Tracking"
                description="Monitor your recovery journey with detailed progress tracking and milestone celebrations."
              />
              <FeatureCard
                icon={LeafyGreen}
                title="Nutrition Management"
                description="Track your daily nutrition, water intake, and maintain healthy eating habits."
              />
              <FeatureCard
                icon={Brain}
                title="Dopamine Detox"
                description="Manage digital wellness and build healthy relationships with technology."
              />
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 slide-up">Wellness Tools</h2>
            <p className="text-muted-foreground text-lg text-center mb-12 max-w-2xl mx-auto slide-up">
              Comprehensive tools to support your journey to wellness
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={LineChart}
                title="Progress Analytics"
                description="Visualize your wellness journey with detailed charts and insights."
              />
              <FeatureCard
                icon={Calendar}
                title="Daily Check-ins"
                description="Track your mood, stress levels, and daily wellness metrics."
              />
              <FeatureCard
                icon={Weight}
                title="Health Statistics"
                description="Monitor your vital health metrics and track improvements over time."
              />
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-gradient-to-b from-background to-primary/5 overflow-hidden">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 slide-up">Support Systems</h2>
            <p className="text-muted-foreground text-lg text-center mb-12 max-w-2xl mx-auto slide-up">
              You're not alone on this journey
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={Users}
                title="Community Support"
                description="Connect with others on similar journeys in our supportive community."
              />
              <FeatureCard
                icon={Shield}
                title="Privacy First"
                description="Your data is encrypted and securely stored with our privacy-first approach."
              />
              <FeatureCard
                icon={Book}
                title="Resource Library"
                description="Access our extensive collection of wellness and recovery resources."
              />
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-gradient-to-b from-primary/5 to-background relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-blue-50 opacity-50" />
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl" />
          
          <div className="container mx-auto text-center relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 slide-up">Ready to Transform Your Life?</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto slide-up">
              Join our community and start your journey to wellness today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 slide-up">
              <Link to="/auth">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105">
                  Get Started Now
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-6 hover:bg-primary/5 transition-all duration-300 hover:scale-105">
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
