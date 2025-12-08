import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import cartRoutes from './routes/cart.js';
import orderRoutes from './routes/orders.js';

const app = express();

// Middleware
app.use(cors({
  origin: config.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log de requisições em desenvolvimento
if (config.ENVIRONMENT === 'development') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

// Conectar ao MongoDB
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('✓ Conectado ao MongoDB');
  })
  .catch(err => {
    console.error('✗ Erro ao conectar ao MongoDB:', err);
    process.exit(1);
  });

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Rota de health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Servidor Flamezz Shop está rodando' });
});

// Rota raiz
app.get('/', (req, res) => {
  res.json({
    name: 'Flamezz Shop API',
    version: '1.0.0',
    environment: config.ENVIRONMENT,
    endpoints: {
      auth: '/api/auth',
      products: '/api/products',
      cart: '/api/cart',
      orders: '/api/orders'
    }
  });
});

// Middleware de erro 404
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Middleware de erro geral
app.use((err, req, res, next) => {
  console.error('Erro:', err);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// Iniciar servidor
app.listen(config.PORT, () => {
  console.log(`\n🔥 Flamezz Shop API rodando em http://localhost:${config.PORT}`);
  console.log(`Environment: ${config.ENVIRONMENT}`);
  console.log(`MongoDB: ${config.MONGODB_URI}\n`);
});
