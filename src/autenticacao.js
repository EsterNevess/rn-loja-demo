// Regras de login do app.
//
// Ficam num arquivo próprio, sem nenhuma tela dentro, de propósito: lógica
// que não depende de React Native pode ser testada rápido, sem emulador.

// Credenciais de demonstração. O app não tem servidor: não há dado real aqui.
export const CREDENCIAIS_DEMO = {
  email: 'usuario@exemplo.com',
  senha: 'senha123',
};

export const MENSAGENS = {
  emailVazio: 'Informe o e-mail.',
  emailInvalido: 'E-mail inválido.',
  senhaVazia: 'Informe a senha.',
  credenciaisErradas: 'E-mail ou senha incorretos.',
};

/**
 * Valida o que a pessoa digitou na tela de login.
 * Devolve { ok: true } ou { ok: false, erro: '<mensagem para mostrar>' }.
 * A ordem das checagens é a que o usuário espera: primeiro o que faltou
 * preencher, depois o formato, só no fim a conferência das credenciais.
 */
export function validarLogin(email, senha) {
  const emailLimpo = (email ?? '').trim();

  if (!emailLimpo) {
    return { ok: false, erro: MENSAGENS.emailVazio };
  }
  if (!emailLimpo.includes('@')) {
    return { ok: false, erro: MENSAGENS.emailInvalido };
  }
  if (!senha) {
    return { ok: false, erro: MENSAGENS.senhaVazia };
  }
  if (
    emailLimpo.toLowerCase() !== CREDENCIAIS_DEMO.email ||
    senha !== CREDENCIAIS_DEMO.senha
  ) {
    return { ok: false, erro: MENSAGENS.credenciaisErradas };
  }

  return { ok: true, erro: null };
}
