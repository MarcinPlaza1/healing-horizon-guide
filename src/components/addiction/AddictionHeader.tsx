
import { PlusCircle, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface AddictionHeaderProps {
  addDialogOpen: boolean;
  setAddDialogOpen: (open: boolean) => void;
  onSuccess: () => void;
}

export const AddictionHeader = ({ addDialogOpen, setAddDialogOpen, onSuccess }: AddictionHeaderProps) => {
  return (
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-8 border-b">
      <div className={`animate-fade-in transition-all duration-300 ${addDialogOpen ? 'opacity-100' : ''}`}>
        <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
          {addDialogOpen ? 'Begin Your Recovery Journey' : 'Recovery Dashboard'}
        </CardTitle>
        <CardDescription className="text-base mt-2">
          {addDialogOpen 
            ? 'Take the first step towards positive change. We're here to support you every step of the way.'
            : 'Track your progress and celebrate every milestone on your recovery journey'}
        </CardDescription>
      </div>
      <div className={`flex items-center gap-6 transition-all duration-300 ${addDialogOpen ? 'opacity-0' : 'animate-fade-in'}`}>
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 px-3 py-1.5 transition-colors duration-200">
            <Clock className="h-4 w-4 mr-1.5" />
            Active
          </Badge>
          <Badge variant="outline" className="bg-green-500/10 text-green-500 hover:bg-green-500/20 px-3 py-1.5 transition-colors duration-200">
            <CheckCircle className="h-4 w-4 mr-1.5" />
            Recovered
          </Badge>
          <Badge variant="outline" className="bg-red-500/10 text-red-500 hover:bg-red-500/20 px-3 py-1.5 transition-colors duration-200">
            <AlertTriangle className="h-4 w-4 mr-1.5" />
            Relapsed
          </Badge>
        </div>
        <Button 
          size="lg" 
          onClick={() => setAddDialogOpen(true)}
          className="px-6 py-5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-gradient-to-r from-primary/90 to-primary hover:from-primary hover:to-primary/90"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          New Journey
        </Button>
      </div>
    </CardHeader>
  );
};
