
export interface NutritionGoals {
  daily_water_ml: number;
  daily_calories: number;
  daily_sugar_grams: number;
  daily_protein_grams: number;
  daily_fat_grams: number;
  daily_carbs_grams: number;
  weight_kg: number | null;
  height_cm: number | null;
  age: number | null;
  gender: "male" | "female" | "other" | null;
  activity_level: "sedentary" | "light" | "moderate" | "very_active" | "extra_active" | null;
}

export interface NutritionLog {
  water_ml: number;
  calories: number;
  sugar_grams: number;
  fat_grams: number;
  protein_grams: number;
  carbs_grams: number;
  meals: any[];
  notes: string;
}
