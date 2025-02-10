import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, PlusCircle, Trophy } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";

interface Addiction {
  id: string;
  name: string;
  type: 'substance' | 'behavioral';
  start_date: string;
  notes?: string;
  status: 'active' | 'recovered' | 'relapsed';
  triggers?: string[];
  clean_since?: string;
  last_relapse_date?: string;
}

interface Milestone {
  id: string;
  addiction_id: string;
  milestone_type: string;
  description: string;
  milestone_date: string;
  days_clean: number;
}

const AddictionTracker = () => {
  const [open, setOpen] = useState(false);
  const [milestoneOpen, setMilestoneOpen] = useState(false);
  const [selectedAddiction, setSelectedAddiction] = useState<Addiction | null>(null);
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      name: "",
      type: "substance" as const,
      start_date: new Date(),
      notes: "",
      status: "active" as const,
    },
  });

  const milestoneForm = useForm({
    defaultValues: {
      milestone_type: "",
      description: "",
      milestone_date: new Date(),
    },
  });

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

  const onSubmit = async (values: any) => {
    try {
      const { error } = await supabase
        .from('addictions')
        .insert([{
          ...values,
          start_date: values.start_date.toISOString(),
          clean_since: values.start_date.toISOString(),
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Addiction record added successfully.",
      });
      
      setOpen(false);
      form.reset();
      refetchAddictions();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  const onSubmitMilestone = async (values: any) => {
    if (!selectedAddiction) return;

    try {
      const daysClean = Math.floor(
        (new Date(values.milestone_date).getTime() - new Date(selectedAddiction.clean_since!).getTime()) 
        / (1000 * 60 * 60 * 24)
      );

      const { error } = await supabase
        .from('recovery_milestones')
        .insert([{
          ...values,
          milestone_date: values.milestone_date.toISOString(),
          addiction_id: selectedAddiction.id,
          days_clean: daysClean,
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Recovery milestone added successfully.",
      });
      
      setMilestoneOpen(false);
      milestoneForm.reset();
      refetchMilestones();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'recovered':
        return 'bg-green-500/10 text-green-500';
      case 'relapsed':
        return 'bg-red-500/10 text-red-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  const calculateCleanDays = (cleanSince?: string) => {
    if (!cleanSince) return 0;
    const start = new Date(cleanSince);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle>Addiction Tracker</CardTitle>
            <CardDescription>Track and manage your recovery journey</CardDescription>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
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
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="substance">Substance</SelectItem>
                            <SelectItem value="behavioral">Behavioral</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="start_date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Start Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Add any additional notes"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">Add Record</Button>
                </form>
              </Form>
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
              <Card key={addiction.id} className="relative">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="space-y-1">
                      <h4 className="font-medium text-lg">{addiction.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {addiction.type} • Started {format(new Date(addiction.start_date), "PPP")}
                      </p>
                      {addiction.clean_since && (
                        <p className="text-sm text-green-500 font-medium">
                          {calculateCleanDays(addiction.clean_since)} days clean
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className={cn(
                        "px-2.5 py-0.5 rounded-full text-xs font-medium inline-block",
                        getStatusColor(addiction.status)
                      )}>
                        {addiction.status}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateAddictionStatus(addiction, 'recovered')}
                        >
                          Mark Recovered
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedAddiction(addiction);
                            setMilestoneOpen(true);
                          }}
                        >
                          Add Milestone
                        </Button>
                      </div>
                    </div>
                  </div>
                  {addiction.notes && (
                    <p className="text-sm text-muted-foreground mt-2">{addiction.notes}</p>
                  )}
                  
                  {/* Milestones section */}
                  {milestones?.filter(m => m.addiction_id === addiction.id).length > 0 && (
                    <div className="mt-4 border-t pt-4">
                      <h5 className="text-sm font-medium mb-2">Recovery Milestones</h5>
                      <div className="space-y-2">
                        {milestones
                          .filter(m => m.addiction_id === addiction.id)
                          .map((milestone) => (
                            <div key={milestone.id} className="flex items-center gap-2 text-sm">
                              <Trophy className="h-4 w-4 text-yellow-500" />
                              <span className="font-medium">{milestone.milestone_type}</span>
                              <span className="text-muted-foreground">
                                {milestone.days_clean} days • {format(new Date(milestone.milestone_date), "PPP")}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Milestone Dialog */}
      <Dialog open={milestoneOpen} onOpenChange={setMilestoneOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Recovery Milestone</DialogTitle>
            <DialogDescription>
              Record a significant achievement in your recovery journey.
            </DialogDescription>
          </DialogHeader>
          <Form {...milestoneForm}>
            <form onSubmit={milestoneForm.handleSubmit(onSubmitMilestone)} className="space-y-4">
              <FormField
                control={milestoneForm.control}
                name="milestone_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Milestone Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="First Week Clean">First Week Clean</SelectItem>
                        <SelectItem value="One Month Milestone">One Month Milestone</SelectItem>
                        <SelectItem value="Three Months Clean">Three Months Clean</SelectItem>
                        <SelectItem value="Six Months Clean">Six Months Clean</SelectItem>
                        <SelectItem value="One Year Clean">One Year Clean</SelectItem>
                        <SelectItem value="Personal Achievement">Personal Achievement</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={milestoneForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your milestone achievement"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={milestoneForm.control}
                name="milestone_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date Achieved</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Add Milestone</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddictionTracker;
