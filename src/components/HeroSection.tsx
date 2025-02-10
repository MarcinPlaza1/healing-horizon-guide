
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-16 px-4 overflow-hidden min-h-[90vh] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-blue-50 opacity-50" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1649972904349-6e44c42644a7')] bg-cover bg-center opacity-10" />
      
      <div className="container mx-auto text-center relative z-10">
        <span className="inline-block px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary rounded-full mb-6 slide-up">
          Your Journey to Wellness Starts Here
        </span>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 slide-up bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent" style={{ animationDelay: "0.1s" }}>
          Transform Your Life with
          <br /> 
          Mindful Recovery
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto slide-up leading-relaxed" style={{ animationDelay: "0.2s" }}>
          Join a supportive community dedicated to helping you overcome challenges 
          and build lasting positive changes in your life.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 slide-up" style={{ animationDelay: "0.3s" }}>
          <Link to="/auth">
            <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 bg-primary hover:bg-primary/90">
              Start Your Journey
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-6">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
