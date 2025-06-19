# Deploy App - Portal de Serviços Governamentais

Uma aplicação Next.js 14 com autenticação, banco de dados PostgreSQL e sistema de pagamento PIX.

## Tecnologias

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, tRPC, Prisma ORM
- **Banco de Dados**: PostgreSQL (Neon)
- **Autenticação**: NextAuth.js com Discord OAuth
- **Validação**: Zod
- **Estado**: TanStack Query (React Query)

## Configuração Local

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env` e configure as variáveis:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais:

```env
AUTH_SECRET="sua-chave-secreta-aqui"
AUTH_DISCORD_ID="seu-discord-client-id"
AUTH_DISCORD_SECRET="seu-discord-client-secret"
DATABASE_URL="sua-url-do-banco-postgresql"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Configurar Banco de Dados

```bash
# Gerar o cliente Prisma
npx prisma generate

# Executar migrações (se necessário)
npx prisma db push
```

### 4. Executar em Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`.

## Deploy na Vercel

### 1. Preparar o Projeto

- Certifique-se de que todos os arquivos estão commitados no Git
- Remova arquivos desnecessários (`.next/`, `node_modules/`, etc.)

### 2. Configurar Variáveis de Ambiente na Vercel

No dashboard da Vercel, configure as seguintes variáveis:

- `AUTH_SECRET`: Chave secreta para NextAuth
- `AUTH_DISCORD_ID`: ID da aplicação Discord
- `AUTH_DISCORD_SECRET`: Secret da aplicação Discord  
- `DATABASE_URL`: URL do banco PostgreSQL

**Nota**: Não configure `NEXTAUTH_URL` na Vercel - ela é definida automaticamente.

### 3. Deploy

```bash
# Instalar Vercel CLI (se necessário)
npm i -g vercel

# Fazer deploy
vercel --prod
```

## Estrutura do Projeto

```
src/
├── app/                 # App Router do Next.js
│   ├── api/            # API Routes
│   ├── _components/    # Componentes da aplicação
│   ├── checkout/       # Página de checkout
│   ├── login/          # Página de login
│   ├── pagamento/      # Página de pagamento
│   └── sudo-admin-secret/ # Painel administrativo
├── server/             # Lógica do servidor
│   ├── api/           # tRPC routers
│   ├── auth.ts        # Configuração NextAuth
│   └── db/            # Configuração do banco
├── styles/            # Estilos globais
├── trpc/              # Cliente tRPC
├── types/             # Tipos TypeScript
└── utils/             # Utilitários
```

## Scripts Disponíveis

- `npm run dev`: Executa em modo desenvolvimento
- `npm run build`: Gera build de produção
- `npm run start`: Executa build de produção
- `npm run lint`: Executa linting

## Funcionalidades

- ✅ Autenticação com Discord OAuth
- ✅ Sistema de usuários e perfis
- ✅ Formulários de solicitação de CNH
- ✅ Sistema de pagamento PIX
- ✅ Painel administrativo
- ✅ Design responsivo
- ✅ Validação de formulários

## Suporte

Para problemas ou dúvidas, consulte a documentação oficial:

- [Next.js](https://nextjs.org/docs)
- [Prisma](https://www.prisma.io/docs)
- [NextAuth.js](https://next-auth.js.org)
- [Vercel](https://vercel.com/docs)

