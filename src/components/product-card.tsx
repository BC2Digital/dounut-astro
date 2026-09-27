import { useState } from "react";
import { formatBRL, getProdutoImagem } from "../use-cases/utils";
import type { Produto } from "../use-cases/contracts/Produto";

export const ProductCard = ({
  produto,
  bg = "bg-background3",
}: {
  produto: Produto;
  bg?: string;
}) => {
  const [imgOk, setImgOk] = useState(true);

  return (
    <a
      href={`/shop/${produto.slug}`}
      title={produto.nome}
      className={`relative flex flex-col ${bg} rounded-3xl p-5 w-full`}
    >
      <div className="flex justify-between items-start mb-3">
        <span className="text-sm bg-white shadow-sm text-text px-3 py-1 rounded-xl">
          {produto.tag || "Artesanal"}
        </span>
        <span className="text-sm text-text">
          {formatBRL(produto.preco)}
        </span>
      </div>

      <div className="relative aspect-[4/5] w-[calc(100%+2.5rem)] -mx-5 mb-4">
        {imgOk ? (
          <img
            src={getProdutoImagem(produto)}
            alt={produto.nome}
            loading="lazy"
            onError={() => setImgOk(false)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-text/50 text-sm text-center p-4">
            {produto.nome}
          </div>
        )}
      </div>

      <h2 className="text-lg font-bold text-text text-center line-clamp-2">
        {produto.nome}
      </h2>
    </a>
  );
};
