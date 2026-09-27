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
    <a
      href={`/shop/${produto.slug}`}
      className="grid lg:grid-cols-2 gap-6 items-center"
    >
      <div className="bg-background1 rounded-3xl p-8 lg:p-10 flex flex-col gap-3">
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
            <span className="text-xs font-semibold uppercase bg-white/70 text-text px-3 py-1 rounded-full">
              Novo
            </span>
          )}
          {produto.tag && (
            <span className="text-xs font-semibold uppercase bg-white/70 text-text px-3 py-1 rounded-full">
              {produto.tag}
            </span>
          )}
        </div>
      </div>

      <div className="flex justify-center items-center w-full overflow-hidden">
        {imgOk ? (
          <img
            src={getProdutoImagemDestaque(produto)}
            alt={produto.nome}
            onError={() => setImgOk(false)}
            className="w-full max-w-[420px] h-auto object-contain"
          />
        ) : (
          <div className="w-full max-w-[420px] aspect-square flex items-center justify-center text-text/50 text-center p-6">
            {produto.nome}
          </div>
        )}
      </div>
    </a>
  );
};
