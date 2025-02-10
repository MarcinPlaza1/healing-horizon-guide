
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Addiction } from "@/types/addiction";

interface AddMilestoneFormProps {
  addiction: Addiction;
  onSuccess: () => void;
  onCancel: () => void;
}

export const AddMilestoneForm = ({ addiction, onSuccess, onCancel }: AddMilestoneFormProps) => {
  const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      milestone_type: "",
      description: "",
      milestone_date: new Date(),
    },
  });

  const onSubmit = async (values: any) => {
    try {
      const daysClean = Math.floor(
        (new Date(values.milestone_date).getTime() - new Date(addiction.clean_since!).getTime()) 
        / (1000 * 60 * 60 * 24)
      );

      const { error } = await supabase
        .from('recovery_milestones')
        .insert([{
          ...values,
          milestone_date: values.milestone_date.toISOString(),
          addiction_id: addiction.id,
          days_clean: daysClean,
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Recovery milestone added successfully.",
      });
      
      onSuccess();
      form.reset();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
        <div className="flex gap-2">
          <Button type="submit" className="flex-1">Add Milestone</Button>
          <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        </div>
      </form>
    </Form>
  );
};
