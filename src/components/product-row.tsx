import { ProductCard } from "./product-card";
import type { Produto } from "../use-cases/contracts/Produto";

export const ProductRow = ({ produtos }: { produtos: Produto[] }) => {
  if (!produtos?.length) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {produtos.map((produto, index) => (
        <ProductCard produto={produto} index={index} key={produto.id} />
      ))}
    </div>
  );
};
