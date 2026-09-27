import { createClient } from "@supabase/supabase-js";

// Mesmo projeto Supabase ("Hella Teste") usado pelo admin/loja em Nuxt.
// Precisa do prefixo PUBLIC_ porque o site é estático e esse client roda
// direto no navegador (checkout, carrinho) além de em build time.
// Configurar PUBLIC_SUPABASE_URL e PUBLIC_SUPABASE_ANON_KEY nas Environment
// Variables do Hostinger.
const supabaseUrl =
  import.meta.env.PUBLIC_SUPABASE_URL ||
  process.env.PUBLIC_SUPABASE_URL ||
  "";
const supabaseAnonKey =
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY ||
  process.env.PUBLIC_SUPABASE_ANON_KEY ||
  "";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// Usa uma URL válida "placeholder" quando as env vars ainda não estão
// configuradas, só pra o client não travar a criação (e o build não
// quebrar). As queries vão simplesmente falhar e retornar vazio até as
// variáveis serem configuradas de verdade.
export const supabase = createClient(
  isSupabaseConfigured ? supabaseUrl : "https://placeholder.supabase.co",
  isSupabaseConfigured ? supabaseAnonKey : "placeholder-anon-key"
);
