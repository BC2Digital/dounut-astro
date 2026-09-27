import { useState } from "react";
import { formatBRL, getProdutoImagem } from "../use-cases/utils";
import type { Produto } from "../use-cases/contracts/Produto";

const CARD_BACKGROUNDS = [
  "bg-background2",
  "bg-background3",
  "bg-background4",
  "bg-background5",
];

export const ProductCard = ({
  produto,
  index = 0,
}: {
  produto: Produto;
  index?: number;
}) => {
  const [imgOk, setImgOk] = useState(true);
  const bg = CARD_BACKGROUNDS[index % CARD_BACKGROUNDS.length];

  return (
    <a
      href={`/shop/${produto.slug}`}
      className={`group relative flex flex-col ${bg} rounded-3xl p-5 w-full transition-transform hover:-translate-y-1 hover:shadow-lg`}
    >
      <div className="flex justify-between items-start mb-3">
        <span className="text-xs font-semibold uppercase bg-white/80 text-text px-3 py-1 rounded-full">
          {produto.tag || "Artesanal"}
        </span>
        <span className="text-sm font-bold bg-white px-3 py-1 rounded-full shadow-sm">
          {formatBRL(produto.preco)}
        </span>
      </div>

      <div className="relative aspect-square w-full mb-4 overflow-hidden rounded-2xl bg-white/40">
        {imgOk ? (
          <img
            src={getProdutoImagem(produto)}
            alt={produto.nome}
            loading="lazy"
            onError={() => setImgOk(false)}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-text/50 text-sm text-center p-4">
            {produto.nome}
          </div>
        )}
      </div>

      <h2 className="text-lg font-bold text-text text-center">
        {produto.nome}
      </h2>
    </a>
  );
};
