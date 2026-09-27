import { supabase, isSupabaseConfigured } from "../shared";
import type { Produto } from "../contracts/Produto";

export async function fetchProduct(
  slug: string
): Promise<{ produto: Produto | null; relacionados: Produto[] }> {
  if (!isSupabaseConfigured) return { produto: null, relacionados: [] };

  const { data: produto, error } = await supabase
    .from("produtos")
    .select("*")
    .eq("slug", slug)
    .eq("ativo", true)
    .single();

  if (error || !produto) {
    return { produto: null, relacionados: [] };
  }

  const { data: relacionados } = await supabase
    .from("produtos")
    .select("*")
    .eq("categoria_id", produto.categoria_id)
    .eq("ativo", true)
    .neq("id", produto.id)
    .limit(4);

  return { produto, relacionados: relacionados ?? [] };
}
