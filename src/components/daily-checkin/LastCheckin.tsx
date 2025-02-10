
import { Heart } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface LastCheckinProps {
  lastCheckin: {
    created_at: string;
    mood: string;
  };
  getMoodEmoji: (mood: string) => string;
}

const LastCheckin = ({ lastCheckin, getMoodEmoji }: LastCheckinProps) => {
  return (
    <Card className="bg-muted/50 hover:bg-muted/70 transition-colors duration-200">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-primary" />
          Last Check-in
        </CardTitle>
        <CardDescription>
          {new Date(lastCheckin.created_at).toLocaleDateString()} at{" "}
          {new Date(lastCheckin.created_at).toLocaleTimeString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <span className="text-2xl">{getMoodEmoji(lastCheckin.mood)}</span>
          <span className="capitalize text-sm text-muted-foreground">
            {lastCheckin.mood}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default LastCheckin;
