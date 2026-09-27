import { useState } from "react";

export const CheckoutForm = () => {
  const [state, setState] = useState({
    nome: "",
    email: "",
    whatsapp: "",
    tipoEntrega: "retirada" as "retirada" | "delivery",
  });

  const cart =
    typeof window !== "undefined" && localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart") || "[]")
      : [];

  const total = cart?.reduce(
    (amount: number, item: any) => item.preco * item.quantidade + amount,
    0
  );

  const handleClick = async () => {
    const payload = {
      cliente_nome: state.nome,
      cliente_email: state.email,
      contato_whatsapp: state.whatsapp,
      tipo_entrega: state.tipoEntrega,
      subtotal: total,
      total,
      itens: cart,
    };

    const response = await fetch("/order/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then((res) => res.json());

    if (response?.id) {
      localStorage.removeItem("cart");
      window.location.href = `/order/${response.id}`;
    }
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
          className="w-full bg-text text-primary p-3 mt-10 rounded font-semibold text-center"
          onClick={handleClick}
        >
          Confirmar pedido
        </button>
      </div>
    </div>
  );
};
