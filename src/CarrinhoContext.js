// Estado do carrinho, compartilhado entre as telas.
//
// Context é o recurso do React para dados que várias telas precisam enxergar
// ao mesmo tempo, sem ficar passando de tela em tela.

import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const CarrinhoContext = createContext(null);

export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState([]);

  const adicionar = useCallback((idDoProduto) => {
    setItens((atual) => [...atual, idDoProduto]);
  }, []);

  const valor = useMemo(
    () => ({ itens, quantidade: itens.length, adicionar }),
    [itens, adicionar],
  );

  return <CarrinhoContext.Provider value={valor}>{children}</CarrinhoContext.Provider>;
}

export function useCarrinho() {
  const contexto = useContext(CarrinhoContext);
  if (contexto === null) {
    throw new Error('useCarrinho precisa estar dentro de um CarrinhoProvider');
  }
  return contexto;
}
