/*
  # Sign Language Recognition Session Storage

  ## Overview
  This migration creates the database schema for storing user sessions and recognition history
  for the sign language recognition application.

  ## New Tables
  
  ### `recognition_sessions`
  Stores each user session with metadata
  - `id` (uuid, primary key) - Unique session identifier
  - `created_at` (timestamptz) - When the session was created
  - `total_gestures` (integer) - Number of gestures recognized in this session
  - `session_duration` (integer) - Duration in seconds
  - `user_agent` (text) - Browser information for analytics
  
  ### `recognized_gestures`
  Stores individual gesture recognitions
  - `id` (uuid, primary key) - Unique gesture record identifier
  - `session_id` (uuid, foreign key) - Reference to recognition_sessions
  - `gesture` (text) - The recognized letter/gesture (A-Z, Space, Delete)
  - `confidence` (numeric) - Confidence score (0-1)
  - `timestamp` (timestamptz) - When the gesture was recognized
  
  ### `user_preferences`
  Stores user settings and preferences
  - `id` (uuid, primary key) - Unique preference identifier
  - `browser_id` (text) - Browser fingerprint for identification
  - `confidence_threshold` (numeric) - User's preferred confidence threshold
  - `show_landmarks` (boolean) - Whether to show hand landmarks overlay
  - `text_size` (text) - Text output size preference
  - `created_at` (timestamptz) - When preferences were created
  - `updated_at` (timestamptz) - Last update time

  ## Security
  - Enable RLS on all tables
  - Public access for anonymous usage (no authentication required)
  - Future: Can add authenticated user policies if auth is implemented
*/

-- Create recognition_sessions table
CREATE TABLE IF NOT EXISTS recognition_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now() NOT NULL,
  total_gestures integer DEFAULT 0 NOT NULL,
  session_duration integer DEFAULT 0 NOT NULL,
  user_agent text DEFAULT '' NOT NULL
);

-- Create recognized_gestures table
CREATE TABLE IF NOT EXISTS recognized_gestures (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES recognition_sessions(id) ON DELETE CASCADE NOT NULL,
  gesture text NOT NULL,
  confidence numeric(3,2) NOT NULL,
  timestamp timestamptz DEFAULT now() NOT NULL
);

-- Create user_preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  browser_id text UNIQUE NOT NULL,
  confidence_threshold numeric(3,2) DEFAULT 0.85 NOT NULL,
  show_landmarks boolean DEFAULT true NOT NULL,
  text_size text DEFAULT 'medium' NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_recognized_gestures_session_id 
  ON recognized_gestures(session_id);

CREATE INDEX IF NOT EXISTS idx_recognized_gestures_timestamp 
  ON recognized_gestures(timestamp);

CREATE INDEX IF NOT EXISTS idx_user_preferences_browser_id 
  ON user_preferences(browser_id);

-- Enable Row Level Security
ALTER TABLE recognition_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE recognized_gestures ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (no authentication required)
-- Anyone can insert new sessions
CREATE POLICY "Allow public insert on sessions"
  ON recognition_sessions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Anyone can read sessions (for analytics/history)
CREATE POLICY "Allow public read on sessions"
  ON recognition_sessions
  FOR SELECT
  TO anon
  USING (true);

-- Anyone can insert gestures
CREATE POLICY "Allow public insert on gestures"
  ON recognized_gestures
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Anyone can read gestures from their session
CREATE POLICY "Allow public read on gestures"
  ON recognized_gestures
  FOR SELECT
  TO anon
  USING (true);

-- Anyone can insert/update their preferences
CREATE POLICY "Allow public insert on preferences"
  ON user_preferences
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public read on preferences"
  ON user_preferences
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public update on preferences"
  ON user_preferences
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);