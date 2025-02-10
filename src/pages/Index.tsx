
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeatureCard from "@/components/FeatureCard";
import { Heart, Users, Calendar, Shield, Book, Trophy, Star } from "lucide-react";
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

        <section className="py-20 px-4 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 slide-up">Key Benefits</h2>
            <p className="text-muted-foreground text-lg text-center mb-12 max-w-2xl mx-auto slide-up">
              Experience a comprehensive approach to wellness with our feature-rich platform.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={Shield}
                title="Privacy First"
                description="Your privacy is our priority. All data is encrypted and securely stored following industry best practices."
              />
              <FeatureCard
                icon={Book}
                title="Resource Library"
                description="Access a vast collection of articles, videos, and worksheets to support your journey."
              />
              <FeatureCard
                icon={Trophy}
                title="Achievement System"
                description="Stay motivated with our achievement system that celebrates your progress and milestones."
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
                  <span className="inline-block px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary rounded-full mb-6">
                    Success Stories
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Thousands Who Have Already Transformed Their Lives</h2>
                  <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                    Our community members have experienced remarkable growth and positive change. 
                    Through dedication and support, they've built stronger, healthier lives.
                  </p>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((_, i) => (
                        <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <span className="text-muted-foreground">4.9/5 from over 1,000 reviews</span>
                  </div>
                </div>
                <div className="relative">
                  <div className="aspect-video rounded-2xl overflow-hidden glass-card p-1">
                    <img 
                      src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
                      alt="Success Story"
                      className="w-full h-full object-cover rounded-xl"
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
              Join thousands of others who have already taken the first step towards a better life.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 slide-up">
              <Link to="/auth">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 bg-primary hover:bg-primary/90 transition-all duration-300">
                  Get Started Now
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-6 hover:bg-primary/5 transition-all duration-300">
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
