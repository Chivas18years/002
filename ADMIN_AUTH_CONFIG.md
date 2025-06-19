# Variáveis de Ambiente para Produção

## Configurações de Autenticação Admin

Adicione estas variáveis no painel da Vercel:

```
ADMIN_USERNAME=seu_usuario_admin
ADMIN_PASSWORD=sua_senha_super_segura
```

## Credenciais Padrão (Desenvolvimento)

- **Usuário:** admin
- **Senha:** admin123

⚠️ **IMPORTANTE:** Altere essas credenciais em produção configurando as variáveis de ambiente na Vercel!

## Como Configurar na Vercel:

1. Acesse o dashboard da Vercel
2. Selecione seu projeto
3. Vá em "Settings" → "Environment Variables"
4. Adicione:
   - `ADMIN_USERNAME` = seu usuário desejado
   - `ADMIN_PASSWORD` = sua senha segura
5. Faça redeploy do projeto

## Segurança:

- ✅ Cookies httpOnly (não acessíveis via JavaScript)
- ✅ Secure em produção (HTTPS only)
- ✅ SameSite protection
- ✅ Middleware protegendo todas as rotas admin
- ✅ Session expira em 24 horas

