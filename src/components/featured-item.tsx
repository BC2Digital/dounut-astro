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
    <a href={`/shop/${produto.slug}`} className="relative block lg:pt-16 lg:pb-12">
      <div className="bg-background1 rounded-3xl p-8 lg:p-10 lg:w-1/2 lg:min-h-[360px] flex flex-col justify-center gap-3">
        <h2
          className="text-2xl lg:text-3xl font-bold text-text line-clamp-2"
          title={produto.nome}
        >
          {produto.nome}
        </h2>
        <p className="text-xl text-text">
          {formatBRL(produto.preco)}
        </p>
        <div className="flex gap-2 flex-wrap mt-1">
          {novo && (
            <span className="text-sm bg-badge text-text px-3 py-1 rounded-full">
              Novo
            </span>
          )}
          {produto.tag && (
            <span className="text-sm bg-badge text-text px-3 py-1 rounded-full">
              {produto.tag}
            </span>
          )}
        </div>
      </div>

      <div className="flex justify-center mt-6 lg:mt-0 lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:right-0 z-10">
        {imgOk ? (
          <img
            src={getProdutoImagemDestaque(produto)}
            alt={produto.nome}
            onError={() => setImgOk(false)}
            className="w-full max-w-[420px] h-auto lg:max-w-[720px] object-contain"
          />
        ) : (
          <div className="w-full max-w-[420px] lg:max-w-[720px] aspect-square flex items-center justify-center text-text/50 text-center p-6">
            {produto.nome}
          </div>
        )}
      </div>
    </a>
  );
};
