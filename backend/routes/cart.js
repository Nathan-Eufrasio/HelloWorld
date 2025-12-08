import express from 'express';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { authenticateToken } from './auth.js';

const router = express.Router();

// Obter carrinho
router.get('/', authenticateToken, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
      await cart.save();
    }

    res.json(cart);
  } catch (error) {
    console.error('Erro ao obter carrinho:', error);
    res.status(500).json({ error: 'Erro ao obter carrinho' });
  }
});

// Adicionar item ao carrinho
router.post('/add', authenticateToken, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity || quantity < 1) {
      return res.status(400).json({ error: 'Dados inválidos' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ error: 'Quantidade não disponível em estoque' });
    }

    let cart = await Cart.findOne({ user: req.user.id });
    
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }

    // Verificar se produto já está no carrinho
    const existingItem = cart.items.find(item => item.product.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
        price: product.price
      });
    }

    // Calcular totais
    cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    await cart.save();
    await cart.populate('items.product');

    res.json({
      message: 'Produto adicionado ao carrinho',
      cart
    });
  } catch (error) {
    console.error('Erro ao adicionar ao carrinho:', error);
    res.status(500).json({ error: 'Erro ao adicionar ao carrinho' });
  }
});

// Remover item do carrinho
router.post('/remove', authenticateToken, async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ error: 'ID do produto é obrigatório' });
    }

    let cart = await Cart.findOne({ user: req.user.id });
    
    if (!cart) {
      return res.status(404).json({ error: 'Carrinho não encontrado' });
    }

    cart.items = cart.items.filter(item => item.product.toString() !== productId);

    // Recalcular totais
    cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    await cart.save();
    await cart.populate('items.product');

    res.json({
      message: 'Produto removido do carrinho',
      cart
    });
  } catch (error) {
    console.error('Erro ao remover do carrinho:', error);
    res.status(500).json({ error: 'Erro ao remover do carrinho' });
  }
});

// Atualizar quantidade
router.post('/update', authenticateToken, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity || quantity < 0) {
      return res.status(400).json({ error: 'Dados inválidos' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    if (quantity > 0 && product.stock < quantity) {
      return res.status(400).json({ error: 'Quantidade não disponível em estoque' });
    }

    let cart = await Cart.findOne({ user: req.user.id });
    
    if (!cart) {
      return res.status(404).json({ error: 'Carrinho não encontrado' });
    }

    const item = cart.items.find(item => item.product.toString() === productId);
    
    if (!item) {
      return res.status(404).json({ error: 'Item não encontrado no carrinho' });
    }

    if (quantity === 0) {
      cart.items = cart.items.filter(item => item.product.toString() !== productId);
    } else {
      item.quantity = quantity;
    }

    // Recalcular totais
    cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    await cart.save();
    await cart.populate('items.product');

    res.json({
      message: 'Carrinho atualizado',
      cart
    });
  } catch (error) {
    console.error('Erro ao atualizar carrinho:', error);
    res.status(500).json({ error: 'Erro ao atualizar carrinho' });
  }
});

// Limpar carrinho
router.post('/clear', authenticateToken, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id });
    
    if (!cart) {
      return res.status(404).json({ error: 'Carrinho não encontrado' });
    }

    cart.items = [];
    cart.totalItems = 0;
    cart.totalPrice = 0;

    await cart.save();

    res.json({
      message: 'Carrinho limpo',
      cart
    });
  } catch (error) {
    console.error('Erro ao limpar carrinho:', error);
    res.status(500).json({ error: 'Erro ao limpar carrinho' });
  }
});

export default router;
