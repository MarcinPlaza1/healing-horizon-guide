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
      [_ in never]: never
    }
    Enums: {
      addiction_category: "substance" | "behavioral"
      addiction_type: "substance" | "behavioral"
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
