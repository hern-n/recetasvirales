// supabase.js
import { createClient } from '@supabase/supabase-js';

// Estas variables las defines en tu .env.local o .env
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // o la anon key si solo lectura

export const supabase = createClient(supabaseUrl, supabaseKey);
