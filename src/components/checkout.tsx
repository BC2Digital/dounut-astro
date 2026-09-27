import { useState } from "react";
import { supabase } from "../use-cases/shared";

export const CheckoutForm = () => {
  const [state, setState] = useState({
    nome: "",
    email: "",
    whatsapp: "",
    tipoEntrega: "retirada" as "retirada" | "delivery",
  });
  const [enviando, setEnviando] = useState(false);

  const cart =
    typeof window !== "undefined" && localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart") || "[]")
      : [];

  const total = cart?.reduce(
    (amount: number, item: any) => item.preco * item.quantidade + amount,
    0
  );

  const handleClick = async () => {
    if (!state.nome || !state.email) {
      alert("Preencha nome e e-mail.");
      return;
    }

    setEnviando(true);

    const { data, error } = await supabase
      .from("pedidos")
      .insert({
        status: "aguardando_pagamento",
        tipo_entrega: state.tipoEntrega,
        subtotal: total,
        total,
        cliente_nome: state.nome,
        cliente_email: state.email,
        contato_whatsapp: state.whatsapp,
        itens: cart,
      })
      .select()
      .single();

    setEnviando(false);

    if (error) {
      alert("Erro ao enviar pedido: " + error.message);
      return;
    }

    localStorage.removeItem("cart");
    window.location.href = `/pedido-confirmado?id=${data.id}`;
  };

  return (
    <div className="p-10 mx-auto bg-background1 w-128 mt-20">
      <h1 className="text-text text-3xl font-bold mb-10 text-center">
        Finalizar pedido
      </h1>
      <div className="mx-auto">
        <form className="flex flex-wrap gap-5">
          <input
            type="text"
            placeholder="Nome completo"
            className="w-full p-3 border border-text"
            required
            onChange={(e) => setState({ ...state, nome: e.target.value })}
          />
          <input
            type="email"
            placeholder="E-mail"
            className="w-full p-3 border border-text"
            required
            onChange={(e) => setState({ ...state, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="WhatsApp"
            className="w-full p-3 border border-text"
            onChange={(e) =>
              setState({ ...state, whatsapp: e.target.value })
            }
          />
          <select
            className="w-full p-3 border border-text"
            onChange={(e) =>
              setState({
                ...state,
                tipoEntrega: e.target.value as "retirada" | "delivery",
              })
            }
          >
            <option value="retirada">Retirada</option>
            <option value="delivery">Entrega</option>
          </select>
        </form>
        <button
          className="w-full bg-text text-primary p-3 mt-10 rounded font-semibold text-center disabled:opacity-50"
          onClick={handleClick}
          disabled={enviando}
        >
          {enviando ? "Enviando..." : "Confirmar pedido"}
        </button>
      </div>
    </div>
  );
};
