# Supabase Setup Instructions

## 1. Create the Database Table

Run this SQL in your Supabase SQL Editor:

```sql
-- Create the personality_stats table
CREATE TABLE personality_stats (
  personality_type TEXT PRIMARY KEY,
  count INTEGER DEFAULT 0 NOT NULL
);

-- Insert initial data for all 16 MBTI personality types
INSERT INTO personality_stats (personality_type, count) VALUES
('INTJ', 0),
('INTP', 0),
('ENTJ', 0),
('ENTP', 0),
('INFJ', 0),
('INFP', 0),
('ENFJ', 0),
('ENFP', 0),
('ISTJ', 0),
('ISFJ', 0),
('ESTJ', 0),
('ESFJ', 0),
('ISTP', 0),
('ISFP', 0),
('ESTP', 0),
('ESFP', 0);
```

## 2. Create the SQL Function

Run this SQL to create the increment function:

```sql
-- Create function to increment personality count
CREATE OR REPLACE FUNCTION increment_personality_count(personality_type TEXT)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE personality_stats
  SET count = count + 1
  WHERE personality_stats.personality_type = increment_personality_count.personality_type;
END;
$$;
```

## 3. Set up Row Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE personality_stats ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON personality_stats
FOR SELECT USING (true);

-- Allow public insert/update (for incrementing counts)
CREATE POLICY "Allow public increment" ON personality_stats
FOR ALL USING (true);
```

## 4. Environment Variables

Update your `.env.local` file with your Supabase credentials:

```
VITE_SUPABASE_URL=your_actual_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_actual_supabase_anon_key
```

You can find these values in your Supabase project dashboard under Settings > API.
