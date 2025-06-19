# Variáveis de Ambiente para Produção na Vercel

## Configuração Obrigatória

Configure as seguintes variáveis de ambiente no dashboard da Vercel:

### 1. AUTH_SECRET
- **Valor**: `uh2C/LIiV7NJ2uprD7BXi55AtsEu1vZ4WKqD9BmXI4Q=`
- **Ambiente**: Production, Preview, Development
- **Descrição**: Chave secreta para NextAuth.js

### 2. AUTH_DISCORD_ID
- **Valor**: `1383246307384102972`
- **Ambiente**: Production, Preview, Development
- **Descrição**: ID da aplicação Discord OAuth

### 3. AUTH_DISCORD_SECRET
- **Valor**: `qA5f4xR8emdAeP5ducMTF4aYRszeS1_U`
- **Ambiente**: Production, Preview, Development
- **Descrição**: Secret da aplicação Discord OAuth

### 4. DATABASE_URL
- **Valor**: `postgresql://neondb_owner:npg_YrSEaF41jBvb@ep-orange-morning-acwlo5g3-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require`
- **Ambiente**: Production, Preview, Development
- **Descrição**: URL de conexão com o banco PostgreSQL (Neon)

## Variáveis Automáticas da Vercel

As seguintes variáveis são configuradas automaticamente pela Vercel:

- `VERCEL_URL`: URL do deployment atual
- `VERCEL_ENV`: Ambiente (production, preview, development)
- `NODE_ENV`: Definido automaticamente como "production"

## Importante

- **NÃO configure NEXTAUTH_URL**: A Vercel usa automaticamente VERCEL_URL
- **Mantenha as credenciais seguras**: Nunca exponha secrets em código público
- **Use Preview Environment**: Configure DATABASE_URL separada para preview deployments

## Como Configurar na Vercel

1. Acesse o dashboard da Vercel
2. Selecione seu projeto
3. Vá para Settings > Environment Variables
4. Adicione cada variável com os valores acima
5. Selecione os ambientes apropriados (Production, Preview, Development)
6. Clique em "Save"

## Verificação

Após configurar, faça um novo deployment para aplicar as variáveis.

