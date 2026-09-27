import { supabase } from "../shared";
import type { Produto } from "../contracts/Produto";

export async function fetchFrontPage(): Promise<{ produtos: Produto[] }> {
  const { data, error } = await supabase
    .from("produtos")
    .select("*")
    .eq("ativo", true)
    .order("created_at", { ascending: false })
    .limit(24);

  if (error) throw error;
  return { produtos: data ?? [] };
}
