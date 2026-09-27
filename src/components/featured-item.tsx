import { useState } from "react";
import { formatBRL, getProdutoImagemDestaque } from "../use-cases/utils";
import type { Produto } from "../use-cases/contracts/Produto";

const isProdutoNovo = (produto: Produto) => {
  if (!produto.created_at) return false;
  const dias = (Date.now() - new Date(produto.created_at).getTime()) / 86400000;
  return dias <= 14;
};

export const FeaturedItem = ({ produto }: { produto: Produto }) => {
  const [imgOk, setImgOk] = useState(true);
  const novo = isProdutoNovo(produto);

  return (
    <a href={`/shop/${produto.slug}`} className="relative block lg:pt-24 lg:pb-20">
      <div className="bg-background1 rounded-3xl p-8 lg:p-10 lg:w-4/5 lg:min-h-[440px] flex flex-col justify-center gap-3">
        <h2
          className="text-2xl lg:text-3xl font-bold text-text line-clamp-2"
          title={produto.nome}
        >
          {produto.nome}
        </h2>
        <p className="text-xl font-semibold text-text">
          {formatBRL(produto.preco)}
        </p>
        <div className="flex gap-2 flex-wrap mt-1">
          {novo && (
            <span className="text-xs font-semibold uppercase bg-black/10 text-text px-3 py-1 rounded-full">
              Novo
            </span>
          )}
          {produto.tag && (
            <span className="text-xs font-semibold uppercase bg-black/10 text-text px-3 py-1 rounded-full">
              {produto.tag}
            </span>
          )}
        </div>
      </div>

      <div className="flex justify-center mt-6 lg:mt-0 lg:absolute lg:inset-y-0 lg:right-0 lg:justify-end z-10">
        {imgOk ? (
          <img
            src={getProdutoImagemDestaque(produto)}
            alt={produto.nome}
            onError={() => setImgOk(false)}
            className="w-full max-w-[420px] h-auto lg:w-auto lg:h-full lg:max-w-none object-contain"
          />
        ) : (
          <div className="w-full max-w-[420px] lg:h-full lg:w-[600px] aspect-square flex items-center justify-center text-text/50 text-center p-6">
            {produto.nome}
          </div>
        )}
      </div>
    </a>
  );
};
