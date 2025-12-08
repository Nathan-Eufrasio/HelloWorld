import express from 'express';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { authenticateToken } from './auth.js';

const router = express.Router();

// Criar pedido
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;

    if (!shippingAddress || !paymentMethod) {
      return res.status(400).json({ error: 'Endereço de entrega e método de pagamento são obrigatórios' });
    }

    // Obter carrinho do usuário
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: 'Carrinho vazio' });
    }

    // Validar estoque
    for (const item of cart.items) {
      if (item.product.stock < item.quantity) {
        return res.status(400).json({ error: `Quantidade não disponível para ${item.product.name}` });
      }
    }

    // Criar pedido
    const order = new Order({
      user: req.user.id,
      items: cart.items.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.price
      })),
      totalAmount: cart.totalPrice,
      shippingAddress,
      paymentMethod,
      paymentStatus: 'pending',
      orderStatus: 'pending'
    });

    // Reduzir estoque
    for (const item of cart.items) {
      await Product.findByIdAndUpdate(
        item.product._id,
        { $inc: { stock: -item.quantity } }
      );
    }

    await order.save();

    // Limpar carrinho
    cart.items = [];
    cart.totalItems = 0;
    cart.totalPrice = 0;
    await cart.save();

    res.status(201).json({
      message: 'Pedido criado com sucesso',
      order
    });
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    res.status(500).json({ error: 'Erro ao criar pedido' });
  }
});

// Obter pedidos do usuário
router.get('/', authenticateToken, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('items.product')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error('Erro ao obter pedidos:', error);
    res.status(500).json({ error: 'Erro ao obter pedidos' });
  }
});

// Obter pedido por ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product')
      .populate('user', 'name email');

    if (!order) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }

    // Verificar se o pedido pertence ao usuário
    if (order.user._id.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    res.json(order);
  } catch (error) {
    console.error('Erro ao obter pedido:', error);
    res.status(500).json({ error: 'Erro ao obter pedido' });
  }
});

// Cancelar pedido (apenas se estiver pending)
router.post('/:id/cancel', authenticateToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }

    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    if (order.orderStatus !== 'pending') {
      return res.status(400).json({ error: 'Apenas pedidos pendentes podem ser cancelados' });
    }

    // Restaurar estoque
    for (const item of order.items) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: item.quantity } }
      );
    }

    order.orderStatus = 'cancelled';
    await order.save();

    res.json({
      message: 'Pedido cancelado com sucesso',
      order
    });
  } catch (error) {
    console.error('Erro ao cancelar pedido:', error);
    res.status(500).json({ error: 'Erro ao cancelar pedido' });
  }
});

export default router;
