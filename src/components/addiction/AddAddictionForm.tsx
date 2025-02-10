
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { AddictionType } from "@/types/addiction";
import { AddictionTypeSelect } from "./form/AddictionTypeSelect";
import { StartDatePicker } from "./form/StartDatePicker";
import { NotesField } from "./form/NotesField";

interface AddAddictionFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const AddAddictionForm = ({ onSuccess, onCancel }: AddAddictionFormProps) => {
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      name: "",
      addiction_type_id: "",
      start_date: new Date(),
      notes: "",
      status: "active" as const,
    },
  });

  const selectedType = form.watch('addiction_type_id');

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
          goals: [],
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Record added successfully. You can now start tracking your recovery journey.",
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <AddictionTypeSelect 
          control={form.control}
          selectedType={selectedType}
        />
        
        <StartDatePicker control={form.control} />
        
        <NotesField control={form.control} />

        <div className="flex gap-3 pt-2">
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
