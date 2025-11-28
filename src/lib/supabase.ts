import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface RecognitionSession {
  id?: string;
  created_at?: string;
  total_gestures: number;
  session_duration: number;
  user_agent: string;
}

export interface RecognizedGesture {
  id?: string;
  session_id: string;
  gesture: string;
  confidence: number;
  timestamp?: string;
}

export interface UserPreferences {
  id?: string;
  browser_id: string;
  confidence_threshold: number;
  show_landmarks: boolean;
  text_size: 'small' | 'medium' | 'large';
  created_at?: string;
  updated_at?: string;
}
