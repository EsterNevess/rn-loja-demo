// Catálogo de produtos do app e funções de apoio.
// Os dados são fixos: o app é uma demonstração e não tem servidor.

export const PRODUTOS = [
  {
    id: '1',
    nome: 'Mochila Urbana',
    descricao: 'Mochila resistente à água, com compartimento acolchoado para notebook.',
    preco: 189.9,
  },
  {
    id: '2',
    nome: 'Garrafa Térmica',
    descricao: 'Mantém a bebida gelada por 24 horas ou quente por 12 horas.',
    preco: 79.5,
  },
  {
    id: '3',
    nome: 'Fone Bluetooth',
    descricao: 'Fone sem fio com cancelamento de ruído e até 30 horas de bateria.',
    preco: 249.0,
  },
  {
    id: '4',
    nome: 'Caderno Pautado',
    descricao: 'Capa dura, 96 folhas com pauta, ideal para anotações do dia a dia.',
    preco: 24.9,
  },
  {
    id: '5',
    nome: 'Luminária de Mesa',
    descricao: 'Luz LED com três níveis de brilho e braço ajustável.',
    preco: 119.9,
  },
  {
    id: '6',
    nome: 'Suporte para Notebook',
    descricao: 'Estrutura de alumínio dobrável, com ajuste de altura em cinco posições.',
    preco: 99.0,
  },
];

/** Procura um produto pelo id. Devolve undefined se não existir. */
export function buscarProduto(id) {
  return PRODUTOS.find((produto) => produto.id === String(id));
}

/**
 * Formata um valor em reais, no padrão brasileiro: 1234.5 -> "R$ 1.234,50".
 * Feito à mão, sem Intl, porque o suporte a Intl varia entre motores de JS
 * em celulares e um preço exibido errado é um defeito difícil de notar.
 */
export function formatarPreco(valor) {
  const [inteiro, centavos] = Number(valor).toFixed(2).split('.');
  const comMilhar = inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `R$ ${comMilhar},${centavos}`;
}

/** Soma o preço dos produtos cujos ids estão na lista (um id repetido conta de novo). */
export function calcularTotal(idsNoCarrinho) {
  return idsNoCarrinho.reduce((soma, id) => {
    const produto = buscarProduto(id);
    return produto ? soma + produto.preco : soma;
  }, 0);
}
