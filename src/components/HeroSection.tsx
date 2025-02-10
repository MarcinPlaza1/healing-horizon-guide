
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const HeroSection = () => {
  return (
    <section className="pt-32 pb-16 px-4">
      <div className="container mx-auto text-center">
        <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full mb-4 slide-up">
          Your Journey to Wellness Starts Here
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 slide-up" style={{ animationDelay: "0.1s" }}>
          Transform Your Life with Mindful Recovery
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto slide-up" style={{ animationDelay: "0.2s" }}>
          Join a supportive community dedicated to helping you overcome challenges and build lasting positive changes in your life.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 slide-up" style={{ animationDelay: "0.3s" }}>
          <Button size="lg" className="w-full sm:w-auto">
            Start Your Journey
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
