
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-16 px-4 overflow-hidden min-h-[90vh] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-50/80 to-blue-50/80" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1649972904349-6e44c42644a7')] bg-cover bg-center opacity-5" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse" />
      
      <div className="container mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 hover:bg-primary/20 transition-colors duration-300 cursor-pointer group">
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span className="text-sm font-medium group-hover:scale-105 transition-transform duration-300">
            Your Journey to Wellness Starts Here
          </span>
        </div>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 slide-up bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent" style={{ animationDelay: "0.1s" }}>
          Transform Your Life with
          <br /> 
          <span className="relative">
            Mindful Recovery
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-purple-600 rounded-full transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></span>
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto slide-up leading-relaxed" style={{ animationDelay: "0.2s" }}>
          Take control of your journey with our comprehensive platform designed to support 
          your personal growth and development.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 slide-up" style={{ animationDelay: "0.3s" }}>
          <Link to="/auth">
            <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-primary/25">
              Start Your Journey
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full sm:w-auto text-lg px-8 py-6 hover:bg-primary/5 transition-all duration-300 hover:scale-105 border-2 hover:border-primary"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
