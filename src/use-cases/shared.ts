import { createClient } from "@supabase/supabase-js";

// Mesmo projeto Supabase ("Hella Teste") usado pelo admin/loja em Nuxt.
// Em produção (Vercel), configurar SUPABASE_URL e SUPABASE_ANON_KEY nas
// Environment Variables do projeto.
const supabaseUrl =
  import.meta.env.SUPABASE_URL || process.env.SUPABASE_URL || "";
const supabaseAnonKey =
  import.meta.env.SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
