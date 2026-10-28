import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { CREDENCIAIS_DEMO, validarLogin } from '../autenticacao';
import { cores, espaco } from '../tema';

export default function TelaLogin({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(null);

  function entrar() {
    const resultado = validarLogin(email, senha);
    if (!resultado.ok) {
      setErro(resultado.erro);
      return;
    }
    setErro(null);
    // replace (e não navigate): depois de entrar, "voltar" não deve levar de novo ao login.
    navigation.replace('Produtos');
  }

  return (
    <KeyboardAvoidingView
      style={estilos.tela}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={estilos.titulo}>Loja Demo</Text>
      <Text style={estilos.subtitulo}>Entre para ver os produtos</Text>

      <TextInput
        testID="campo-email"
        accessibilityLabel="Campo de e-mail"
        style={estilos.campo}
        placeholder="E-mail"
        placeholderTextColor={cores.textoSuave}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        testID="campo-senha"
        accessibilityLabel="Campo de senha"
        style={estilos.campo}
        placeholder="Senha"
        placeholderTextColor={cores.textoSuave}
        secureTextEntry
        autoCapitalize="none"
        value={senha}
        onChangeText={setSenha}
      />

      {erro !== null && (
        <Text testID="mensagem-erro" accessibilityRole="alert" style={estilos.erro}>
          {erro}
        </Text>
      )}

      <Pressable
        testID="botao-entrar"
        accessibilityRole="button"
        style={estilos.botao}
        onPress={entrar}
      >
        <Text style={estilos.textoBotao}>Entrar</Text>
      </Pressable>

      <View style={estilos.dica}>
        <Text style={estilos.textoDica}>Demonstração: {CREDENCIAIS_DEMO.email} / {CREDENCIAIS_DEMO.senha}</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, justifyContent: 'center', padding: espaco.grande, backgroundColor: cores.fundo },
  titulo: { fontSize: 28, fontWeight: '700', color: cores.principal, textAlign: 'center' },
  subtitulo: { fontSize: 15, color: cores.textoSuave, textAlign: 'center', marginBottom: espaco.grande },
  campo: {
    backgroundColor: cores.cartao,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 8,
    padding: espaco.medio,
    fontSize: 16,
    color: cores.texto,
    marginBottom: espaco.medio,
  },
  erro: { color: cores.erro, marginBottom: espaco.medio, fontSize: 14 },
  botao: { backgroundColor: cores.principal, borderRadius: 8, padding: espaco.medio, alignItems: 'center' },
  textoBotao: { color: cores.principalTexto, fontSize: 16, fontWeight: '600' },
  dica: { marginTop: espaco.grande, alignItems: 'center' },
  textoDica: { color: cores.textoSuave, fontSize: 12 },
});
