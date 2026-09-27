import { ProductCard } from "./product-card";
import type { Produto } from "../use-cases/contracts/Produto";

export const ProductRow = ({ produtos }: { produtos: Produto[] }) => {
  if (!produtos?.length) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {produtos.map((produto) => (
        <ProductCard produto={produto} key={produto.id} />
      ))}
    </div>
  );
};
