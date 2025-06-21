import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database types
export type Database = {
  public: {
    Tables: {
      personality_stats: {
        Row: {
          personality_type: string
          count: number
        }
        Insert: {
          personality_type: string
          count?: number
        }
        Update: {
          personality_type?: string
          count?: number
        }
      }
    }
  }
}

export type PersonalityStats = Database['public']['Tables']['personality_stats']['Row']