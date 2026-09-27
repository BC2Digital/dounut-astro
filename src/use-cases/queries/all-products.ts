import { supabase } from "../shared";

export async function fetchAllProductSlugs() {
  const { data, error } = await supabase
    .from("produtos")
    .select("slug")
    .eq("ativo", true)
    .not("slug", "is", null);

  if (error) throw error;
  return data ?? [];
}
