
import { PlusCircle, Clock, CheckCircle, AlertTriangle, BarChart3 } from "lucide-react";
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
import { AddAddictionForm } from "./AddAddictionForm";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

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
        <div className="flex gap-2">
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
            <Button size="lg" className="px-6 py-5 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
              <PlusCircle className="h-5 w-5 mr-2" />
              Add New Record
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-2xl">Add New Record</DialogTitle>
              <DialogDescription className="text-base">
                Track a new addiction or dependency for your recovery journey. We're here to support you every step of the way.
              </DialogDescription>
            </DialogHeader>
            <AddAddictionForm
              onSuccess={() => {
                setAddDialogOpen(false);
                onSuccess();
              }}
              onCancel={() => setAddDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </CardHeader>
  );
};
