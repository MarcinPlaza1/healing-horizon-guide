
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeatureCard from "@/components/FeatureCard";
import { Heart, Users, Calendar, Shield, Book, Trophy, Target, Sparkles, Leaf } from "lucide-react";
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
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 slide-up">Why Choose Us</h2>
            <p className="text-muted-foreground text-lg text-center mb-12 max-w-2xl mx-auto slide-up">
              Discover the features that make our platform unique and effective in supporting your journey to health.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={Heart}
                title="Personal Growth"
                description="Track your progress and celebrate milestones on your path to health with our intuitive tools."
              />
              <FeatureCard
                icon={Users}
                title="Community Support"
                description="Connect with others who understand and support your journey in a safe, nurturing environment."
              />
              <FeatureCard
                icon={Calendar}
                title="Daily Practice"
                description="Build healthy habits through daily check-ins, exercises, and personalized recommendations."
              />
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 slide-up">Key Benefits</h2>
            <p className="text-muted-foreground text-lg text-center mb-12 max-w-2xl mx-auto slide-up">
              Experience a comprehensive approach to wellbeing with our feature-rich platform.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={Shield}
                title="Privacy"
                description="Your privacy is our priority. All data is encrypted and securely stored."
              />
              <FeatureCard
                icon={Book}
                title="Resource Library"
                description="Access an extensive collection of articles, videos, and materials to support your journey."
              />
              <FeatureCard
                icon={Trophy}
                title="Achievement System"
                description="Stay motivated with our achievement system that celebrates your progress."
              />
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-gradient-to-b from-background to-primary/5 overflow-hidden">
          <div className="container mx-auto">
            <div className="relative">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-400/20 rounded-full blur-3xl" />
              <div className="grid md:grid-cols-2 gap-12 items-center relative">
                <div className="text-left">
                  <span className="inline-block px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary rounded-full mb-6 animate-pulse">
                    Start Your Journey Today
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 slide-up">Begin Your Path to Growth</h2>
                  <p className="text-muted-foreground text-lg mb-8 leading-relaxed slide-up">
                    Take the first step towards a more mindful and balanced life. Our platform provides the tools, 
                    guidance, and support needed to begin your journey to health.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    <div className="flex items-start gap-3 hover:scale-105 transition-transform duration-300">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Target className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Set Goals</h3>
                        <p className="text-muted-foreground">Define your personal goals</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 hover:scale-105 transition-transform duration-300">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Track Progress</h3>
                        <p className="text-muted-foreground">Monitor your development</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 hover:scale-105 transition-transform duration-300">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Leaf className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Build Habits</h3>
                        <p className="text-muted-foreground">Develop healthy routines</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
                  <div className="aspect-video rounded-2xl overflow-hidden glass-card p-1 relative">
                    <img 
                      src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
                      alt="Path to Growth"
                      className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-gradient-to-b from-primary/5 to-background relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-blue-50 opacity-50" />
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl" />
          
          <div className="container mx-auto text-center relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 slide-up">Ready to Start Your Journey?</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto slide-up">
              Take the first step towards a better tomorrow. Your path to health begins here.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 slide-up">
              <Link to="/auth">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105">
                  Start Now
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
