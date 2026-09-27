import { supabase, isSupabaseConfigured } from "../shared";

export async function fetchAllProductSlugs() {
  if (!isSupabaseConfigured) return [];

  const { data, error } = await supabase
    .from("produtos")
    .select("slug")
    .eq("ativo", true)
    .not("slug", "is", null);

  if (error) {
    console.error("fetchAllProductSlugs:", error.message);
    return [];
  }
  return data ?? [];
}
