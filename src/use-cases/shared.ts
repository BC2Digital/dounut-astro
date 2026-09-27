import { createClient } from "@supabase/supabase-js";

// Mesmo projeto Supabase ("Hella Teste") usado pelo admin/loja em Nuxt.
// Em produção (Hostinger/Vercel), configurar SUPABASE_URL e SUPABASE_ANON_KEY
// nas Environment Variables do projeto.
const supabaseUrl =
  import.meta.env.SUPABASE_URL || process.env.SUPABASE_URL || "";
const supabaseAnonKey =
  import.meta.env.SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// Usa uma URL válida "placeholder" quando as env vars ainda não estão
// configuradas, só pra o client não travar a criação (e o build/deploy não
// quebrar). As queries vão simplesmente falhar e retornar vazio até as
// variáveis serem configuradas de verdade.
export const supabase = createClient(
  isSupabaseConfigured ? supabaseUrl : "https://placeholder.supabase.co",
  isSupabaseConfigured ? supabaseAnonKey : "placeholder-anon-key"
);
