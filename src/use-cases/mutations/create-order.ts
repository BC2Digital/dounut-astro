import { supabase } from "../shared";

export async function createOrder(payload: {
  cliente_nome: string;
  cliente_email?: string;
  contato_whatsapp?: string;
  tipo_entrega: "retirada" | "delivery";
  subtotal: number;
  total: number;
  itens: any[];
}) {
  const { data, error } = await supabase
    .from("pedidos")
    .insert({
      status: "aguardando_pagamento",
      tipo_entrega: payload.tipo_entrega,
      subtotal: payload.subtotal,
      total: payload.total,
      cliente_nome: payload.cliente_nome,
      cliente_email: payload.cliente_email,
      contato_whatsapp: payload.contato_whatsapp,
      itens: payload.itens,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}
