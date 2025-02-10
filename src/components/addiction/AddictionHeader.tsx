
import { PlusCircle, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { AddAddictionForm } from "./AddAddictionForm";

interface AddictionHeaderProps {
  addDialogOpen: boolean;
  setAddDialogOpen: (open: boolean) => void;
  onSuccess: () => void;
}

export const AddictionHeader = ({ addDialogOpen, setAddDialogOpen, onSuccess }: AddictionHeaderProps) => {
  return (
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-8 border-b">
      <div>
        <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
          Recovery Dashboard
        </CardTitle>
        <CardDescription className="text-base mt-2">
          Track your progress and celebrate every milestone on your recovery journey
        </CardDescription>
      </div>
      <div className="flex items-center gap-6">
        <div className="hidden md:flex gap-2">
          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 px-3 py-1.5">
            <Clock className="h-4 w-4 mr-1.5" />
            Active
          </Badge>
          <Badge variant="outline" className="bg-green-500/10 text-green-500 hover:bg-green-500/20 px-3 py-1.5">
            <CheckCircle className="h-4 w-4 mr-1.5" />
            Recovered
          </Badge>
          <Badge variant="outline" className="bg-red-500/10 text-red-500 hover:bg-red-500/20 px-3 py-1.5">
            <AlertTriangle className="h-4 w-4 mr-1.5" />
            Relapsed
          </Badge>
        </div>
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              size="lg" 
              className="relative overflow-hidden group px-6 py-5 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent group-hover:translate-x-full transition-transform duration-500" />
              <PlusCircle className="h-5 w-5 mr-2" />
              Add New Record
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                Start Your Recovery Journey
              </DialogTitle>
              <DialogDescription className="text-base mt-2">
                Take the first step towards a healthier future. Track your progress, set goals, and maintain accountability with our comprehensive recovery tracking system.
              </DialogDescription>
            </DialogHeader>
            <Card className="border-0 shadow-none">
              <AddAddictionForm
                onSuccess={() => {
                  setAddDialogOpen(false);
                  onSuccess();
                }}
                onCancel={() => setAddDialogOpen(false)}
              />
            </Card>
          </DialogContent>
        </Dialog>
      </div>
    </CardHeader>
  );
};
