
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
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

const formSchema = z.object({
  mood: z.enum(["great", "good", "okay", "difficult", "struggling"]),
  triggers: z.string().optional(),
  notes: z.string().optional(),
});

const DailyCheckin = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mood: "okay",
      triggers: "",
      notes: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      const { error } = await supabase.from("daily_checkins").insert({
        mood: values.mood,
        triggers: values.triggers,
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

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Daily Check-in</h2>
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
                    <SelectItem value="great">Great</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="okay">Okay</SelectItem>
                    <SelectItem value="difficult">Difficult</SelectItem>
                    <SelectItem value="struggling">Struggling</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

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

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Check-in"}
          </Button>
        </form>
      </Form>
    </Card>
  );
};

export default DailyCheckin;
