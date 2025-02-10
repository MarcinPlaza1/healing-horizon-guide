
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";

interface OptionalNotesProps {
  control: Control<any>;
}

const OptionalNotes = ({ control }: OptionalNotesProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="triggers"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Any triggers today? (optional)</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe any triggers or challenges..."
                className="min-h-[80px] resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="coping_strategies"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Coping Strategies Used (optional)</FormLabel>
            <FormControl>
              <Textarea
                placeholder="What strategies helped you cope today?"
                className="min-h-[80px] resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Additional notes (optional)</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Add any additional thoughts..."
                className="min-h-[80px] resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default OptionalNotes;
