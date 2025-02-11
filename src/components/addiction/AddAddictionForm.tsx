
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">
        <div className="space-y-4 min-h-[300px] overflow-y-auto pr-2">
          <AddictionTypeSelect 
            control={form.control}
            selectedType={selectedType}
          />
          
          <StartDatePicker control={form.control} />
          
          <NotesField control={form.control} />
        </div>

        <div className="flex gap-3 pt-6 mt-auto sticky bottom-0 bg-background">
          <Button 
            type="submit" 
            className="flex-1 bg-primary hover:bg-primary/90 text-white font-medium py-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Starting Journey...
              </>
            ) : (
              <>
                <Rocket className="mr-2 h-5 w-5" />
                Start Recovery Journey
              </>
            )}
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            disabled={isSubmitting}
            className="border-primary/20 hover:bg-primary/5 py-6"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};
