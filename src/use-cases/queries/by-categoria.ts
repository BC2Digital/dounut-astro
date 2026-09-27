import { supabase, isSupabaseConfigured } from "../shared";
import type { Produto } from "../contracts/Produto";

// Busca produtos ativos de uma categoria (pelo campo "aba" da tabela
// categorias, ex: "bento-cakes", "bolos-artisticos").
export async function fetchByCategoriaAba(
  aba: string,
  limit = 8
): Promise<{ produtos: Produto[] }> {
  if (!isSupabaseConfigured) return { produtos: [] };

  const { data: categorias, error: catError } = await supabase
    .from("categorias")
    .select("id")
    .eq("aba", aba);

  if (catError || !categorias?.length) {
    if (catError) console.error("fetchByCategoriaAba (categorias):", catError.message);
    return { produtos: [] };
  }

  const categoriaIds = categorias.map((c) => c.id);

  const { data, error } = await supabase
    .from("produtos")
    .select("*")
    .eq("ativo", true)
    .in("categoria_id", categoriaIds)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("fetchByCategoriaAba (produtos):", error.message);
    return { produtos: [] };
  }
  return { produtos: data ?? [] };
}
