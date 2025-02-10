
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control } from "react-hook-form";

interface WellnessMetricsProps {
  control: Control<any>;
}

const WellnessMetrics = ({ control }: WellnessMetricsProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="anxiety_level"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Anxiety Level</FormLabel>
            <FormControl>
              <div className="space-y-2">
                <Slider
                  value={[field.value]}
                  onValueChange={(value) => field.onChange(value[0])}
                  max={10}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>
            </FormControl>
            <FormDescription>Rate your anxiety level from 0 to 10</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="stress_level"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Stress Level</FormLabel>
            <FormControl>
              <div className="space-y-2">
                <Slider
                  value={[field.value]}
                  onValueChange={(value) => field.onChange(value[0])}
                  max={10}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>
            </FormControl>
            <FormDescription>Rate your stress level from 0 to 10</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="sleep_quality"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sleep Quality</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select sleep quality" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="excellent">Excellent</SelectItem>
                <SelectItem value="good">Good</SelectItem>
                <SelectItem value="fair">Fair</SelectItem>
                <SelectItem value="poor">Poor</SelectItem>
                <SelectItem value="very_poor">Very Poor</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default WellnessMetrics;
