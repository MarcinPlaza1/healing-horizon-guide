
import { format } from "date-fns";
import { CalendarIcon, Lightbulb } from "lucide-react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
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
  FormDescription,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { AddictionType } from "@/types/addiction";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";

interface AddAddictionFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const AddAddictionForm = ({ onSuccess, onCancel }: AddAddictionFormProps) => {
  const { toast } = useToast();
  
  const { data: addictionTypes } = useQuery({
    queryKey: ['addiction-types'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('addiction_types')
        .select('*');

      if (error) throw error;
      return data as AddictionType[];
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
      addiction_type_id: "",
      start_date: new Date(),
      notes: "",
      status: "active" as const,
    },
  });

  const selectedType = addictionTypes?.find(
    (type) => type.id === form.watch('addiction_type_id')
  );

  const onSubmit = async (values: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("You must be logged in to add an addiction record");
      }

      const { error } = await supabase
        .from('addictions')
        .insert([{
          name: selectedType?.name || values.name,
          type: selectedType?.category || 'substance',
          addiction_type_id: values.addiction_type_id,
          start_date: values.start_date.toISOString(),
          clean_since: values.start_date.toISOString(),
          notes: values.notes,
          status: values.status,
          user_id: user.id,
        }]);

      if (error) throw error;

      toast({
        title: "Record Added Successfully",
        description: "Your recovery journey has begun. We're here to support you every step of the way.",
      });
      
      onSuccess();
      form.reset();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error Adding Record",
        description: error.message,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="addiction_type_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Type of Addiction</FormLabel>
              <FormDescription>
                Select the category that best describes your situation
              </FormDescription>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Choose type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {addictionTypes?.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {selectedType && (
          <Alert variant="default" className="bg-primary/5 border-primary/20">
            <Lightbulb className="h-4 w-4 text-primary" />
            <AlertDescription className="text-sm text-muted-foreground">
              <p className="mb-2">{selectedType.description}</p>
              {selectedType.common_triggers && selectedType.common_triggers.length > 0 && (
                <div className="mt-2">
                  <p className="font-medium text-foreground">Common triggers:</p>
                  <ul className="list-disc list-inside mt-1">
                    {selectedType.common_triggers.map((trigger, index) => (
                      <li key={index} className="text-sm">{trigger}</li>
                    ))}
                  </ul>
                </div>
              )}
            </AlertDescription>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="start_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-base">Start Date</FormLabel>
              <FormDescription>
                When did you first notice this behavior?
              </FormDescription>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal h-12",
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
              <FormLabel className="text-base">Initial Notes</FormLabel>
              <FormDescription>
                What motivated you to start this recovery journey?
              </FormDescription>
              <FormControl>
                <Textarea
                  placeholder="Share your thoughts..."
                  className="h-32 resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2 pt-4">
          <Button type="submit" className="flex-1">
            Start Recovery Journey
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};
