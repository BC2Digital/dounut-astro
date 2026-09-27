import { ProductCard } from "./product-card";
import type { Produto } from "../use-cases/contracts/Produto";

export const Products = ({
  produtos,
  verMaisHref,
  eyebrow,
  titulo = "Nossos produtos",
  verMaisLabel = "Ver mais",
  align = "center",
}: {
  produtos: Produto[];
  verMaisHref?: string;
  eyebrow?: string;
  titulo?: string;
  verMaisLabel?: string;
  align?: "left" | "center";
}) => {
  const isCenter = align === "center";
  return (
    <div id="produtos" className="scroll-mt-10">
      <div className={`${isCenter ? "text-center mb-4" : "text-left mb-4"}`}>
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-text/60 mb-2">
            {eyebrow}
          </p>
        )}
        <h2 className={isCenter ? "text-3xl lg:text-4xl font-bold text-text" : "text-2xl lg:text-3xl font-bold text-text"}>
          {titulo}
        </h2>
      </div>

      {produtos?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {produtos.map((produto) => (
            <ProductCard produto={produto} key={produto.id} />
          ))}
        </div>
      ) : (
        <p className="text-center text-text/60">
          Nenhum produto disponível no momento.
        </p>
      )}

      {verMaisHref && (
        <div className="text-center mt-4">
          <a
            href={verMaisHref}
            className="inline-block border-2 border-text/20 text-text px-8 py-3 rounded-full font-semibold hover:bg-white/50 transition"
          >
            {verMaisLabel}
          </a>
        </div>
      )}
    </div>
  );
};
