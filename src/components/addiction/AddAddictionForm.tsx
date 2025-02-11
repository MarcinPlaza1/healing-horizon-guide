
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader2, Rocket } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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
        title: "Journey Started",
        description: "Your recovery journey has begun. Take it one day at a time.",
        variant: "default",
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
        <div className="space-y-4">
          <AddictionTypeSelect 
            control={form.control}
            selectedType={selectedType}
          />
          
          <StartDatePicker control={form.control} />
          
          <NotesField control={form.control} />
        </div>

        <div className="flex gap-3 pt-2">
          <Button 
            type="submit" 
            className="flex-1 bg-gradient-to-r from-primary/90 to-primary hover:from-primary hover:to-primary/90 transition-all duration-300 hover:scale-[1.02] shadow-md hover:shadow-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Starting Journey...
              </>
            ) : (
              <>
                <Rocket className="mr-2 h-4 w-4" />
                Start Recovery Journey
              </>
            )}
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            disabled={isSubmitting}
            className="transition-all duration-200 hover:bg-destructive/5 border-primary/20"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};
