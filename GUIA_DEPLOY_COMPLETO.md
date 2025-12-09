# 🚀 Guia Completo de Deploy - Flamezz Shop

## Status Atual
✅ Frontend deployado na Vercel
⏳ Backend precisa ser deployado no Railway
⏳ MongoDB Atlas precisa ser configurado

---

## **PASSO 1: Configurar MongoDB Atlas (Banco de Dados)**

### 1.1 Criar Conta no MongoDB Atlas
1. Acesse: https://www.mongodb.com/cloud/atlas
2. Clique em **"Start Free"**
3. Crie uma conta com email (ou use Google/GitHub)
4. Complete o formulário de dados pessoais

### 1.2 Criar um Cluster Gratuito
1. Na dashboard, clique em **"Create a Database"**
2. Escolha o plano **"Shared"** (gratuito) ✓
3. Escolha o provedor: **AWS**
4. Escolha a região: **São Paulo (sa-east-1)** ou mais próxima
5. Nomeie o cluster: `flamezz-shop-prod` (ou similar)
6. Clique em **"Create Cluster"** e aguarde 2-3 minutos

### 1.3 Criar Usuário de Banco de Dados
1. No menu esquerdo, clique em **"Database Access"**
2. Clique em **"Add New Database User"**
3. Escolha **"Password"** para autenticação
4. **Username:** `flamezz_user`
5. **Password:** Gere uma senha forte (copie para segurança!)
6. **Database User Privileges:** `Read and write to any database`
7. Clique em **"Add User"**

### 1.4 Configurar Acesso de Rede
1. No menu, clique em **"Network Access"**
2. Clique em **"Add IP Address"**
3. Escolha **"Allow access from anywhere"** (0.0.0.0/0)
   - ⚠️ Apenas para desenvolvimento/teste
4. Clique em **"Confirm"**

### 1.5 Obter Connection String
1. Volte para a página do cluster
2. Clique em **"Connect"**
3. Escolha **"Drivers"**
4. Copie a string de conexão (ela será parecida com):
```
mongodb+srv://flamezz_user:<password>@flamezz-shop.xxxxx.mongodb.net/?retryWrites=true&w=majority
```
5. **Substitua `<password>` pela senha que você criou**

Exemplo completo:
```
mongodb+srv://flamezz_user:MinhaSeNha123!@flamezz-shop.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

---

## **PASSO 2: Deployar Backend no Railway**

### 2.1 Criar Conta no Railway
1. Acesse: https://railway.app
2. Clique em **"Start Free"**
3. Clique em **"GitHub"** para autenticar
4. Autorize Railway a acessar seus repositórios
5. Selecione apenas **HelloWorld** para acesso

### 2.2 Criar Novo Projeto
1. Na dashboard Railway, clique em **"New Project"**
2. Clique em **"Deploy from GitHub repo"**
3. Selecione **Nathan-Eufrasio/HelloWorld**
4. Railway vai detectar automaticamente

### 2.3 Configurar para Deploy do Backend
1. Na página do projeto, clique em **"Settings"**
2. Na seção **"Build":**
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
3. Na seção **"Deploy":**
   - **Start Command:** `npm start`
4. Clique em **"Save"**

### 2.4 Configurar Variáveis de Ambiente
1. No projeto Railway, vá para **"Variables"**
2. Adicione as seguintes variáveis:

```
PORT=5000
ENVIRONMENT=production
MONGODB_URI=mongodb+srv://flamezz_user:SUA_SENHA@flamezz-shop.xxxxx.mongodb.net/flamezz-shop?retryWrites=true&w=majority
JWT_SECRET=sua_chave_secreta_super_segura_123!abc
FRONTEND_URL=https://helloworld-seven.vercel.app
NODE_ENV=production
```

**⚠️ IMPORTANTE:**
- Substitua `SUA_SENHA` pela senha que você criou no MongoDB
- Substitua `flamezz-shop.xxxxx` pela sua string de conexão real
- Gere um `JWT_SECRET` único e seguro!

### 2.5 Fazer Deploy
1. Railway fará o deploy automaticamente
2. Aguarde até ver o status **"Success"** (verde)
3. Quando pronto, você terá uma URL como:
```
https://seu-projeto-railway.up.railway.app
```
4. **Copie essa URL!**

---

## **PASSO 3: Configurar Frontend para Acessar o Backend**

### 3.1 Atualizar config.js
Edite o arquivo `config.js` na raiz:

```javascript
<!-- Carregue isso ANTES de carregar auth.js -->
<script>
  // Configurar API_BASE_URL dinamicamente
  window.API_BASE_URL = localStorage.getItem('API_BASE_URL') || 
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? 'http://localhost:5000/api'
      : 'https://seu-projeto-railway.up.railway.app/api');
