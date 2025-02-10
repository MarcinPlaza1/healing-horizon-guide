
import { useState } from "react";
import { PlusCircle, Trophy, AlertTriangle, CheckCircle, Calendar, Clock, Target, FileText } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";
import { Addiction, Milestone } from "@/types/addiction";
import { AddAddictionForm } from "./addiction/AddAddictionForm";
import { AddictionCard } from "./addiction/AddictionCard";
import { Badge } from "@/components/ui/badge";

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

      return data as Milestone[];
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

  const getStatusCounts = () => {
    if (!addictions) return { active: 0, recovered: 0, relapsed: 0 };
    return addictions.reduce((acc, addiction) => ({
      ...acc,
      [addiction.status]: (acc[addiction.status as keyof typeof acc] || 0) + 1
    }), { active: 0, recovered: 0, relapsed: 0 });
  };

  const getTotalCleanDays = () => {
    if (!addictions) return 0;
    return addictions.reduce((total, addiction) => {
      if (addiction.clean_since) {
        const cleanDays = Math.floor(
          (new Date().getTime() - new Date(addiction.clean_since).getTime()) / (1000 * 60 * 60 * 24)
        );
        return total + cleanDays;
      }
      return total;
    }, 0);
  };

  const statusCounts = getStatusCounts();
  const totalCleanDays = getTotalCleanDays();

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Records</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.active}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently tracking
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recovered</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.recovered}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Success stories
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clean Days</CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCleanDays}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Combined recovery time
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Milestones</CardTitle>
            <Trophy className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{milestones?.length || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Achievements unlocked
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg">
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
                    refetchAddictions();
                  }}
                  onCancel={() => setAddDialogOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
            {addictions?.length === 0 && (
              <div className="md:col-span-1 lg:col-span-2 xl:col-span-2 flex flex-col items-center justify-center text-center py-16 text-muted-foreground">
                <div className="bg-primary/5 p-6 rounded-full mb-6">
                  <PlusCircle className="h-16 w-16 text-primary/50" />
                </div>
                <p className="text-xl font-medium mb-3">No records added yet</p>
                <p className="text-sm mb-6 max-w-md">Start tracking your recovery journey by adding your first record. We're here to support you every step of the way.</p>
                <DialogTrigger asChild>
                  <Button size="lg" onClick={() => setAddDialogOpen(true)}>
                    Add Your First Record
                  </Button>
                </DialogTrigger>
              </div>
            )}
            {addictions?.map((addiction) => (
              <AddictionCard
                key={addiction.id}
                addiction={addiction}
                milestones={milestones?.filter(m => m.addiction_id === addiction.id) || []}
                onUpdateStatus={updateAddictionStatus}
                onDelete={deleteAddiction}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddictionTracker;
