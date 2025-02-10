
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PhysicalParams {
  weight_kg: number | null;
  height_cm: number | null;
  age: number | null;
  gender: "male" | "female" | "other" | null;
  activity_level: "sedentary" | "light" | "moderate" | "very_active" | "extra_active" | null;
}

interface PhysicalParamsFormProps {
  initialParams: PhysicalParams;
  onParamsUpdated: () => void;
}

export const PhysicalParamsForm = ({ initialParams, onParamsUpdated }: PhysicalParamsFormProps) => {
  const [params, setParams] = useState<PhysicalParams>(initialParams);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from('nutrition_goals')
        .upsert({
          user_id: user.id,
          weight_kg: params.weight_kg,
          height_cm: params.height_cm,
          age: params.age,
          gender: params.gender,
          activity_level: params.activity_level,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your physical parameters have been updated. Nutritional goals will be automatically recalculated.",
      });

      onParamsUpdated();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Physical Parameters</CardTitle>
        <CardDescription>
          Update your physical parameters to automatically calculate your nutritional needs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                min="30"
                max="300"
                value={params.weight_kg || ''}
                onChange={(e) => setParams({ ...params, weight_kg: parseFloat(e.target.value) || null })}
                placeholder="Enter your weight"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                min="100"
                max="250"
                value={params.height_cm || ''}
                onChange={(e) => setParams({ ...params, height_cm: parseInt(e.target.value) || null })}
                placeholder="Enter your height"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                min="13"
                max="120"
                value={params.age || ''}
                onChange={(e) => setParams({ ...params, age: parseInt(e.target.value) || null })}
                placeholder="Enter your age"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={params.gender || undefined}
                onValueChange={(value) => setParams({ ...params, gender: value as PhysicalParams['gender'] })}
              >
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="activity">Activity Level</Label>
              <Select
                value={params.activity_level || undefined}
                onValueChange={(value) => setParams({ ...params, activity_level: value as PhysicalParams['activity_level'] })}
              >
                <SelectTrigger id="activity">
                  <SelectValue placeholder="Select activity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                  <SelectItem value="light">Light (exercise 1-3 times/week)</SelectItem>
                  <SelectItem value="moderate">Moderate (exercise 3-5 times/week)</SelectItem>
                  <SelectItem value="very_active">Very Active (exercise 6-7 times/week)</SelectItem>
                  <SelectItem value="extra_active">Extra Active (very intense exercise daily)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Updating..." : "Update Parameters"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
