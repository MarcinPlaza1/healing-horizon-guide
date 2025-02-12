
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface AddictionHeaderProps {
  addDialogOpen: boolean;
  setAddDialogOpen: (open: boolean) => void;
  onSuccess: () => void;
}

export const AddictionHeader = ({ addDialogOpen, setAddDialogOpen, onSuccess }: AddictionHeaderProps) => {
  return (
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-8 border-b relative">
      <div className="transition-all duration-500">
        <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
          {addDialogOpen ? "Begin Your Recovery Journey" : "Recovery Dashboard"}
        </CardTitle>
        <CardDescription className="text-base mt-2">
          {addDialogOpen 
            ? "Take the first step towards positive change. We're here to support you every step of the way."
            : "Track your progress and celebrate every milestone on your recovery journey"}
        </CardDescription>
      </div>
      <div className={`transition-all duration-500 ${addDialogOpen ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}>
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
