
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import LastCheckin from "./daily-checkin/LastCheckin";
import MoodSelection from "./daily-checkin/MoodSelection";
import WellnessMetrics from "./daily-checkin/WellnessMetrics";
import OptionalNotes from "./daily-checkin/OptionalNotes";

const formSchema = z.object({
  mood: z.enum(["great", "good", "okay", "difficult", "struggling"]),
  anxiety_level: z.number().min(0).max(10),
  stress_level: z.number().min(0).max(10),
  sleep_quality: z.enum(["excellent", "good", "fair", "poor", "very_poor"]),
  triggers: z.string().optional(),
  coping_strategies: z.string().optional(),
  notes: z.string().optional(),
});

const DailyCheckin = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: lastCheckin } = useQuery({
    queryKey: ["lastCheckin"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data } = await supabase
        .from("daily_checkins")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      return data;
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mood: "okay",
      anxiety_level: 5,
      stress_level: 5,
      sleep_quality: "fair",
      triggers: "",
      coping_strategies: "",
      notes: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not found");

      const { error } = await supabase.from("daily_checkins").insert({
        user_id: user.id,
        mood: values.mood,
        anxiety_level: values.anxiety_level,
        stress_level: values.stress_level,
        sleep_quality: values.sleep_quality,
        triggers: values.triggers,
        coping_strategies: values.coping_strategies,
        notes: values.notes,
      });

      if (error) throw error;

      toast({
        title: "Check-in recorded",
        description: "Your daily check-in has been saved successfully.",
      });

      form.reset();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMoodEmoji = (mood: string) => {
    const emojis: Record<string, string> = {
      great: "🌟",
      good: "😊",
      okay: "😐",
      difficult: "😔",
      struggling: "😢",
    };
    return emojis[mood] || "😐";
  };

  return (
    <div className="space-y-6">
      {lastCheckin && (
        <LastCheckin lastCheckin={lastCheckin} getMoodEmoji={getMoodEmoji} />
      )}

      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Heart className="h-5 w-5 text-primary" />
            How are you feeling today?
          </CardTitle>
          <CardDescription>
            Take a moment to reflect on your mental and emotional state
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <MoodSelection control={form.control} getMoodEmoji={getMoodEmoji} />
              
              <div className="space-y-4">
                <WellnessMetrics control={form.control} />
              </div>

              <Separator className="my-6" />

              <OptionalNotes control={form.control} />

              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Check-in"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyCheckin;
