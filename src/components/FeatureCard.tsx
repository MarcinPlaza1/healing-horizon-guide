
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <Card className="p-8 glass-card hover:shadow-xl transition-all duration-500 fade-in group hover:scale-102 cursor-pointer border-primary/10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-purple-500/50 transform origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
      <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-all duration-300 transform group-hover:rotate-6">
        <Icon className="h-7 w-7 text-primary transform transition-transform duration-300 group-hover:scale-110" />
      </div>
      <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">{title}</h3>
      <p className="text-muted-foreground text-lg leading-relaxed group-hover:text-foreground transition-colors duration-300">{description}</p>
    </Card>
  );
};

export default FeatureCard;
