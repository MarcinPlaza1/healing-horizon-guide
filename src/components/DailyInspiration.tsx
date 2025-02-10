
import { Card } from "@/components/ui/card";
import { Sun } from "lucide-react";

const DailyInspiration = () => {
  return (
    <Card className="p-6 glass-card text-center fade-in">
      <div className="flex justify-center mb-4">
        <Sun className="h-8 w-8 text-primary" />
      </div>
      <h3 className="text-lg font-semibold mb-2">Today's Inspiration</h3>
      <p className="text-muted-foreground italic">
        "Every moment is a fresh beginning. Trust in your strength to create positive change."
      </p>
    </Card>
  );
};

export default DailyInspiration;
