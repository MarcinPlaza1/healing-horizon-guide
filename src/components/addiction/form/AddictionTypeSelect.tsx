
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
import { AddictionFormValues } from "./FormSchema";

interface AddictionTypeSelectProps {
  control: Control<AddictionFormValues>;
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
    <div className="space-y-4 animate-fade-in">
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
                <SelectTrigger className="transition-all duration-200 hover:border-primary/50">
                  <SelectValue placeholder="Select addiction type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="max-h-[300px]">
                {addictionTypes?.map((type) => (
                  <SelectItem 
                    key={type.id} 
                    value={type.id}
                    className="transition-colors duration-200 hover:bg-primary/5"
                  >
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {selectedType && addictionTypes?.find(t => t.id === selectedType.id) && (
        <Alert className="bg-primary/5 border-primary/20 animate-fade-in">
          <InfoIcon className="h-4 w-4 text-primary" />
          <AlertTitle className="text-primary">
            About {addictionTypes.find(t => t.id === selectedType.id)?.name}
          </AlertTitle>
          <AlertDescription className="mt-2">
            <p className="text-muted-foreground">
              {addictionTypes.find(t => t.id === selectedType.id)?.description}
            </p>
            {addictionTypes.find(t => t.id === selectedType.id)?.common_triggers && 
             addictionTypes.find(t => t.id === selectedType.id)?.common_triggers?.length! > 0 && (
              <div className="mt-4">
                <p className="font-medium text-sm text-foreground">Common triggers:</p>
                <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground">
                  {addictionTypes.find(t => t.id === selectedType.id)?.common_triggers?.map((trigger, index) => (
                    <li key={index} className="transition-colors duration-200 hover:text-foreground">
                      {trigger}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
