import { ProductCard } from "./product-card";
import type { Produto } from "../use-cases/contracts/Produto";

export const Products = ({
  produtos,
  verMaisHref,
}: {
  produtos: Produto[];
  verMaisHref?: string;
}) => {
  return (
    <div id="produtos" className="mt-16 scroll-mt-10">
      <div className="text-center mb-12">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-text/60 mb-2">
          Cardápio
        </p>
        <h2 className="text-3xl lg:text-4xl font-bold text-text">
          Nossos produtos
        </h2>
      </div>

      {produtos?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {produtos.map((produto, index) => (
            <ProductCard produto={produto} index={index} key={produto.id} />
          ))}
        </div>
      ) : (
        <p className="text-center text-text/60">
          Nenhum produto disponível no momento.
        </p>
      )}

      {verMaisHref && (
        <div className="text-center mt-10">
          <a
            href={verMaisHref}
            className="inline-block border-2 border-text/20 text-text px-8 py-3 rounded-full font-semibold hover:bg-white/50 transition"
          >
            Ver mais
          </a>
        </div>
      )}
    </div>
  );
};
