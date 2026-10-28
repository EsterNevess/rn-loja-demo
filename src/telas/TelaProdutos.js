import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { useCarrinho } from '../CarrinhoContext';
import { PRODUTOS, formatarPreco } from '../produtos';
import { cores, espaco } from '../tema';

export default function TelaProdutos({ navigation }) {
  const { quantidade } = useCarrinho();

  return (
    <View style={estilos.tela}>
      <View style={estilos.barra}>
        <Text style={estilos.textoBarra}>{PRODUTOS.length} produtos</Text>
        <Text testID="contador-carrinho" style={estilos.carrinho}>
          Carrinho: {quantidade}
        </Text>
      </View>

      <FlatList
        data={PRODUTOS}
        keyExtractor={(produto) => produto.id}
        contentContainerStyle={estilos.lista}
        renderItem={({ item }) => (
          <Pressable
            testID={`produto-${item.id}`}
            accessibilityRole="button"
            style={estilos.cartao}
            onPress={() => navigation.navigate('Detalhe', { id: item.id })}
          >
            <Text style={estilos.nome}>{item.nome}</Text>
            <Text style={estilos.preco}>{formatarPreco(item.preco)}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo },
  barra: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: espaco.medio,
    borderBottomWidth: 1,
    borderBottomColor: cores.borda,
    backgroundColor: cores.cartao,
  },
  textoBarra: { color: cores.textoSuave, fontSize: 14 },
  carrinho: { color: cores.principal, fontSize: 14, fontWeight: '700' },
  lista: { padding: espaco.medio },
  cartao: {
    backgroundColor: cores.cartao,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 8,
    padding: espaco.medio,
    marginBottom: espaco.pequeno,
  },
  nome: { fontSize: 16, fontWeight: '600', color: cores.texto },
  preco: { marginTop: 4, fontSize: 14, color: cores.textoSuave },
});
