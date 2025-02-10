
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { AddictionType } from "@/types/addiction";
import { AddictionTypeSelect } from "./form/AddictionTypeSelect";
import { StartDatePicker } from "./form/StartDatePicker";
import { NotesField } from "./form/NotesField";
import { addictionFormSchema, AddictionFormValues } from "./form/FormSchema";
import { useState } from "react";

interface AddAddictionFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const AddAddictionForm = ({ onSuccess, onCancel }: AddAddictionFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<AddictionFormValues>({
    resolver: zodResolver(addictionFormSchema),
    defaultValues: {
      addiction_type_id: "",
      start_date: new Date(),
      notes: "",
      status: "active" as const,
    },
  });

  const selectedTypeId = form.watch('addiction_type_id');
  const selectedType = form.getValues()?.addiction_type_id ? 
    { id: selectedTypeId } as AddictionType : 
    undefined;

  const onSubmit = async (values: AddictionFormValues) => {
    try {
      setIsSubmitting(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("You must be logged in to add an addiction record");
      }

      const { data: typeData, error: typeError } = await supabase
        .from('addiction_types')
        .select('*')
        .eq('id', values.addiction_type_id)
        .single();

      if (typeError) throw typeError;
      if (!typeData) throw new Error("Selected addiction type not found");

      const { error } = await supabase
        .from('addictions')
        .insert([{
          name: typeData.name,
          type: typeData.category,
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
    } finally {
      setIsSubmitting(false);
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

        <div className="flex gap-3 pt-2 animate-fade-in">
          <Button 
            type="submit" 
            className="flex-1 transition-all duration-300 hover:scale-102"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding Record...
              </>
            ) : (
              "Start Recovery Journey"
            )}
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            disabled={isSubmitting}
            className="transition-all duration-200 hover:bg-destructive/5"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};
