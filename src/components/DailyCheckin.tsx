import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card as CardPrimitive,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";

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
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle>Last Check-in</CardTitle>
            <CardDescription>
              {new Date(lastCheckin.created_at).toLocaleDateString()} at{" "}
              {new Date(lastCheckin.created_at).toLocaleTimeString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{getMoodEmoji(lastCheckin.mood)}</span>
              <span className="capitalize">{lastCheckin.mood}</span>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="p-6">
        <CardHeader>
          <CardTitle>Daily Check-in</CardTitle>
          <CardDescription>
            Take a moment to reflect on how you're feeling today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="mood"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How are you feeling today?</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your mood" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="great">Great {getMoodEmoji("great")}</SelectItem>
                        <SelectItem value="good">Good {getMoodEmoji("good")}</SelectItem>
                        <SelectItem value="okay">Okay {getMoodEmoji("okay")}</SelectItem>
                        <SelectItem value="difficult">Difficult {getMoodEmoji("difficult")}</SelectItem>
                        <SelectItem value="struggling">Struggling {getMoodEmoji("struggling")}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="anxiety_level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Anxiety Level</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <Slider
                            value={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                            max={10}
                            step={1}
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Low</span>
                            <span>High</span>
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription>Rate your anxiety level from 0 to 10</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="stress_level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stress Level</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <Slider
                            value={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                            max={10}
                            step={1}
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Low</span>
                            <span>High</span>
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription>Rate your stress level from 0 to 10</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sleep_quality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sleep Quality</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select sleep quality" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                          <SelectItem value="poor">Poor</SelectItem>
                          <SelectItem value="very_poor">Very Poor</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator className="my-4" />

              <FormField
                control={form.control}
                name="triggers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Any triggers today? (optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe any triggers or challenges..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="coping_strategies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Coping Strategies Used (optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="What strategies helped you cope today?"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional notes (optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add any additional thoughts..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isSubmitting}>
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
