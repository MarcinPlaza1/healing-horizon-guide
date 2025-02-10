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
      daily_checkins: {
        Row: {
          created_at: string
          id: string
          mood: string
          notes: string | null
          triggers: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          mood: string
          notes?: string | null
          triggers?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          mood?: string
          notes?: string | null
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
          full_name: string | null
          id: string
          last_check_in: string | null
          longest_streak: number | null
          mindfulness_settings: Json | null
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
          full_name?: string | null
          id: string
          last_check_in?: string | null
          longest_streak?: number | null
          mindfulness_settings?: Json | null
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
          full_name?: string | null
          id?: string
          last_check_in?: string | null
          longest_streak?: number | null
          mindfulness_settings?: Json | null
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
