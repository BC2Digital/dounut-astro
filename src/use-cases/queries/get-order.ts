import { supabase } from "../shared";

export async function getOrderById(id: string) {
  const { data, error } = await supabase
    .from("pedidos")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}
