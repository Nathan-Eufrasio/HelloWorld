# Flamezz Shop Backend API

API REST completa para a loja online Flamezz Shop, desenvolvida com Node.js, Express e MongoDB.

## 🚀 Início Rápido

### Pré-requisitos
- Node.js v16+ instalado
- MongoDB rodando localmente ou URI de conexão remota

### Instalação

1. **Clone ou copie o projeto**
```bash
cd backend
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure o arquivo .env**
```bash
cp .env.example .env
```

Edite o `.env` com suas configurações:
```env
MONGODB_URI=mongodb://localhost:27017/flamezz-shop
PORT=5000
NODE_ENV=development
JWT_SECRET=sua-chave-secreta-super-segura
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

4. **Inicie o servidor**

**Desenvolvimento (com hot-reload):**
```bash
npm run dev
```

**Produção:**
```bash
npm start
```

O servidor será iniciado em `http://localhost:5000`

## 📚 Documentação da API

### Base URL
```
http://localhost:5000/api
```

### Autenticação

Todas as rotas protegidas requerem um token JWT no header:
```
Authorization: Bearer <seu_token_jwt>
```

---

## 🔐 Autenticação (`/auth`)

### Registrar Usuário
**POST** `/auth/register`

```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Resposta (201):**
```json
{
  "message": "Usuário registrado com sucesso",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "...",
    "name": "João Silva",
    "email": "joao@example.com"
  }
}
```

### Login
**POST** `/auth/login`

```json
{
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Resposta (200):**
```json
{
  "message": "Login realizado com sucesso",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { ... }
}
```

### Obter Perfil
**GET** `/auth/profile` (Autenticado)

### Atualizar Perfil
**PUT** `/auth/profile` (Autenticado)

```json
{
  "name": "Novo Nome",
  "phone": "11999999999",
  "address": {
    "street": "Rua X",
    "city": "São Paulo",
    "state": "SP",
    "zipCode": "01234-567",
    "country": "Brasil"
  }
}
```

### Mudar Senha
**POST** `/auth/change-password` (Autenticado)

```json
{
  "oldPassword": "senha_antiga",
  "newPassword": "senha_nova"
}
```

---

## 🛍️ Produtos (`/products`)

### Listar Produtos
**GET** `/products`

Query parameters:
- `category` - Filtra por categoria
- `minPrice` - Preço mínimo
- `maxPrice` - Preço máximo
- `search` - Busca por nome ou descrição

```bash
GET /products?category=Eletrônicos&minPrice=100&maxPrice=1000&search=notebook
```

### Obter Produto
**GET** `/products/:id`

### Criar Produto (Admin)
**POST** `/products` (Autenticado + Admin)

```json
{
  "name": "Produto X",
  "description": "Descrição detalhada",
  "price": 99.90,
  "originalPrice": 150.00,
  "category": "Eletrônicos",
  "image": "url-da-imagem",
  "stock": 50
}
```

### Atualizar Produto (Admin)
**PUT** `/products/:id` (Autenticado + Admin)

### Deletar Produto (Admin)
**DELETE** `/products/:id` (Autenticado + Admin)

---

## 🛒 Carrinho (`/cart`)

### Obter Carrinho
**GET** `/cart` (Autenticado)

### Adicionar ao Carrinho
**POST** `/cart/add` (Autenticado)

```json
{
  "productId": "id_do_produto",
  "quantity": 2
}
```

### Remover do Carrinho
**POST** `/cart/remove` (Autenticado)

```json
{
  "productId": "id_do_produto"
}
```

### Atualizar Quantidade
**POST** `/cart/update` (Autenticado)

```json
{
  "productId": "id_do_produto",
  "quantity": 5
}
```

### Limpar Carrinho
**POST** `/cart/clear` (Autenticado)

---

## 📦 Pedidos (`/orders`)

### Criar Pedido
**POST** `/orders` (Autenticado)

```json
{
  "shippingAddress": {
    "street": "Rua X, 123",
    "city": "São Paulo",
    "state": "SP",
    "zipCode": "01234-567",
    "country": "Brasil"
  },
  "paymentMethod": "credit_card"
}
```

**Payment Methods:** `credit_card`, `debit_card`, `paypal`, `pix`

### Listar Pedidos
**GET** `/orders` (Autenticado)

### Obter Pedido
**GET** `/orders/:id` (Autenticado)

### Cancelar Pedido
**POST** `/orders/:id/cancel` (Autenticado)

---

## 🗂️ Estrutura do Projeto

```
backend/
├── models/              # Modelos MongoDB
│   ├── User.js
│   ├── Product.js
│   ├── Cart.js
│   └── Order.js
├── routes/              # Rotas da API
│   ├── auth.js
│   ├── products.js
│   ├── cart.js
│   └── orders.js
├── config.js            # Configurações
├── server.js            # Servidor principal
├── package.json
├── .env.example
└── README.md
```

## 📋 Categorias de Produtos

- Eletrônicos
- Roupas
- Livros
- Casa
- Esportes
- Outros

## 🔒 Segurança

- Senhas criptografadas com bcryptjs
- Autenticação JWT
- CORS configurado
- Validação de inputs com express-validator
- Proteção de rotas admin

## 📝 Variáveis de Ambiente

| Variável | Padrão | Descrição |
|----------|--------|-----------|
| MONGODB_URI | mongodb://localhost:27017/flamezz-shop | URI do MongoDB |
| PORT | 5000 | Porta do servidor |
| NODE_ENV | development | Ambiente (development/production) |
| JWT_SECRET | your-secret-key | Chave secreta JWT |
| JWT_EXPIRE | 7d | Expiração do token |
| FRONTEND_URL | http://localhost:3000 | URL do frontend |

## 🚢 Deploy

### Heroku
```bash
heroku login
heroku create flamezz-shop-api
git push heroku main
heroku config:set JWT_SECRET=sua-chave
```

### DigitalOcean / AWS / Google Cloud
Use ferramentas de containerização (Docker) para deploy.

## 🤝 Contribuindo

Pull requests são bem-vindos!

## 📄 Licença

MIT License - veja LICENSE para detalhes.

---

**Desenvolvido com ❤️ para Flamezz Shop**
