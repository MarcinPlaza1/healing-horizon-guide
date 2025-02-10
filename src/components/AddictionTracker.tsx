
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Addiction } from "@/types/addiction";
import { Card } from "@/components/ui/card";
import { AddictionStats } from "./addiction/AddictionStats";
import { AddictionHeader } from "./addiction/AddictionHeader";
import { AddictionList } from "./addiction/AddictionList";

const AddictionTracker = () => {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const { data: addictions, refetch: refetchAddictions } = useQuery({
    queryKey: ['addictions'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from('addictions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error fetching addictions",
          description: error.message,
        });
        return [];
      }

      return (data || []).map(item => {
        const rawGoals = item.goals as Array<{ title?: string; completed?: boolean; target_date?: string }> || [];
        return {
          ...item,
          goals: rawGoals.map(goal => ({
            title: String(goal?.title || ''),
            completed: Boolean(goal?.completed || false),
            target_date: goal?.target_date ? String(goal.target_date) : undefined
          }))
        } as Addiction;
      });
    },
  });

  const { data: milestones } = useQuery({
    queryKey: ['milestones'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from('recovery_milestones')
        .select('*')
        .eq('user_id', user.id)
        .order('milestone_date', { ascending: false });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error fetching milestones",
          description: error.message,
        });
        return [];
      }

      return data;
    },
  });

  const updateAddictionStatus = async (addiction: Addiction, newStatus: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const updates = {
        status: newStatus,
        last_relapse_date: newStatus === 'relapsed' ? new Date().toISOString() : addiction.last_relapse_date,
        clean_since: newStatus === 'relapsed' ? new Date().toISOString() : 
                    newStatus === 'recovered' ? new Date().toISOString() : 
                    addiction.clean_since,
      };

      const { error } = await supabase
        .from('addictions')
        .update(updates)
        .eq('id', addiction.id)
        .eq('user_id', user.id);

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

  const deleteAddiction = async (addiction: Addiction) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from('addictions')
        .delete()
        .eq('id', addiction.id)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Record Deleted",
        description: "The record has been permanently deleted.",
      });

      refetchAddictions();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error deleting record",
        description: error.message,
      });
    }
  };

  return (
    <div className="space-y-8">
      <AddictionStats addictions={addictions} milestones={milestones} />
      <Card className="shadow-lg">
        <AddictionHeader 
          addDialogOpen={addDialogOpen}
          setAddDialogOpen={setAddDialogOpen}
          onSuccess={refetchAddictions}
        />
        <AddictionList
          addictions={addictions}
          milestones={milestones}
          onUpdateStatus={updateAddictionStatus}
          onDelete={deleteAddiction}
          setAddDialogOpen={setAddDialogOpen}
        />
      </Card>
    </div>
  );
};

export default AddictionTracker;

