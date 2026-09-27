import { useEffect, useState } from "react";
import { supabase } from "../use-cases/shared";
import { formatBRL } from "../use-cases/utils";

export const Order = () => {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (!id) {
      setLoading(false);
      return;
    }
    supabase
      .from("pedidos")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data }) => {
        setOrder(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="mt-20 text-center text-text">Carregando…</p>;
  }

  if (!order) {
    return (
      <p className="mt-20 text-center text-text">Pedido não encontrado.</p>
    );
  }

  return (
    <div className="lg:w-auth lg:p-20 bg-background3 mx-auto mt-20 text-text w-full p-10">
      <h1 className="font-bold text-3xl mb-6">Pedido confirmado</h1>
      <p className="mb-5">Recebemos seu pedido #{order.id}.</p>
      <div>
        {order.itens?.map((item: any, index: number) => (
          <div key={index} className="flex justify-between mb-4">
            <div>
              <p>
                {item.produto_nome} x {item.quantidade ?? 1}
              </p>
              {item.personalizacao?.length > 0 && (
                <ul className="mt-1 text-sm text-text/70">
                  {item.personalizacao.map((p: any, i: number) => (
                    <li key={i}>
                      {p.coluna}: {p.escolhas.join(", ")}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <p>{formatBRL((item.preco ?? 0) * (item.quantidade ?? 1))}</p>
          </div>
        ))}
        <div className="flex flex-col gap-3 border-t-2 pt-5">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>{formatBRL(order.subtotal)}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-bold">Total</p>
            <p>{formatBRL(order.total)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
