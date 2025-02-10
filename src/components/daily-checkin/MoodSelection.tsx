
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control } from "react-hook-form";

interface MoodSelectionProps {
  control: Control<any>;
  getMoodEmoji: (mood: string) => string;
}

const MoodSelection = ({ control, getMoodEmoji }: MoodSelectionProps) => {
  return (
    <FormField
      control={control}
      name="mood"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Current Mood</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your mood" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="great">Great {getMoodEmoji("great")}</SelectItem>
              <SelectItem value="good">Good {getMoodEmoji("good")}</SelectItem>
              <SelectItem value="okay">Okay {getMoodEmoji("okay")}</SelectItem>
              <SelectItem value="difficult">
                Difficult {getMoodEmoji("difficult")}
              </SelectItem>
              <SelectItem value="struggling">
                Struggling {getMoodEmoji("struggling")}
              </SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default MoodSelection;
