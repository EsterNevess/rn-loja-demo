import { CREDENCIAIS_DEMO, MENSAGENS, validarLogin } from '../src/autenticacao';

describe('validarLogin', () => {
  test('aceita as credenciais corretas', () => {
    expect(validarLogin(CREDENCIAIS_DEMO.email, CREDENCIAIS_DEMO.senha)).toEqual({
      ok: true,
      erro: null,
    });
  });

  test('ignora espaços e maiúsculas no e-mail', () => {
    const resultado = validarLogin('  USUARIO@Exemplo.com  ', CREDENCIAIS_DEMO.senha);
    expect(resultado.ok).toBe(true);
  });

  test('pede o e-mail quando o campo está vazio', () => {
    expect(validarLogin('', 'qualquer')).toEqual({ ok: false, erro: MENSAGENS.emailVazio });
  });

  test('trata e-mail só com espaços como vazio', () => {
    expect(validarLogin('   ', 'qualquer').erro).toBe(MENSAGENS.emailVazio);
  });

  test('rejeita e-mail sem arroba', () => {
    expect(validarLogin('usuario.exemplo.com', 'senha123').erro).toBe(MENSAGENS.emailInvalido);
  });

  test('pede a senha quando o campo está vazio', () => {
    expect(validarLogin(CREDENCIAIS_DEMO.email, '').erro).toBe(MENSAGENS.senhaVazia);
  });

  test('rejeita senha incorreta', () => {
    expect(validarLogin(CREDENCIAIS_DEMO.email, 'errada').erro).toBe(MENSAGENS.credenciaisErradas);
  });

  test('rejeita e-mail que não é o cadastrado', () => {
    expect(validarLogin('outra@pessoa.com', CREDENCIAIS_DEMO.senha).erro).toBe(
      MENSAGENS.credenciaisErradas,
    );
  });

  test('a senha diferencia maiúsculas de minúsculas', () => {
    expect(validarLogin(CREDENCIAIS_DEMO.email, 'SENHA123').ok).toBe(false);
  });

  test('não quebra com valores nulos', () => {
    expect(validarLogin(null, null).erro).toBe(MENSAGENS.emailVazio);
    expect(validarLogin(undefined, undefined).erro).toBe(MENSAGENS.emailVazio);
  });

  test('o erro de campo vazio vem antes do erro de credencial', () => {
    // Com os dois problemas juntos, o usuário deve ver primeiro o que falta preencher.
    expect(validarLogin('', '').erro).toBe(MENSAGENS.emailVazio);
  });
});
