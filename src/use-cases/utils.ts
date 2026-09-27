export function formatBRL(value: number) {
  return (value ?? 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function getProdutoImagem(produto: {
  imagens?: string[];
  foto_url?: string | null;
}) {
  return produto.imagens?.[0] || produto.foto_url || "/placeholder-produto.png";
}
