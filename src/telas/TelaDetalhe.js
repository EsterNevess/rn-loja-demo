import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useCarrinho } from '../CarrinhoContext';
import { buscarProduto, formatarPreco } from '../produtos';
import { cores, espaco } from '../tema';

export default function TelaDetalhe({ route }) {
  const { adicionar } = useCarrinho();
  const [adicionado, setAdicionado] = useState(false);
  const produto = buscarProduto(route.params?.id);

  // Um id que não existe não deve derrubar o app: mostra um aviso claro.
  if (!produto) {
    return (
      <View style={estilos.tela}>
        <Text testID="produto-nao-encontrado" style={estilos.nome}>
          Produto não encontrado.
        </Text>
      </View>
    );
  }

  function adicionarAoCarrinho() {
    adicionar(produto.id);
    setAdicionado(true);
  }

  return (
    <View style={estilos.tela}>
      <Text testID="detalhe-nome" style={estilos.nome}>
        {produto.nome}
      </Text>
      <Text testID="detalhe-preco" style={estilos.preco}>
        {formatarPreco(produto.preco)}
      </Text>
      <Text testID="detalhe-descricao" style={estilos.descricao}>
        {produto.descricao}
      </Text>

      <Pressable
        testID="botao-adicionar"
        accessibilityRole="button"
        style={estilos.botao}
        onPress={adicionarAoCarrinho}
      >
        <Text style={estilos.textoBotao}>Adicionar ao carrinho</Text>
      </Pressable>

      {adicionado && (
        <Text testID="mensagem-adicionado" style={estilos.sucesso}>
          Produto adicionado ao carrinho.
        </Text>
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, padding: espaco.grande, backgroundColor: cores.fundo },
  nome: { fontSize: 24, fontWeight: '700', color: cores.texto },
  preco: { marginTop: espaco.pequeno, fontSize: 20, color: cores.principal, fontWeight: '600' },
  descricao: { marginTop: espaco.medio, fontSize: 16, color: cores.textoSuave, lineHeight: 22 },
  botao: {
    marginTop: espaco.grande,
    backgroundColor: cores.principal,
    borderRadius: 8,
    padding: espaco.medio,
    alignItems: 'center',
  },
  textoBotao: { color: cores.principalTexto, fontSize: 16, fontWeight: '600' },
  sucesso: { marginTop: espaco.medio, color: cores.sucesso, fontSize: 14 },
});
