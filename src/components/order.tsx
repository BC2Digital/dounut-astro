import { formatBRL } from "../use-cases/utils";

export const Order = ({ order }: { order: any }) => {
  return (
    <div className="lg:w-auth lg:p-20 bg-background3 mx-auto mt-20 text-text w-full p-10">
      <h1 className="font-bold text-3xl mb-6">Pedido confirmado</h1>
      <p className="mb-5">Recebemos seu pedido #{order.id}.</p>
      <div>
        {order.itens?.map((item: any, index: number) => (
          <div key={index} className="flex justify-between mb-4">
            <p>
              {item.produto_nome} x {item.quantidade ?? 1}
            </p>
            <p>{formatBRL(item.preco ?? 0)}</p>
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
