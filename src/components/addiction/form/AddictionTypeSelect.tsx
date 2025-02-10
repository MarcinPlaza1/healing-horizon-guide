
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { InfoIcon, ListChecks } from "lucide-react";
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
    <div className="space-y-3 animate-fade-in">
      <FormField
        control={control}
        name="addiction_type_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium text-foreground/90">Type of Addiction</FormLabel>
            <FormDescription className="text-xs text-muted-foreground/70">
              Select the type of addiction you want to track
            </FormDescription>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger 
                  className="transition-all duration-200 hover:border-primary/50 bg-white/50 backdrop-blur-sm border-primary/20"
                >
                  <ListChecks className="h-4 w-4 mr-2 text-primary/70" />
                  <SelectValue placeholder="Choose type..." />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="max-h-[200px] bg-white/95 backdrop-blur-sm border-primary/20">
                {addictionTypes?.map((type) => (
                  <SelectItem 
                    key={type.id} 
                    value={type.id}
                    className="transition-colors duration-200 hover:bg-primary/5 focus:bg-primary/5 cursor-pointer"
                  >
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />

      {selectedType && addictionTypes?.find(t => t.id === selectedType.id) && (
        <Alert className="bg-primary/5 border-primary/10 animate-fade-in py-2.5">
          <InfoIcon className="h-4 w-4 text-primary/70" />
          <AlertTitle className="text-sm font-medium text-primary/90 mb-1">
            About {addictionTypes.find(t => t.id === selectedType.id)?.name}
          </AlertTitle>
          <AlertDescription className="text-xs space-y-2">
            <p className="text-muted-foreground/80 leading-relaxed">
              {addictionTypes.find(t => t.id === selectedType.id)?.description}
            </p>
            {addictionTypes.find(t => t.id === selectedType.id)?.common_triggers && 
             addictionTypes.find(t => t.id === selectedType.id)?.common_triggers?.length! > 0 && (
              <div>
                <p className="font-medium text-xs text-foreground/80 mb-1">Common triggers:</p>
                <ul className="list-disc list-inside space-y-0.5">
                  {addictionTypes.find(t => t.id === selectedType.id)?.common_triggers?.map((trigger, index) => (
                    <li key={index} className="text-xs text-muted-foreground/70 transition-colors duration-200 hover:text-foreground/80">
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

