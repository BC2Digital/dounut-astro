import { formatBRL, getProdutoImagem } from "../use-cases/utils";
import type { Produto } from "../use-cases/contracts/Produto";
import { useState } from "react";

export const Hero = ({ produto }: { produto?: Produto }) => {
  const [imgOk, setImgOk] = useState(true);

  return (
    <section className="grid lg:grid-cols-2 gap-10 items-center pt-6 lg:pt-16 pb-10">
      <div className="bg-secondary rounded-3xl p-8 lg:p-14 flex flex-col gap-6 order-2 lg:order-1">
        <span className="inline-block w-fit text-xs font-semibold uppercase tracking-widest bg-white/70 text-text px-4 py-2 rounded-full">
          Feito à mão em Londrina
        </span>
        <h1 className="text-4xl lg:text-5xl font-bold text-text leading-tight">
          Bolos e doces artesanais que adoçam seu momento
        </h1>
        <p className="text-text/80 text-lg max-w-md">
          Receitas autorais, ingredientes selecionados e todo o carinho da
          Hella Confeitaria em cada fatia.
        </p>
        <div className="flex flex-wrap gap-4 pt-2">
          <a
            href="#produtos"
            className="bg-text text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition"
          >
            Ver produtos
          </a>
          <a
            href="https://wa.me/5543999999999"
            target="_blank"
            rel="noreferrer"
            className="border-2 border-text/20 text-text px-8 py-3 rounded-full font-semibold hover:bg-white/50 transition"
          >
            Fazer encomenda
          </a>
        </div>
      </div>

      <div className="relative order-1 lg:order-2 flex items-center justify-center">
        <div className="absolute inset-0 bg-background5 rounded-full blur-2xl opacity-60 scale-90" />
        {produto && imgOk ? (
          <a
            href={`/shop/${produto.slug}`}
            className="relative bg-primary rounded-3xl p-6 shadow-xl w-full max-w-sm"
          >
            {produto.tag && (
              <span className="absolute top-4 left-4 z-10 text-xs font-semibold uppercase bg-background5 text-text px-3 py-1 rounded-full">
                {produto.tag}
              </span>
            )}
            <span className="absolute top-4 right-4 z-10 text-sm font-bold bg-white px-3 py-1 rounded-full shadow">
              {formatBRL(produto.preco)}
            </span>
            <img
              src={getProdutoImagem(produto)}
              alt={produto.nome}
              onError={() => setImgOk(false)}
              className="w-full aspect-square object-cover rounded-2xl"
            />
            <p className="text-center font-bold text-xl mt-4 text-text">
              {produto.nome}
            </p>
          </a>
        ) : (
          <div className="relative bg-primary rounded-3xl p-10 shadow-xl w-full max-w-sm aspect-square flex items-center justify-center text-center">
            <p className="text-2xl font-bold text-text">Hella Confeitaria</p>
          </div>
        )}
      </div>
    </section>
  );
};
