
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
import { AddAddictionForm } from "./AddAddictionForm";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface AddictionHeaderProps {
  addDialogOpen: boolean;
  setAddDialogOpen: (open: boolean) => void;
  onSuccess: () => void;
}

export const AddictionHeader = ({ addDialogOpen, setAddDialogOpen, onSuccess }: AddictionHeaderProps) => {
  return (
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
      <div>
        <CardTitle>Recovery Records</CardTitle>
        <CardDescription>Track and manage your recovery journey</CardDescription>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20">
            <Clock className="h-3 w-3 mr-1" />
            Active
          </Badge>
          <Badge variant="outline" className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
            <CheckCircle className="h-3 w-3 mr-1" />
            Recovered
          </Badge>
          <Badge variant="outline" className="bg-red-500/10 text-red-500 hover:bg-red-500/20">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Relapsed
          </Badge>
        </div>
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="px-6">
              <PlusCircle className="h-5 w-5 mr-2" />
              Add Record
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Record</DialogTitle>
              <DialogDescription>
                Track a new addiction or dependency for your recovery journey.
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

