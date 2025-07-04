import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Database types
export type Database = {
  public: {
    Tables: {
      quiz_responses: {
        Row: {
          id: string;
          user_id: string;
          personality_result: string;
          responses: Array<{ question: number; response: string }>;
          completion_time_seconds: number;
          times_submitted: number;
          created_at: string;
        };
        Insert: {
          user_id: string;
          personality_result: string;
          responses: Array<{ question: number; response: string }>;
          completion_time_seconds: number;
          times_submitted: number;
          id?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          personality_result?: string;
          responses?: Array<{ question: number; response: string }>;
          completion_time_seconds?: number;
          times_submitted?: number;
          created_at?: string;
        };
      };
    };
    Functions: {
      get_personality_percentage: {
        Args: {
          p_personality_result: string;
        };
        Returns: number;
      };
      get_personality_percentage_optimistic: {
        Args: {
          p_personality_result: string;
        };
        Returns: number;
      };
    };
  };
};

export type QuizResponse =
  Database["public"]["Tables"]["quiz_responses"]["Row"];
export type QuizResponseInsert =
  Database["public"]["Tables"]["quiz_responses"]["Insert"];
