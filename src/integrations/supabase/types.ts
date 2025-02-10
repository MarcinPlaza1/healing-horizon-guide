export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      activity_notes: {
        Row: {
          addiction_id: string
          content: string
          coping_strategies: string[] | null
          created_at: string
          id: string
          mood: string | null
          note_date: string
          triggers: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          addiction_id: string
          content: string
          coping_strategies?: string[] | null
          created_at?: string
          id?: string
          mood?: string | null
          note_date?: string
          triggers?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          addiction_id?: string
          content?: string
          coping_strategies?: string[] | null
          created_at?: string
          id?: string
          mood?: string | null
          note_date?: string
          triggers?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "activity_notes_addiction_id_fkey"
            columns: ["addiction_id"]
            isOneToOne: false
            referencedRelation: "addictions"
            referencedColumns: ["id"]
          },
        ]
      }
      addiction_activity_logs: {
        Row: {
          activity_date: string
          addiction_id: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          activity_date: string
          addiction_id: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          activity_date?: string
          addiction_id?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "addiction_activity_logs_addiction_id_fkey"
            columns: ["addiction_id"]
            isOneToOne: false
            referencedRelation: "addictions"
            referencedColumns: ["id"]
          },
        ]
      }
      addiction_types: {
        Row: {
          category: Database["public"]["Enums"]["addiction_category"]
          common_triggers: string[] | null
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          category: Database["public"]["Enums"]["addiction_category"]
          common_triggers?: string[] | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          category?: Database["public"]["Enums"]["addiction_category"]
          common_triggers?: string[] | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      addictions: {
        Row: {
          addiction_type_id: string | null
          clean_since: string | null
          created_at: string
          goals: Json | null
          id: string
          last_relapse_date: string | null
          name: string
          notes: string | null
          start_date: string
          status: string
          triggers: string[] | null
          type: Database["public"]["Enums"]["addiction_type"]
          user_id: string
        }
        Insert: {
          addiction_type_id?: string | null
          clean_since?: string | null
          created_at?: string
          goals?: Json | null
          id?: string
          last_relapse_date?: string | null
          name: string
          notes?: string | null
          start_date: string
          status?: string
          triggers?: string[] | null
          type: Database["public"]["Enums"]["addiction_type"]
          user_id: string
        }
        Update: {
          addiction_type_id?: string | null
          clean_since?: string | null
          created_at?: string
          goals?: Json | null
          id?: string
          last_relapse_date?: string | null
          name?: string
          notes?: string | null
          start_date?: string
          status?: string
          triggers?: string[] | null
          type?: Database["public"]["Enums"]["addiction_type"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "addictions_addiction_type_id_fkey"
            columns: ["addiction_type_id"]
            isOneToOne: false
            referencedRelation: "addiction_types"
            referencedColumns: ["id"]
          },
        ]
      }
      analytics_summaries: {
        Row: {
          created_at: string
          id: string
          milestone_counts: Json | null
          mood_trends: Json | null
          recovery_stats: Json | null
          streak_data: Json | null
          summary_date: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          milestone_counts?: Json | null
          mood_trends?: Json | null
          recovery_stats?: Json | null
          streak_data?: Json | null
          summary_date?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          milestone_counts?: Json | null
          mood_trends?: Json | null
          recovery_stats?: Json | null
          streak_data?: Json | null
          summary_date?: string
          user_id?: string
        }
        Relationships: []
      }
      daily_checkins: {
        Row: {
          anxiety_level: number | null
          coping_strategies: string | null
          created_at: string
          id: string
          mood: string
          notes: string | null
          sleep_quality: string | null
          stress_level: number | null
          triggers: string | null
          user_id: string
        }
        Insert: {
          anxiety_level?: number | null
          coping_strategies?: string | null
          created_at?: string
          id?: string
          mood: string
          notes?: string | null
          sleep_quality?: string | null
          stress_level?: number | null
          triggers?: string | null
          user_id: string
        }
        Update: {
          anxiety_level?: number | null
          coping_strategies?: string | null
          created_at?: string
          id?: string
          mood?: string
          notes?: string | null
          sleep_quality?: string | null
          stress_level?: number | null
          triggers?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "daily_checkins_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      dopamine_detox_achievements: {
        Row: {
          achieved_at: string
          achievement_type:
            | Database["public"]["Enums"]["achievement_type"]
            | null
          badge_type: string | null
          challenge_id: string | null
          created_at: string
          description: string | null
          id: string
          level: number | null
          points: number | null
          title: string
          user_id: string
        }
        Insert: {
          achieved_at?: string
          achievement_type?:
            | Database["public"]["Enums"]["achievement_type"]
            | null
          badge_type?: string | null
          challenge_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          level?: number | null
          points?: number | null
          title: string
          user_id: string
        }
        Update: {
          achieved_at?: string
          achievement_type?:
            | Database["public"]["Enums"]["achievement_type"]
            | null
          badge_type?: string | null
          challenge_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          level?: number | null
          points?: number | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "dopamine_detox_achievements_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "dopamine_detox_challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      dopamine_detox_challenges: {
        Row: {
          best_streak: number | null
          challenge_type: Database["public"]["Enums"]["dopamine_challenge_type"]
          created_at: string
          current_streak: number | null
          daily_goals: Json | null
          description: string | null
          difficulty_level: string | null
          duration_days: number | null
          end_date: string | null
          id: string
          name: string
          progress: number | null
          start_date: string | null
          status: string | null
          target_reduction_hours: number | null
          user_id: string
        }
        Insert: {
          best_streak?: number | null
          challenge_type: Database["public"]["Enums"]["dopamine_challenge_type"]
          created_at?: string
          current_streak?: number | null
          daily_goals?: Json | null
          description?: string | null
          difficulty_level?: string | null
          duration_days?: number | null
          end_date?: string | null
          id?: string
          name: string
          progress?: number | null
          start_date?: string | null
          status?: string | null
          target_reduction_hours?: number | null
          user_id: string
        }
        Update: {
          best_streak?: number | null
          challenge_type?: Database["public"]["Enums"]["dopamine_challenge_type"]
          created_at?: string
          current_streak?: number | null
          daily_goals?: Json | null
          description?: string | null
          difficulty_level?: string | null
          duration_days?: number | null
          end_date?: string | null
          id?: string
          name?: string
          progress?: number | null
          start_date?: string | null
          status?: string | null
          target_reduction_hours?: number | null
          user_id?: string
        }
        Relationships: []
      }
      dopamine_detox_logs: {
        Row: {
          activity_date: string | null
          challenge_id: string | null
          completed_tasks: string[] | null
          created_at: string
          digital_wellness_score: number | null
          focus_challenges: string[] | null
          focus_score: number | null
          id: string
          improvement_areas: string[] | null
          mood_rating: string | null
          notes: string | null
          screen_time_minutes: number | null
          success_factors: string[] | null
          triggers: string[] | null
          user_id: string
        }
        Insert: {
          activity_date?: string | null
          challenge_id?: string | null
          completed_tasks?: string[] | null
          created_at?: string
          digital_wellness_score?: number | null
          focus_challenges?: string[] | null
          focus_score?: number | null
          id?: string
          improvement_areas?: string[] | null
          mood_rating?: string | null
          notes?: string | null
          screen_time_minutes?: number | null
          success_factors?: string[] | null
          triggers?: string[] | null
          user_id: string
        }
        Update: {
          activity_date?: string | null
          challenge_id?: string | null
          completed_tasks?: string[] | null
          created_at?: string
          digital_wellness_score?: number | null
          focus_challenges?: string[] | null
          focus_score?: number | null
          id?: string
          improvement_areas?: string[] | null
          mood_rating?: string | null
          notes?: string | null
          screen_time_minutes?: number | null
          success_factors?: string[] | null
          triggers?: string[] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "dopamine_detox_logs_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "dopamine_detox_challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      health_summaries: {
        Row: {
          created_at: string
          id: string
          journal_entries: number | null
          mood_average: string | null
          summary_date: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          journal_entries?: number | null
          mood_average?: string | null
          summary_date?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          journal_entries?: number | null
          mood_average?: string | null
          summary_date?: string
          user_id?: string
        }
        Relationships: []
      }
      inspirational_quotes: {
        Row: {
          author: string | null
          category: string | null
          created_at: string
          id: string
          quote: string
        }
        Insert: {
          author?: string | null
          category?: string | null
          created_at?: string
          id?: string
          quote: string
        }
        Update: {
          author?: string | null
          category?: string | null
          created_at?: string
          id?: string
          quote?: string
        }
        Relationships: []
      }
      mindfulness_activities: {
        Row: {
          activity_type: string
          completed_at: string | null
          created_at: string
          duration: number
          id: string
          mood_after: string | null
          mood_before: string | null
          notes: string | null
          user_id: string
        }
        Insert: {
          activity_type: string
          completed_at?: string | null
          created_at?: string
          duration: number
          id?: string
          mood_after?: string | null
          mood_before?: string | null
          notes?: string | null
          user_id: string
        }
        Update: {
          activity_type?: string
          completed_at?: string | null
          created_at?: string
          duration?: number
          id?: string
          mood_after?: string | null
          mood_before?: string | null
          notes?: string | null
          user_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          link: string | null
          message: string
          read: boolean | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          link?: string | null
          message: string
          read?: boolean | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          link?: string | null
          message?: string
          read?: boolean | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      nutrition_goals: {
        Row: {
          activity_level: string | null
          age: number | null
          created_at: string
          daily_calories: number | null
          daily_carbs_grams: number | null
          daily_fat_grams: number | null
          daily_protein_grams: number | null
          daily_sugar_grams: number | null
          daily_water_ml: number | null
          gender: string | null
          height_cm: number | null
          id: string
          updated_at: string
          user_id: string
          weight_kg: number | null
        }
        Insert: {
          activity_level?: string | null
          age?: number | null
          created_at?: string
          daily_calories?: number | null
          daily_carbs_grams?: number | null
          daily_fat_grams?: number | null
          daily_protein_grams?: number | null
          daily_sugar_grams?: number | null
          daily_water_ml?: number | null
          gender?: string | null
          height_cm?: number | null
          id?: string
          updated_at?: string
          user_id: string
          weight_kg?: number | null
        }
        Update: {
          activity_level?: string | null
          age?: number | null
          created_at?: string
          daily_calories?: number | null
          daily_carbs_grams?: number | null
          daily_fat_grams?: number | null
          daily_protein_grams?: number | null
          daily_sugar_grams?: number | null
          daily_water_ml?: number | null
          gender?: string | null
          height_cm?: number | null
          id?: string
          updated_at?: string
          user_id?: string
          weight_kg?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "nutrition_goals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      nutrition_logs: {
        Row: {
          calories: number | null
          carbs_grams: number | null
          created_at: string
          fat_grams: number | null
          id: string
          log_date: string
          meals: Json | null
          notes: string | null
          protein_grams: number | null
          sugar_grams: number | null
          updated_at: string
          user_id: string
          water_ml: number | null
        }
        Insert: {
          calories?: number | null
          carbs_grams?: number | null
          created_at?: string
          fat_grams?: number | null
          id?: string
          log_date?: string
          meals?: Json | null
          notes?: string | null
          protein_grams?: number | null
          sugar_grams?: number | null
          updated_at?: string
          user_id: string
          water_ml?: number | null
        }
        Update: {
          calories?: number | null
          carbs_grams?: number | null
          created_at?: string
          fat_grams?: number | null
          id?: string
          log_date?: string
          meals?: Json | null
          notes?: string | null
          protein_grams?: number | null
          sugar_grams?: number | null
          updated_at?: string
          user_id?: string
          water_ml?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "nutrition_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          dashboard_preferences: Json | null
          full_name: string | null
          id: string
          last_check_in: string | null
          longest_streak: number | null
          preferences: Json | null
          privacy_settings: Json | null
          recovery_start_date: string | null
          social_links: Json | null
          streak_count: number | null
          username: string | null
          website: string | null
          weekly_mood_counts: Json | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          dashboard_preferences?: Json | null
          full_name?: string | null
          id: string
          last_check_in?: string | null
          longest_streak?: number | null
          preferences?: Json | null
          privacy_settings?: Json | null
          recovery_start_date?: string | null
          social_links?: Json | null
          streak_count?: number | null
          username?: string | null
          website?: string | null
          weekly_mood_counts?: Json | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          dashboard_preferences?: Json | null
          full_name?: string | null
          id?: string
          last_check_in?: string | null
          longest_streak?: number | null
          preferences?: Json | null
          privacy_settings?: Json | null
          recovery_start_date?: string | null
          social_links?: Json | null
          streak_count?: number | null
          username?: string | null
          website?: string | null
          weekly_mood_counts?: Json | null
        }
        Relationships: []
      }
      recovery_milestones: {
        Row: {
          addiction_id: string
          created_at: string
          days_clean: number
          description: string | null
          id: string
          milestone_date: string
          milestone_type: string
          user_id: string
        }
        Insert: {
          addiction_id: string
          created_at?: string
          days_clean: number
          description?: string | null
          id?: string
          milestone_date?: string
          milestone_type: string
          user_id: string
        }
        Update: {
          addiction_id?: string
          created_at?: string
          days_clean?: number
          description?: string | null
          id?: string
          milestone_date?: string
          milestone_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recovery_milestones_addiction_id_fkey"
            columns: ["addiction_id"]
            isOneToOne: false
            referencedRelation: "addictions"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_daily_needs: {
        Args: {
          weight_kg: number
          height_cm: number
          age: number
          gender: string
          activity_level: string
        }
        Returns: {
          daily_calories: number
          daily_protein_grams: number
          daily_fat_grams: number
          daily_carbs_grams: number
        }[]
      }
      clean_old_notifications: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      achievement_type:
        | "streak_milestone"
        | "challenge_completed"
        | "daily_goals_streak"
        | "reduced_screen_time"
        | "mindful_usage"
      addiction_category: "substance" | "behavioral"
      addiction_type: "substance" | "behavioral"
      dopamine_challenge_type:
        | "social_media_break"
        | "digital_sunset"
        | "morning_routine"
        | "mindful_browsing"
        | "app_limits"
        | "notification_detox"
        | "device_free_meals"
        | "reading_time"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
