export function formatBRL(value: number) {
  return (value ?? 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

// Foto quadrada (pro card do grid). Convenção: imagens[0] = quadrada.
export function getProdutoImagem(produto: {
  imagens?: string[];
  foto_url?: string | null;
}) {
  return produto.imagens?.[0] || produto.foto_url || "/placeholder-produto.png";
}

// Foto de lado/ângulo (pro destaque/hero). Convenção: imagens[1] = de lado.
// Se só existir uma foto cadastrada, cai de volta pra ela mesma.
export function getProdutoImagemDestaque(produto: {
  imagens?: string[];
  foto_url?: string | null;
}) {
  return (
    produto.imagens?.[1] ||
    produto.imagens?.[0] ||
    produto.foto_url ||
    "/placeholder-produto.png"
  );
}
