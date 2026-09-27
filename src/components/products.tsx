import { ProductCard } from "./product-card";
import type { Produto } from "../use-cases/contracts/Produto";

export const Products = ({ produtos }: { produtos: Produto[] }) => {
  return (
    <div className="mt-20">
      <p className="text-lg font-semibold mb-10">Nossos produtos</p>
      <div className="flex flex-wrap gap-5">
        {produtos?.map((produto) => (
          <ProductCard produto={produto} key={produto.id} />
        ))}
      </div>
    </div>
  );
};
