export interface ColunaPersonalizacaoItem {
  nome: string;
  preco?: number;
  foto?: string;
}

export interface ColunaPersonalizacao {
  id: string;
  nome: string;
  min: number;
  max: number;
  itens: ColunaPersonalizacaoItem[];
  modo?: "selecao" | "quantidade" | "pacote";
  porKg?: boolean;
}

export interface Produto {
  id: string;
  nome: string;
  slug: string;
  descricao: string;
  categoria_id: string | null;
  preco: number;
  tipo_produto: string;
  personalizavel: boolean;
  imagens: string[];
  foto_url?: string | null;
  ativo: boolean;
  tag?: string | null;
  colunas_personalizacao: ColunaPersonalizacao[];
  created_at?: string;
}
