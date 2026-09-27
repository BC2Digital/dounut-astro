import { useState, useEffect } from "react";
import { RelatedProducts } from "./related-products";
import { formatBRL, getProdutoImagem } from "../use-cases/utils";
import type { Produto } from "../use-cases/contracts/Produto";

export const Product = ({
  produto,
  relacionados,
}: {
  produto: Produto;
  relacionados: Produto[];
}) => {
  const [cart, setCart] = useState<any[]>([]);
  const [buttonText, setButtonText] = useState("Adicionar ao carrinho");

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = () => {
    setButtonText("Adicionando...");
    setCart([
      ...cart,
      {
        produto_id: produto.id,
        produto_nome: produto.nome,
        preco: produto.preco,
        quantidade: 1,
        imagem: getProdutoImagem(produto),
      },
    ]);
    setButtonText("Adicionado!");
    setTimeout(() => setButtonText("Adicionar ao carrinho"), 1000);
  };

  return (
    <>
      <div className="flex lg:flex-row gap-2 w-full items-center flex-col">
        <div className="flex flex-col text-text w-[400px]">
          <h1 className="font-extrabold text-5xl mb-3">{produto.nome}</h1>
          <p>{produto.descricao}</p>
        </div>
        <img
          src={getProdutoImagem(produto)}
          alt={produto.nome}
          className="rounded-sm mx-auto max-w-[500px]"
        />
      </div>
      <div className="flex z-10 justify-between lg:w-5/12 w-8/12 mx-auto bg-white p-5 text-text rounded-xl">
        <div>
          <p className="font-semibold text-sm">Preço</p>
          <p className="font-bold text-lg">{formatBRL(produto.preco)}</p>
        </div>
        <button
          className="bg-background2 px-4 rounded-xl"
          onClick={addToCart}
        >
          {buttonText}
        </button>
      </div>
      {relacionados.length > 0 && (
        <>
          <p className="text-text mb-4 font-semibold mt-10">
            Você também pode gostar
          </p>
          <RelatedProducts related={relacionados} />
        </>
      )}
    </>
  );
};
