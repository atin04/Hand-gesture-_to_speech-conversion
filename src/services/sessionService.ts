import { supabase, RecognitionSession, UserPreferences } from '../lib/supabase';
import { getBrowserFingerprint } from '../utils/browserFingerprint';

export class SessionService {
  private currentSessionId: string | null = null;
  private sessionStartTime: number = 0;
  private gestureCount: number = 0;

  async startSession(): Promise<void> {
    this.sessionStartTime = Date.now();
    this.gestureCount = 0;

    const { data, error } = await supabase
      .from('recognition_sessions')
      .insert({
        total_gestures: 0,
        session_duration: 0,
        user_agent: navigator.userAgent
      })
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error creating session:', error);
      return;
    }

    if (data) {
      this.currentSessionId = data.id;
    }
  }

  async recordGesture(gesture: string, confidence: number): Promise<void> {
    if (!this.currentSessionId) return;

    this.gestureCount++;

    const { error } = await supabase
      .from('recognized_gestures')
      .insert({
        session_id: this.currentSessionId,
        gesture,
        confidence
      });

    if (error) {
      console.error('Error recording gesture:', error);
    }
  }

  async endSession(): Promise<void> {
    if (!this.currentSessionId) return;

    const sessionDuration = Math.floor((Date.now() - this.sessionStartTime) / 1000);

    const { error } = await supabase
      .from('recognition_sessions')
      .update({
        total_gestures: this.gestureCount,
        session_duration: sessionDuration
      })
      .eq('id', this.currentSessionId);

    if (error) {
      console.error('Error updating session:', error);
    }

    this.currentSessionId = null;
  }

  async loadPreferences(): Promise<UserPreferences> {
    const browserId = getBrowserFingerprint();

    const { data, error } = await supabase
      .from('user_preferences')
      .select()
      .eq('browser_id', browserId)
      .maybeSingle();

    if (error || !data) {
      const defaultPreferences: UserPreferences = {
        browser_id: browserId,
        confidence_threshold: 0.85,
        show_landmarks: true,
        text_size: 'medium'
      };

      await this.savePreferences(defaultPreferences);
      return defaultPreferences;
    }

    return data as UserPreferences;
  }

  async savePreferences(preferences: UserPreferences): Promise<void> {
    const { error } = await supabase
      .from('user_preferences')
      .upsert({
        ...preferences,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'browser_id'
      });

    if (error) {
      console.error('Error saving preferences:', error);
    }
  }

  async getSessionHistory(limit: number = 10): Promise<RecognitionSession[]> {
    const { data, error } = await supabase
      .from('recognition_sessions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching session history:', error);
      return [];
    }

    return data as RecognitionSession[];
  }
}
