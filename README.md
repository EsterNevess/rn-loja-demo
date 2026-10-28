# Loja Demo — app React Native com testes automatizados

[![CI](https://github.com/EsterNevess/rn-loja-demo/actions/workflows/ci.yml/badge.svg)](https://github.com/EsterNevess/rn-loja-demo/actions/workflows/ci.yml)
[![Relatório Allure](https://img.shields.io/badge/Relat%C3%B3rio-Allure-FF5722?logo=qase&logoColor=white)](https://esternevess.github.io/rn-loja-demo/)

📊 **[Relatório Allure da última execução](https://esternevess.github.io/rn-loja-demo/)**, publicado a cada push.

App Android de demonstração, feito com **React Native e Expo**, junto com a sua suíte de testes:
testes unitários em Jest e testes de ponta a ponta com **Maestro**, executados num emulador dentro do CI.

O app tem três telas (login, lista de produtos e detalhe) e um carrinho simples. Não há servidor:
os dados são fixos, porque o foco do projeto é o código e a forma de testá-lo.

Complementa o projeto [`qa-mobile-maestro`](https://github.com/EsterNevess/qa-mobile-maestro), que testa
um aplicativo de terceiros. Aqui o aplicativo faz parte do repositório, o que permite pensar em
testabilidade desde o desenvolvimento.

## O que tem aqui

| Camada | Ferramenta | O que cobre |
|---|---|---|
| Lógica | Jest | 29 testes de validação de login, formatação de preço, busca e total do carrinho |
| Interface | Maestro | 5 fluxos: login válido, login inválido, campos vazios, detalhe do produto e carrinho |
| Pipeline | GitHub Actions | roda tudo a cada push: testes unitários, compilação do APK e fluxos no emulador |
| Relatório | Allure | resultado dos fluxos com evidências, publicado no GitHub Pages |

## Estrutura

```
App.js                      navegação entre as telas
src/
  autenticacao.js           regras de login (sem nenhuma tela dentro)
  produtos.js               catálogo, formatação de preço e total
  CarrinhoContext.js        estado do carrinho compartilhado entre telas
  telas/                    TelaLogin, TelaProdutos, TelaDetalhe
__tests__/                  testes unitários (Jest)
flows/                      fluxos de ponta a ponta (Maestro)
  comum/entrar.yaml         subfluxo reaproveitado: abrir o app e fazer login
scripts/junit_para_allure.py  junta o resultado do Maestro e os prints num relatório
.github/workflows/ci.yml    pipeline
```

## Como rodar

Requer Node 20 ou superior.

```bash
npm install
npm test                 # testes unitários
npx expo start           # abre o app (Expo Go ou emulador)
```

Credenciais de demonstração, também exibidas na tela de login:

```
usuario@exemplo.com / senha123
```

Para rodar os fluxos do Maestro é preciso um emulador ou aparelho Android com o app instalado:

```bash
npx expo prebuild --platform android
cd android && ./gradlew assembleRelease -PreactNativeArchitectures=x86_64
adb install -r app/build/outputs/apk/release/app-release.apk
maestro test flows/
```

## Decisões de projeto

**Lógica separada da tela.** As regras de login e de preço ficam em arquivos sem nenhum componente
dentro. Por isso rodam em Jest em poucos segundos, sem emulador. Teste de interface é lento e
frágil; o que pode ser verificado sem ele, deve ser.

**`testID` em tudo que o teste precisa encontrar.** No Android, o React Native expõe o `testID` como
identificador do elemento, e o Maestro o encontra com `id:`. No projeto
[`qa-mobile-maestro`](https://github.com/EsterNevess/qa-mobile-maestro) o aplicativo testado usava
`accessibilityLabel`, e a mesma busca por `id:` não encontrava nada. Controlar o próprio app evita
esse problema.

**Fluxos independentes.** Cada fluxo abre o app com `clearState: true`. Sem isso, um fluxo que faz
login deixaria a sessão ativa e o seguinte dependeria da ordem de execução.

**APK de produção no CI, e só para o emulador.** O pipeline compila a versão *release*, que embute o
JavaScript e roda sem servidor de desenvolvimento, e apenas para a arquitetura `x86_64`, a do
emulador. Compilar para as quatro arquiteturas só aumentaria o tempo.

**A pasta `android/` não é versionada.** Ela é gerada a partir do `app.json` com `expo prebuild`.
O repositório guarda o que foi escrito, e não código gerado.

**Runner com versão fixa (`ubuntu-24.04`).** O rótulo `latest` migrou de distribuição em outubro
de 2026 e levou junto o suporte de ferramentas que dependiam da anterior.

## Limitações conhecidas

- O app não tem servidor nem persistência: o carrinho zera ao fechar. É uma demonstração.
- Os fluxos rodam num emulador Android (API 30). Não há cobertura de iOS.
- `npm audit` aponta vulnerabilidades em dependências internas das ferramentas do Expo. O `npm audit
  fix --force` sugerido rebaixaria o Expo para uma versão antiga, então não foi aplicado.
