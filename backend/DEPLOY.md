# Flamezz Shop - Instruções de Deploy

## 🚀 Fazer Deploy em Produção

### Option 1: Heroku (Fácil e Grátis)

1. **Crie uma conta em heroku.com**

2. **Instale a CLI do Heroku**
```bash
npm install -g heroku
```

3. **Login no Heroku**
```bash
heroku login
```

4. **Crie uma aplicação**
```bash
heroku create flamezz-shop-api
```

5. **Adicione variáveis de ambiente**
```bash
heroku config:set MONGODB_URI=sua_uri_mongodb
heroku config:set JWT_SECRET=sua_chave_super_segura
heroku config:set NODE_ENV=production
```

6. **Deploy**
```bash
git push heroku main
```

### Option 2: Railway.app (Muito Simples)

1. Vá em railway.app
2. Conecte seu GitHub
3. Selecione este repositório
4. Configure as variáveis de ambiente
5. Deploy automático!

### Option 3: Render

1. Vá em render.com
2. Crie um novo "Web Service"
3. Conecte seu repositório
4. Configure:
   - Build: `npm install`
   - Start: `npm start`
5. Adicione variáveis de ambiente
6. Deploy!

### Option 4: DigitalOcean / AWS (Profissional)

Use Docker para containerizar a aplicação:

**Dockerfile:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

  api:
    build: .
    ports:
      - "5000:5000"
    environment:
      MONGODB_URI: mongodb://mongodb:27017/flamezz-shop
      JWT_SECRET: ${JWT_SECRET}
      NODE_ENV: production
    depends_on:
      - mongodb

volumes:
  mongo_data:
```

## 🗄️ Banco de Dados MongoDB

### Opção 1: MongoDB Atlas (Recomendado)

1. Vá em mongodb.com/cloud
2. Crie uma conta gratuita
3. Crie um cluster gratuito
4. Copie a string de conexão
5. Adicione em MONGODB_URI

### Opção 2: MongoDB Local
```bash
# No Windows
# Download: https://www.mongodb.com/try/download/community
# Siga o instalador

# No Mac (com Homebrew)
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# No Linux (Ubuntu)
curl https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

## ✅ Checklist de Deploy

- [ ] Arquivo `.env` configurado com segurança
- [ ] MongoDB ativo e acessível
- [ ] Todas as dependências instaladas
- [ ] Variáveis de ambiente no servidor
- [ ] JWT_SECRET alterado (não usar o padrão)
- [ ] CORS configurado para seu frontend
- [ ] Frontend apontando para URL correta da API
- [ ] Certificado SSL/HTTPS ativo
- [ ] Logs monitorados

## 🔧 Testes Após Deploy

```bash
# Health check
curl https://seu-dominio.com/api/health

# Registrar usuário
curl -X POST https://seu-dominio.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste",
    "email": "teste@example.com",
    "password": "senha123"
  }'
```

## 📊 Monitoramento

### Logs Heroku
```bash
heroku logs --tail
```

### Métrica de Uptime
- Configura um serviço como UptimeRobot.com
- Monitore a rota `/api/health`

## 🔐 Segurança em Produção

1. **Nunca commite o arquivo .env**
2. **Use HTTPS obrigatoriamente**
3. **Altere o JWT_SECRET**
4. **Use senhas de admin fortes**
5. **Configure rate limiting** (adicionar depois)
6. **Monitore logs de erro**
7. **Faça backup do MongoDB regularmente**

## 📞 Suporte

Para problemas, verifique:
- Logs da aplicação
- Status do MongoDB
- Variáveis de ambiente
- CORS configuration
- Firewall/Security Groups

---

**Parabéns! Seu backend Flamezz Shop está em produção!** 🎉
