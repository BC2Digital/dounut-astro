import { formatBRL, getProdutoImagem } from "../use-cases/utils";
import type { Produto } from "../use-cases/contracts/Produto";

export const ProductCard = ({ produto }: { produto: Produto }) => {
  return (
    <a
      href={`/shop/${produto.slug}`}
      className="flex flex-col lg:bg-primary rounded-xl lg:h-96 p-5 lg:w-[300px] bg-background2 w-full"
    >
      <div>
        <div className="flex justify-between items-start">
          {produto.tag && (
            <span className="text-sm bg-grey px-3 py-1 rounded-xl">
              {produto.tag}
            </span>
          )}
          <p className="self-end">{formatBRL(produto.preco)}</p>
        </div>
        <img
          src={getProdutoImagem(produto)}
          alt={produto.nome}
          loading="lazy"
          className="mx-auto object-cover rounded-md aspect-square w-full max-w-[220px]"
        />
        <h2 className="text-2xl font-bold text-center m-auto w-40">
          {produto.nome}
        </h2>
      </div>
    </a>
  );
};
