import { formatBRL } from "../use-cases/utils";

export const LocalCart = () => {
  const cart =
    typeof window !== "undefined" && localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart") || "[]")
      : [];
  const total = cart?.reduce(
    (amount: number, item: any) => item.preco * item.quantidade + amount,
    0
  );

  return (
    <div className="py-20 text-text lg:w-auth mx-auto w-full">
      <h1 className="text-4xl font-bold mb-10">
        Seu carrinho ({cart.length})
      </h1>
      <div className="flex flex-col gap-5 bg-background1 p-20">
        {cart.map((item: any, index: number) => (
          <div key={index} className="flex justify-between items-center">
            <p className="font-semibold text-xl">
              {item.produto_nome} × {item.quantidade}
            </p>
            <p>{formatBRL(item.preco * item.quantidade)}</p>
          </div>
        ))}
        <div className="flex justify-between items-center border-t-2 border-text pt-4">
          <p className="font-semibold text-xl">Total</p>
          <p>{formatBRL(total)}</p>
        </div>
        <a
          href="/checkout"
          className="bg-text text-primary p-3 mt-10 rounded font-semibold text-center"
        >
          Finalizar pedido
        </a>
      </div>
    </div>
  );
};