</script>
```

**Substitua `https://seu-projeto-railway.up.railway.app/api` pela URL real do seu Railway!**

### 3.2 Fazer Commit e Push
```powershell
cd c:\Users\202412170004\Desktop\LandPage
git add config.js
git commit -m "Update: Configurar URL do backend Railway"
git push origin main
```

### 3.3 Vercel Fará Deploy Automático
Vercel detectará a mudança e fará o deploy automaticamente. Aguarde 2-3 minutos.

---

## **PASSO 4: Testar Tudo**

### 4.1 Testar API Diretamente
1. Abra o DevTools do navegador (F12)
2. Vá para a aba **Console**
3. Execute:
```javascript
fetch('https://seu-projeto-railway.up.railway.app/api/products')
  .then(r => r.json())
  .then(d => console.log(d))
```

Se aparecer a lista de produtos, está funcionando! ✅

### 4.2 Testar Login
1. Acesse: `https://helloworld-seven.vercel.app/login.html`
2. Tente criar uma nova conta
3. Tente fazer login
4. Se funcionar, tudo está 100%! 🎉

### 4.3 Verificar Logs do Railway
1. Na dashboard Railway do seu projeto
2. Clique na aba **"Deployments"**
3. Veja os logs para erros

---

## **URLs Finais**

```
🌐 Frontend: https://helloworld-seven.vercel.app
🔧 Backend:  https://seu-projeto-railway.up.railway.app
📊 MongoDB:  Seu cluster no MongoDB Atlas
```

---

## **Troubleshooting**

### ❌ "API connection refused"
- Backend não está rodando no Railway
- Verifique a URL em `config.js`
- Confira se as variáveis de ambiente estão corretas

### ❌ "MongoDB connection timeout"
- Verifique a string MONGODB_URI
- Confirme que o IP está liberado em Network Access
- Revise a senha do usuário MongoDB

### ❌ "CORS error"
- FRONTEND_URL está incorreto no Railway
- Verifique se https://helloworld-seven.vercel.app está exato

### ❌ "404 Not Found"
- O backend não está sendo iniciado
- Confira se o arquivo `package.json` do backend existe
- Verifique o comando `npm start`

---

## ✅ Checklist Final

- [ ] MongoDB Atlas cluster criado
- [ ] Usuário MongoDB criado com senha
- [ ] Network Access configurado (0.0.0.0/0)
- [ ] Connection String copiada
- [ ] Conta Railway criada
- [ ] Backend deployado no Railway
- [ ] Variáveis de ambiente adicionadas (MONGODB_URI, JWT_SECRET)
- [ ] URL do Railway copiada
- [ ] config.js atualizado com URL do Railway
- [ ] Push feito para GitHub
- [ ] Vercel fez deploy automático
- [ ] Login testado e funcionando
- [ ] API respondendo corretamente

---

## 🎉 Parabéns!
Seu site **Flamezz Shop** está 100% funcional em produção!

### Próximos Passos Opcionais:
- [ ] Adicionar domínio customizado na Vercel
- [ ] Configurar email para recuperação de senha
- [ ] Adicionar Stripe para pagamentos
- [ ] Melhorar perfil do usuário
- [ ] Adicionar sistema de reviews

---

**Dúvidas? Precisa de ajuda em alguma etapa?** 🔥
