
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { InfoIcon } from "lucide-react";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { AddictionType } from "@/types/addiction";

interface AddictionTypeSelectProps {
  control: Control<any>;
  selectedType: AddictionType | undefined;
}

export const AddictionTypeSelect = ({ control, selectedType }: AddictionTypeSelectProps) => {
  const { data: addictionTypes, isLoading } = useQuery({
    queryKey: ['addiction-types'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('addiction_types')
        .select('*')
        .order('name');

      if (error) throw error;
      return data as AddictionType[];
    },
  });

  if (isLoading) return null;

  return (
    <>
      <FormField
        control={control}
        name="addiction_type_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Type of Addiction</FormLabel>
            <FormDescription>
              Select the type of addiction you want to track. This helps us provide relevant support and resources.
            </FormDescription>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select addiction type" />
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
        <Alert className="bg-primary/5 border-primary/20">
          <InfoIcon className="h-4 w-4 text-primary" />
          <AlertTitle className="text-primary">About {selectedType.name}</AlertTitle>
          <AlertDescription className="mt-2">
            <p className="text-muted-foreground">{selectedType.description}</p>
            {selectedType.common_triggers && selectedType.common_triggers.length > 0 && (
              <div className="mt-4">
                <p className="font-medium text-sm text-foreground">Common triggers:</p>
                <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground">
                  {selectedType.common_triggers.map((trigger, index) => (
                    <li key={index}>{trigger}</li>
                  ))}
                </ul>
              </div>
            )}
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};
