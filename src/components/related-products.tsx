import { ProductCard } from "./product-card";
import type { Produto } from "../use-cases/contracts/Produto";

export const RelatedProducts = ({ related }: { related: Produto[] }) => {
  return (
    <div className="flex w-full items-start flex-wrap gap-5">
      {related?.map((produto) => (
        <ProductCard produto={produto} key={produto.id} />
      ))}
    </div>
  );
};
