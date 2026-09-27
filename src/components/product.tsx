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
  const [quantidade, setQuantidade] = useState(1);
  const [selecoes, setSelecoes] = useState<Record<string, string[]>>({});
  const [erro, setErro] = useState<string | null>(null);

  const colunas = produto.colunas_personalizacao || [];

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const toggleItem = (colunaId: string, max: number, itemNome: string) => {
    setErro(null);
    setSelecoes((prev) => {
      const atual = prev[colunaId] || [];
      const jaSelecionado = atual.includes(itemNome);

      if (max === 1) {
        // seleção única: substitui (ou remove se clicar de novo)
        return { ...prev, [colunaId]: jaSelecionado ? [] : [itemNome] };
      }

      if (jaSelecionado) {
        return { ...prev, [colunaId]: atual.filter((n) => n !== itemNome) };
      }
      if (atual.length >= max) {
        setErro(`Você já escolheu o máximo de opções nesse grupo (${max}).`);
        return prev;
      }
      return { ...prev, [colunaId]: [...atual, itemNome] };
    });
  };

  const extraTotal = colunas.reduce((soma, col) => {
    const escolhidos = selecoes[col.id] || [];
    const somaColuna = col.itens
      .filter((item) => escolhidos.includes(item.nome))
      .reduce((s, item) => s + (item.preco || 0), 0);
    return soma + somaColuna;
  }, 0);

  const precoUnitario = Number(produto.preco || 0) + extraTotal;

  const validarSelecoes = () => {
    for (const col of colunas) {
      const escolhidos = selecoes[col.id] || [];
      if (escolhidos.length < col.min) {
        return `Escolha ${col.min === 1 ? "uma opção" : `pelo menos ${col.min} opções`} em "${col.nome}".`;
      }
    }
    return null;
  };

  const addToCart = () => {
    const mensagemErro = validarSelecoes();
    if (mensagemErro) {
      setErro(mensagemErro);
      return;
    }

    const personalizacao = colunas
      .map((col) => ({
        coluna: col.nome,
        escolhas: selecoes[col.id] || [],
      }))
      .filter((c) => c.escolhas.length > 0);

    setButtonText("Adicionando...");
    setCart([
      ...cart,
      {
        produto_id: produto.id,
        produto_nome: produto.nome,
        preco: precoUnitario,
        quantidade,
        imagem: getProdutoImagem(produto),
        ...(personalizacao.length ? { personalizacao } : {}),
      },
    ]);
    setButtonText("Adicionado!");
    setTimeout(() => setButtonText("Adicionar ao carrinho"), 1200);
    setSelecoes({});
    setQuantidade(1);
  };

  return (
    <>
      <div className="flex lg:flex-row gap-8 w-full items-start flex-col">
        <div className="flex flex-col text-text w-full lg:w-[420px]">
          <h1 className="font-extrabold text-4xl lg:text-5xl mb-3">
            {produto.nome}
          </h1>
          <p className="text-text/80">{produto.descricao}</p>
        </div>
        <img
          src={getProdutoImagem(produto)}
          alt={produto.nome}
          className="rounded-2xl mx-auto max-w-[420px] w-full object-cover aspect-square"
        />
      </div>

      {colunas.length > 0 && (
        <div className="lg:w-8/12 w-full mx-auto mt-10 flex flex-col gap-6">
          {colunas.map((col) => {
            const escolhidos = selecoes[col.id] || [];
            return (
              <div key={col.id} className="bg-white rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-bold text-text">{col.nome}</p>
                  <span className="text-xs font-semibold uppercase px-3 py-1 rounded-full bg-background3 text-text">
                    {col.min > 0
                      ? col.max > 1
                        ? `Escolha ${col.min === col.max ? col.min : `${col.min} a ${col.max}`}`
                        : "Obrigatório"
                      : "Opcional"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {col.itens.map((item) => {
                    const ativo = escolhidos.includes(item.nome);
                    return (
                      <button
                        type="button"
                        key={item.nome}
                        onClick={() => toggleItem(col.id, col.max, item.nome)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition ${
                          ativo
                            ? "bg-text text-white border-text"
                            : "bg-transparent text-text border-text/20 hover:border-text/50"
                        }`}
                      >
                        {item.nome}
                        {item.preco ? ` (+${formatBRL(item.preco)})` : ""}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {erro && (
        <p className="lg:w-8/12 w-full mx-auto mt-4 text-center text-red-600 text-sm font-semibold">
          {erro}
        </p>
      )}

      <div className="flex flex-col lg:flex-row gap-4 z-10 justify-between items-center lg:w-5/12 w-full mx-auto bg-white p-5 mt-8 text-text rounded-xl">
        <div>
          <p className="font-semibold text-sm">Preço</p>
          <p className="font-bold text-lg">{formatBRL(precoUnitario)}</p>
        </div>

        <div className="flex items-center gap-3 bg-background1 rounded-full px-2 py-1">
          <button
            type="button"
            className="w-8 h-8 rounded-full bg-white font-bold"
            onClick={() => setQuantidade((q) => Math.max(1, q - 1))}
          >
            −
          </button>
          <span className="font-semibold w-6 text-center">{quantidade}</span>
          <button
            type="button"
            className="w-8 h-8 rounded-full bg-white font-bold"
            onClick={() => setQuantidade((q) => q + 1)}
          >
            +
          </button>
        </div>

        <button
          className="bg-background2 px-6 py-3 rounded-xl font-semibold whitespace-nowrap"
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
