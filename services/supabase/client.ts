import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if Supabase config is valid
const isValidConfig = supabaseUrl &&
    !supabaseUrl.includes('your_') &&
    supabaseAnonKey &&
    !supabaseAnonKey.includes('your_');

let supabase: SupabaseClient | null = null;

if (isValidConfig) {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };
