# 🚀 Como Testar Localmente

## Pré-requisitos
- Node.js 16+ instalado
- MongoDB instalado localmente (ou Atlas)

## Testar Frontend

```powershell
cd c:\Users\202412170004\Desktop\LandPage

# Abrir em um servidor local (Python)
python -m http.server 8000

# Ou com Node.js (instale http-server primeiro)
npx http-server

# Acesse: http://localhost:8000
```

## Testar Backend

```powershell
cd c:\Users\202412170004\Desktop\LandPage\backend

# Instalar dependências
npm install

# Criar arquivo .env local
# Copie .env.example para .env e preencha:
# MONGODB_URI=mongodb://localhost:27017/flamezz-shop
# JWT_SECRET=sua_chave_secreta

# Iniciar servidor
npm start

# Servidor rodará em http://localhost:5000
```

## Testar Rotas da API

Abra o terminal PowerShell e teste:

```powershell
# Listar produtos
curl http://localhost:5000/api/products

# Registrar novo usuário
curl -X POST http://localhost:5000/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{"name":"Test User","email":"test@test.com","password":"123456"}'

# Login
curl -X POST http://localhost:5000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{"email":"test@test.com","password":"123456"}'
```

## Variáveis de Ambiente Locais

Crie um arquivo `.env` na pasta `backend`:

```
PORT=5000
ENVIRONMENT=development
MONGODB_URI=mongodb://localhost:27017/flamezz-shop
JWT_SECRET=sua_chave_super_secreta_para_desenvolvimento_123
FRONTEND_URL=http://localhost:8000
NODE_ENV=development
```

## Troubleshooting

### Erro: "Cannot find module 'express'"
```powershell
cd backend
npm install
```

### Erro: "MongoDB connection failed"
- Instale MongoDB Community: https://www.mongodb.com/try/download/community
- Ou configure MONGODB_URI com sua URI do Atlas

### Porta 5000 em uso
```powershell
# Encontrar processo na porta 5000
lsof -i :5000

# Matar processo (PID)
kill -9 <PID>
```

---

**Após testar localmente, faça push para GitHub e Railway fará deploy automático!** 🎉
