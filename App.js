import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import { CarrinhoProvider } from './src/CarrinhoContext';
import TelaDetalhe from './src/telas/TelaDetalhe';
import TelaLogin from './src/telas/TelaLogin';
import TelaProdutos from './src/telas/TelaProdutos';
import { cores } from './src/tema';

const Pilha = createNativeStackNavigator();

export default function App() {
  return (
    // O provider fica no topo para que todas as telas enxerguem o mesmo carrinho.
    <CarrinhoProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Pilha.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: { backgroundColor: cores.principal },
            headerTintColor: cores.principalTexto,
          }}
        >
          <Pilha.Screen name="Login" component={TelaLogin} options={{ headerShown: false }} />
          <Pilha.Screen
            name="Produtos"
            component={TelaProdutos}
            options={{ title: 'Produtos', headerBackVisible: false }}
          />
          <Pilha.Screen name="Detalhe" component={TelaDetalhe} options={{ title: 'Detalhe' }} />
        </Pilha.Navigator>
      </NavigationContainer>
    </CarrinhoProvider>
  );
}
