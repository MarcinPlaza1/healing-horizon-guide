
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AddNutritionLogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogAdded: () => void;
}

export const AddNutritionLog = ({ open, onOpenChange, onLogAdded }: AddNutritionLogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const logData = {
        user_id: user.id,
        water_ml: parseInt(formData.get('water') as string) || 0,
        calories: parseInt(formData.get('calories') as string) || 0,
        sugar_grams: parseFloat(formData.get('sugar') as string) || 0,
        fat_grams: parseFloat(formData.get('fat') as string) || 0,
        protein_grams: parseFloat(formData.get('protein') as string) || 0,
        carbs_grams: parseFloat(formData.get('carbs') as string) || 0,
        notes: formData.get('notes') as string,
      };

      const { error } = await supabase
        .from('nutrition_logs')
        .upsert([logData], {
          onConflict: 'user_id,log_date'
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Nutrition log updated successfully",
      });

      onLogAdded();
      onOpenChange(false);
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Nutrition Log</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="water">Water (ml)</Label>
              <Input id="water" name="water" type="number" min="0" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="calories">Calories</Label>
              <Input id="calories" name="calories" type="number" min="0" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sugar">Sugar (g)</Label>
              <Input id="sugar" name="sugar" type="number" min="0" step="0.1" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fat">Fat (g)</Label>
              <Input id="fat" name="fat" type="number" min="0" step="0.1" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="protein">Protein (g)</Label>
              <Input id="protein" name="protein" type="number" min="0" step="0.1" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="carbs">Carbs (g)</Label>
              <Input id="carbs" name="carbs" type="number" min="0" step="0.1" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" name="notes" placeholder="Add any notes about your meals..." />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Log"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
