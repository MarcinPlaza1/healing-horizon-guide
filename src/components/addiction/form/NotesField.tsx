
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { AddictionFormValues } from "./FormSchema";

interface NotesFieldProps {
  control: Control<AddictionFormValues>;
}

export const NotesField = ({ control }: NotesFieldProps) => {
  return (
    <FormField
      control={control}
      name="notes"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Personal Notes</FormLabel>
          <FormDescription>
            Add any personal notes, thoughts, or context about this addiction. This is private and only visible to you.
          </FormDescription>
          <FormControl>
            <Textarea
              placeholder="E.g., What triggers this addiction? What motivates you to recover?"
              className="h-32 resize-none"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
