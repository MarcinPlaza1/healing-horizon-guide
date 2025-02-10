
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Addiction, Milestone } from "@/types/addiction";
import { AddictionCard } from "./AddictionCard";

interface AddictionListProps {
  addictions: Addiction[] | undefined;
  milestones: Milestone[] | undefined;
  onUpdateStatus: (addiction: Addiction, newStatus: string) => Promise<void>;
  onDelete: (addiction: Addiction) => Promise<void>;
  setAddDialogOpen: (open: boolean) => void;
}

export const AddictionList = ({ 
  addictions, 
  milestones, 
  onUpdateStatus, 
  onDelete,
  setAddDialogOpen 
}: AddictionListProps) => {
  if (!addictions?.length) {
    return (
      <div className="md:col-span-1 lg:col-span-2 xl:col-span-2 flex flex-col items-center justify-center text-center py-16 text-muted-foreground">
        <div className="bg-primary/5 p-6 rounded-full mb-6">
          <PlusCircle className="h-16 w-16 text-primary/50" />
        </div>
        <p className="text-xl font-medium mb-3">No records added yet</p>
        <p className="text-sm mb-6 max-w-md">
          Start tracking your recovery journey by adding your first record. We're here to support you every step of the way.
        </p>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg" onClick={() => setAddDialogOpen(true)}>
              Add Your First Record
            </Button>
          </DialogTrigger>
        </Dialog>
      </div>
    );
  }

  return (
    <CardContent>
      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
        {addictions.map((addiction) => (
          <AddictionCard
            key={addiction.id}
            addiction={addiction}
            milestones={milestones?.filter(m => m.addiction_id === addiction.id) || []}
            onUpdateStatus={onUpdateStatus}
            onDelete={onDelete}
          />
        ))}
      </div>
    </CardContent>
  );
};
