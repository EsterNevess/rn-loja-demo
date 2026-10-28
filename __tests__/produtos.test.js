import { PRODUTOS, buscarProduto, calcularTotal, formatarPreco } from '../src/produtos';

describe('formatarPreco', () => {
  test.each([
    [0, 'R$ 0,00'],
    [24.9, 'R$ 24,90'],
    [189.9, 'R$ 189,90'],
    [1000, 'R$ 1.000,00'],
    [1234.5, 'R$ 1.234,50'],
    [1234567.89, 'R$ 1.234.567,89'],
  ])('formata %p como %p', (valor, esperado) => {
    expect(formatarPreco(valor)).toBe(esperado);
  });

  test('arredonda para duas casas', () => {
    expect(formatarPreco(10.005)).toMatch(/^R\$ 10,0[01]$/);
  });
});

describe('buscarProduto', () => {
  test('encontra um produto existente', () => {
    expect(buscarProduto('1').nome).toBe('Mochila Urbana');
  });

  test('aceita o id como número', () => {
    expect(buscarProduto(2).nome).toBe('Garrafa Térmica');
  });

  test('devolve undefined para um id que não existe', () => {
    expect(buscarProduto('999')).toBeUndefined();
  });

  test('devolve undefined quando o id não é informado', () => {
    expect(buscarProduto(undefined)).toBeUndefined();
  });
});

describe('catálogo', () => {
  test('tem seis produtos', () => {
    expect(PRODUTOS).toHaveLength(6);
  });

  test('os ids são únicos', () => {
    const ids = PRODUTOS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test('todo produto tem nome, descrição e preço positivo', () => {
    for (const produto of PRODUTOS) {
      expect(produto.nome.trim()).not.toBe('');
      expect(produto.descricao.trim()).not.toBe('');
      expect(produto.preco).toBeGreaterThan(0);
    }
  });
});

describe('calcularTotal', () => {
  test('carrinho vazio custa zero', () => {
    expect(calcularTotal([])).toBe(0);
  });

  test('soma os preços dos produtos', () => {
    expect(calcularTotal(['1', '4'])).toBeCloseTo(189.9 + 24.9, 2);
  });

  test('um produto repetido conta mais de uma vez', () => {
    expect(calcularTotal(['4', '4', '4'])).toBeCloseTo(24.9 * 3, 2);
  });

  test('ignora ids que não existem', () => {
    expect(calcularTotal(['4', '999'])).toBeCloseTo(24.9, 2);
  });
});
