
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Addiction, Milestone } from "@/types/addiction";
import { AddAddictionForm } from "./addiction/AddAddictionForm";
import { AddMilestoneForm } from "./addiction/AddMilestoneForm";
import { AddictionCard } from "./addiction/AddictionCard";

const AddictionTracker = () => {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [milestoneDialogOpen, setMilestoneDialogOpen] = useState(false);
  const [selectedAddiction, setSelectedAddiction] = useState<Addiction | null>(null);
  const { toast } = useToast();
  
  const { data: addictions, refetch: refetchAddictions } = useQuery({
    queryKey: ['addictions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('addictions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error fetching addictions",
          description: error.message,
        });
        return [];
      }

      return data as Addiction[];
    },
  });

  const { data: milestones, refetch: refetchMilestones } = useQuery({
    queryKey: ['milestones'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('recovery_milestones')
        .select('*')
        .order('milestone_date', { ascending: false });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error fetching milestones",
          description: error.message,
        });
        return [];
      }

      return data as Milestone[];
    },
  });

  const updateAddictionStatus = async (addiction: Addiction, newStatus: string) => {
    try {
      const updates = {
        status: newStatus,
        last_relapse_date: newStatus === 'relapsed' ? new Date().toISOString() : addiction.last_relapse_date,
        clean_since: newStatus === 'relapsed' ? new Date().toISOString() : addiction.clean_since,
      };

      const { error } = await supabase
        .from('addictions')
        .update(updates)
        .eq('id', addiction.id);

      if (error) throw error;

      toast({
        title: "Status Updated",
        description: `Status updated to ${newStatus}`,
      });

      refetchAddictions();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error updating status",
        description: error.message,
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle>Addiction Tracker</CardTitle>
            <CardDescription>Track and manage your recovery journey</CardDescription>
          </div>
          <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="icon">
                <PlusCircle className="h-4 w-4" />
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
                  refetchAddictions();
                }}
                onCancel={() => setAddDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {addictions?.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                No records added yet. Click the + button to add one.
              </div>
            )}
            {addictions?.map((addiction) => (
              <AddictionCard
                key={addiction.id}
                addiction={addiction}
                milestones={milestones?.filter(m => m.addiction_id === addiction.id) || []}
                onUpdateStatus={updateAddictionStatus}
                onAddMilestone={(addiction) => {
                  setSelectedAddiction(addiction);
                  setMilestoneDialogOpen(true);
                }}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Milestone Dialog */}
      <Dialog open={milestoneDialogOpen} onOpenChange={setMilestoneDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Recovery Milestone</DialogTitle>
            <DialogDescription>
              Record a significant achievement in your recovery journey.
            </DialogDescription>
          </DialogHeader>
          {selectedAddiction && (
            <AddMilestoneForm
              addiction={selectedAddiction}
              onSuccess={() => {
                setMilestoneDialogOpen(false);
                refetchMilestones();
              }}
              onCancel={() => setMilestoneDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddictionTracker;
