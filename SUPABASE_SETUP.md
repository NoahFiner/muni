# Supabase Setup Instructions

## 1. Create the Quiz Responses Table

Run this SQL in your Supabase SQL Editor:

```sql
-- Create the quiz_responses table for comprehensive analytics
CREATE TABLE quiz_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  personality_result TEXT NOT NULL,
  responses JSONB NOT NULL,
  completion_time_seconds REAL NOT NULL,
  times_submitted INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries on personality results
CREATE INDEX idx_quiz_responses_personality ON quiz_responses(personality_result);
CREATE INDEX idx_quiz_responses_created_at ON quiz_responses(created_at);
CREATE INDEX idx_quiz_responses_user_id ON quiz_responses(user_id);

-- Add unique constraint to prevent duplicate submissions from same user at same submission count
ALTER TABLE quiz_responses
ADD CONSTRAINT unique_user_submission
UNIQUE (user_id, times_submitted);

-- If you already have the table with INTEGER completion_time_seconds, run this to update:
-- ALTER TABLE quiz_responses ALTER COLUMN completion_time_seconds TYPE REAL;

-- If you already have the table without times_submitted column, run this to add it:
-- ALTER TABLE quiz_responses ADD COLUMN times_submitted INTEGER NOT NULL DEFAULT 1;

-- If you already have the table without user_id column, run this to add it:
-- ALTER TABLE quiz_responses ADD COLUMN user_id TEXT NOT NULL DEFAULT 'legacy-user';
-- CREATE INDEX idx_quiz_responses_user_id ON quiz_responses(user_id);

-- If you need to update from the old uniqueness constraint, run this:
-- ALTER TABLE quiz_responses DROP CONSTRAINT IF EXISTS unique_quiz_session;
-- ALTER TABLE quiz_responses ADD CONSTRAINT unique_user_submission UNIQUE (user_id, times_submitted);

-- Function to calculate personality percentage efficiently (first-time submissions only)
CREATE OR REPLACE FUNCTION get_personality_percentage(
  p_personality_result TEXT
) RETURNS REAL AS $$
DECLARE
  total_count INTEGER;
  personality_count INTEGER;
  percentage REAL;
BEGIN
  -- Get total count of first-time submissions only
  SELECT COUNT(*) INTO total_count
  FROM quiz_responses
  WHERE times_submitted = 1;

  -- Get count for specific personality type (first-time submissions only)
  SELECT COUNT(*) INTO personality_count
  FROM quiz_responses
  WHERE personality_result = p_personality_result
    AND times_submitted = 1;

  -- Calculate percentage
  IF total_count > 0 THEN
    percentage := (personality_count::REAL / total_count::REAL) * 100.0;
  ELSE
    percentage := 0.0;
  END IF;

  RETURN percentage;
END;
$$ LANGUAGE plpgsql;

-- Optimistic version of the function for faster UI updates (first-time submissions only)
CREATE OR REPLACE FUNCTION get_personality_percentage_optimistic(
  p_personality_result TEXT
) RETURNS REAL AS $$
DECLARE
  total_count INTEGER;
  personality_count INTEGER;
  percentage REAL;
BEGIN
  -- Get total count of first-time submissions only
  SELECT COUNT(*) INTO total_count
  FROM quiz_responses
  WHERE times_submitted = 1;

  -- Get count for specific personality type (first-time submissions only)
  SELECT COUNT(*) INTO personality_count
  FROM quiz_responses
  WHERE personality_result = p_personality_result
    AND times_submitted = 1;

  -- Calculate percentage
  IF total_count > 0 THEN
    percentage := ((personality_count::REAL + 1.0) / (total_count::REAL + 1.0)) * 100.0;
  ELSE
    percentage := 0.0;
  END IF;

  RETURN percentage;
END;
$$ LANGUAGE plpgsql;
```

## 2. Set up Row Level Security (RLS)

```sql
-- Enable RLS on quiz_responses table
ALTER TABLE quiz_responses ENABLE ROW LEVEL SECURITY;

-- Allow public read access for calculating percentages
CREATE POLICY "Allow public read access" ON quiz_responses
FOR SELECT USING (true);

-- Allow public insert for submitting quiz results
CREATE POLICY "Allow public insert" ON quiz_responses
FOR INSERT WITH CHECK (true);
```

## 3. Sample Analytics Queries

Here are some useful queries for analyzing your quiz data:

```sql
-- Get personality type distribution
SELECT personality_result, COUNT(*) as count,
       ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 1) as percentage
FROM quiz_responses
GROUP BY personality_result
ORDER BY count DESC;

-- Analyze response distribution for a specific question
SELECT
  (jsonb_array_elements(responses)->>'response') as response,
  COUNT(*) as count
FROM quiz_responses,
     jsonb_array_elements(responses)
WHERE (jsonb_array_elements(responses)->>'question')::int = 1
GROUP BY response
ORDER BY count DESC;

-- Average completion time by personality type (with millisecond precision)
SELECT personality_result,
       ROUND(AVG(completion_time_seconds), 2) as avg_seconds,
       COUNT(*) as total_responses
FROM quiz_responses
GROUP BY personality_result
ORDER BY avg_seconds;

-- Test the percentage calculation function
SELECT get_personality_percentage('INTJ') as intj_percentage;

-- Get percentages for all personality types efficiently
SELECT personality_result,
       get_personality_percentage(personality_result) as percentage
FROM (SELECT DISTINCT personality_result FROM quiz_responses) AS types
ORDER BY percentage DESC;

-- Get personality distribution for first-time submissions only
SELECT personality_result, COUNT(*) as count,
       ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 1) as percentage
FROM quiz_responses
WHERE times_submitted = 1
GROUP BY personality_result
ORDER BY count DESC;

-- Analyze submission frequency patterns
SELECT times_submitted, COUNT(*) as count,
       ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 1) as percentage
FROM quiz_responses
GROUP BY times_submitted
ORDER BY times_submitted;
```

## 4. Environment Variables

Update your `.env.local` file with your Supabase credentials:

```
VITE_SUPABASE_URL=your_actual_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_actual_supabase_anon_key
```

You can find these values in your Supabase project dashboard under Settings > API.
