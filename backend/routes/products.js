import express from 'express';
import { body, validationResult } from 'express-validator';
import Product from '../models/Product.js';
import { authenticateToken } from './auth.js';

const router = express.Router();

// Middleware para verificar admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ error: 'Acesso negado. Permissão de admin requerida.' });
  }
};

// Obter todos os produtos (público)
router.get('/', async (req, res) => {
  try {
    const { category, minPrice, maxPrice, search } = req.query;
    let filter = { isActive: true };

    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const products = await Product.find(filter).populate('createdBy', 'name email');
    res.json(products);
  } catch (error) {
    console.error('Erro ao obter produtos:', error);
    res.status(500).json({ error: 'Erro ao obter produtos' });
  }
});

// Obter produto por ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('createdBy', 'name email');
    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.json(product);
  } catch (error) {
    console.error('Erro ao obter produto:', error);
    res.status(500).json({ error: 'Erro ao obter produto' });
  }
});

// Criar produto (admin)
router.post('/', authenticateToken, isAdmin, [
  body('name').notEmpty().withMessage('Nome é obrigatório'),
  body('description').notEmpty().withMessage('Descrição é obrigatória'),
  body('price').isFloat({ min: 0 }).withMessage('Preço inválido'),
  body('category').isIn(['Eletrônicos', 'Roupas', 'Livros', 'Casa', 'Esportes', 'Outros']).withMessage('Categoria inválida'),
  body('stock').isInt({ min: 0 }).withMessage('Estoque inválido')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, price, originalPrice, category, image, stock } = req.body;

    const product = new Product({
      name,
      description,
      price,
      originalPrice,
      category,
      image,
      stock,
      createdBy: req.user.id
    });

    await product.save();

    res.status(201).json({
      message: 'Produto criado com sucesso',
      product
    });
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
});

// Atualizar produto (admin)
router.put('/:id', authenticateToken, isAdmin, [
  body('name').optional().notEmpty().withMessage('Nome não pode estar vazio'),
  body('price').optional().isFloat({ min: 0 }).withMessage('Preço inválido'),
  body('stock').optional().isInt({ min: 0 }).withMessage('Estoque inválido')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    const { name, description, price, originalPrice, category, image, stock, isActive } = req.body;

    if (name) product.name = name;
    if (description) product.description = description;
    if (price !== undefined) product.price = price;
    if (originalPrice !== undefined) product.originalPrice = originalPrice;
    if (category) product.category = category;
    if (image) product.image = image;
    if (stock !== undefined) product.stock = stock;
    if (isActive !== undefined) product.isActive = isActive;

    await product.save();

    res.json({
      message: 'Produto atualizado com sucesso',
      product
    });
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
});

// Deletar produto (admin)
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    await Product.deleteOne({ _id: req.params.id });

    res.json({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    res.status(500).json({ error: 'Erro ao deletar produto' });
  }
});

export default router;
