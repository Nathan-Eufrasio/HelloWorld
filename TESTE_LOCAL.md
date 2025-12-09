# 🚀 Teste Local - Passo a Passo

## ✅ Já Feito
- Node.js v22 instalado ✓
- Dependências do backend instaladas (`npm install`) ✓
- Arquivo .env criado ✓

## ❌ O que Falta
- MongoDB Atlas configurado (você precisa fazer isso!)
- Backend rodando (depende do MongoDB)

---

## 📝 Como Configurar MongoDB Atlas (RÁPIDO - 5 minutos)

### Passo 1: Criar Conta
1. Abra: https://www.mongodb.com/cloud/atlas
2. Clique **"Start Free"**
3. Use Google/GitHub para criar conta (mais rápido)

### Passo 2: Criar Cluster
1. Clique **"Create a Database"**
2. Escolha **"Shared"** (gratuito) ✓
3. Escolha **AWS** e região **São Paulo** (ou perto de você)
4. Nomeie: `flamezz-test`
5. Clique **"Create"** e aguarde 2-3 minutos

### Passo 3: Criar Usuário
1. Vá para **"Database Access"**
2. Clique **"Add New Database User"**
3. **Username:** `testuser`
4. **Password:** `testpass123` (copie para usar depois!)
5. Clique **"Add User"**

### Passo 4: Liberar IP
1. Vá para **"Network Access"**
2. Clique **"Add IP Address"**
3. Escolha **"Allow access from anywhere"** (0.0.0.0/0)
4. Clique **"Confirm"**

### Passo 5: Obter Connection String
1. Volte para o cluster
2. Clique **"Connect"**
3. Escolha **"Drivers"**
4. Copie a string (parecerá com):
```
mongodb+srv://testuser:testpass123@flamezz-test.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### Passo 6: Atualizar .env
Edite o arquivo `backend/.env` com a connection string real:
```
MONGODB_URI=mongodb+srv://testuser:testpass123@flamezz-test.xxxxx.mongodb.net/flamezz-shop-test?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
JWT_SECRET=teste-chave-secreta-desenvolvimento-123abc
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:8000
STRIPE_SECRET_KEY=sk_test_local
STRIPE_PUBLIC_KEY=pk_test_local
```

⚠️ **SUBSTITUA:**
- `testuser` → seu username MongoDB
- `testpass123` → sua senha MongoDB
- `flamezz-test.xxxxx` → sua string real do cluster

---

## 🏃 Depois de Configurar MongoDB

### Terminal 1: Iniciar Backend
```powershell
cd c:\Users\202412170004\Desktop\LandPage\backend
npm start
```

Você verá:
```
✓ Conectado ao MongoDB
✓ Servidor rodando na porta 5000
```

### Terminal 2: Iniciar Frontend
```powershell
cd c:\Users\202412170004\Desktop\LandPage
python -m http.server 8000
```

Ou se não tiver Python:
```powershell
npx http-server
```

---

## 🌐 Acessar o Site

- **Homepage:** http://localhost:8000
- **Login:** http://localhost:8000/login.html
- **Sobre:** http://localhost:8000/about.html

---

## ✅ Testar Funcionalidades

### 1. Criar Conta
1. Abra http://localhost:8000/login.html
2. Clique em **"Crie uma agora"**
3. Preencha:
   - Nome: Seu Nome
   - Email: seu@email.com
   - Senha: 123456
4. Clique **"Criar Conta"**

Se aparecer **"Conta criada com sucesso!"**, está funcionando! ✅

### 2. Fazer Login
1. Clique **"Faça login"**
2. Email: seu@email.com
3. Senha: 123456
4. Clique **"Entrar"**

Se der OK, tudo está 100% funcional! 🎉

### 3. Testar API Direto
Abra o DevTools (F12) e execute no Console:

```javascript
// Teste 1: Listar produtos
fetch('http://localhost:5000/api/products')
  .then(r => r.json())
  .then(d => console.log(d))

// Teste 2: Registrar usuário
fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test User',
    email: 'test@test.com',
    password: '123456'
  })
})
  .then(r => r.json())
  .then(d => console.log(d))
```

---

## 🐛 Se algo não funcionar

### Erro: "Cannot read property 'host' of null"
- Seu MongoDB URI está inválida
- Verifique se copiou TUDO corretamente do Atlas

### Erro: "MongoDB connection timeout"
- IP não foi liberado em Network Access
- Confirme que tem 0.0.0.0/0

### Erro: "API is not responding"
- Backend não está rodando
- Execute `npm start` no terminal

### Erro: "404 login.html"
- Você não está na pasta certa
- Execute `cd c:\Users\202412170004\Desktop\LandPage` primeiro

---

## 🎯 Checklist

- [ ] Conta MongoDB Atlas criada
- [ ] Cluster criado
- [ ] Usuário criado
- [ ] IP liberado (0.0.0.0/0)
- [ ] Connection String copiada
- [ ] .env atualizado com connection string real
- [ ] Backend iniciado com sucesso (`npm start`)
- [ ] Frontend rodando (port 8000)
- [ ] Login/Registro testado
- [ ] API respondendo (DevTools Console)

---

**Depois de testar tudo funcionando localmente, você estará pronto para produção!** 🚀
