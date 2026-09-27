import { supabase, isSupabaseConfigured } from "../shared";
import type { Produto } from "../contracts/Produto";

export async function fetchFrontPage(limit = 24): Promise<{ produtos: Produto[] }> {
  if (!isSupabaseConfigured) return { produtos: [] };

  const { data, error } = await supabase
    .from("produtos")
    .select("*")
    .eq("ativo", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("fetchFrontPage:", error.message);
    return { produtos: [] };
  }
  return { produtos: data ?? [] };
}
