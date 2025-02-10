
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Addiction } from "@/types/addiction";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

const CalendarDashboard = () => {
  const [selectedAddiction, setSelectedAddiction] = useState<string>("");
  const [activityDates, setActivityDates] = useState<Date[]>([]);
  const { toast } = useToast();

  // Fetch active addictions
  const { data: addictions } = useQuery({
    queryKey: ['addictions'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from('addictions')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      return data as Addiction[];
    },
  });

  // Fetch activity logs for selected addiction
  useEffect(() => {
    const fetchActivityLogs = async () => {
      if (!selectedAddiction) return;

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('addiction_activity_logs')
        .select('activity_date')
        .eq('addiction_id', selectedAddiction)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching activity logs:', error);
        return;
      }

      setActivityDates(data.map(log => new Date(log.activity_date)));
    };

    fetchActivityLogs();
  }, [selectedAddiction]);

  const handleDateSelect = async (date: Date | undefined) => {
    if (!date || !selectedAddiction) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from('addiction_activity_logs')
        .insert({
          addiction_id: selectedAddiction,
          user_id: user.id,
          activity_date: format(date, 'yyyy-MM-dd'),
        });

      if (error) throw error;

      toast({
        title: "Activity Logged",
        description: "Your activity has been recorded and the counter has been reset.",
      });

      // Refresh the activity dates
      setActivityDates(prev => [...prev, date]);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error logging activity",
        description: error.message,
      });
    }
  };

  const selectedAddictionData = addictions?.find(a => a.id === selectedAddiction);

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <div>
            <h2 className="text-3xl font-bold">Recovery Calendar</h2>
            <p className="text-muted-foreground mt-1">
              Track and monitor your recovery journey
            </p>
          </div>
          <Select
            value={selectedAddiction}
            onValueChange={setSelectedAddiction}
          >
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select an addiction to track" />
            </SelectTrigger>
            <SelectContent>
              {addictions?.map((addiction) => (
                <SelectItem key={addiction.id} value={addiction.id}>
                  {addiction.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedAddictionData ? (
          <Card>
            <CardHeader>
              <CardTitle>Activity Calendar for {selectedAddictionData.name}</CardTitle>
              <CardDescription>
                Started on {format(new Date(selectedAddictionData.start_date), "PPP")}
                {selectedAddictionData.clean_since && (
                  <> • Clean since {format(new Date(selectedAddictionData.clean_since), "PPP")}</>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center p-4">
                <Calendar
                  mode="single"
                  selected={undefined}
                  onSelect={handleDateSelect}
                  disabled={{ before: new Date(selectedAddictionData.start_date) }}
                  modifiers={{
                    activity: activityDates
                  }}
                  modifiersStyles={{
                    activity: {
                      backgroundColor: "hsl(var(--destructive))",
                      color: "white"
                    }
                  }}
                  className="rounded-md border shadow-sm"
                />
              </div>
              <Alert className="mt-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Click on a date to log a relapse. This will reset your clean streak counter.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-muted-foreground">
                <p>Select an addiction to view its calendar and track activities</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CalendarDashboard;
