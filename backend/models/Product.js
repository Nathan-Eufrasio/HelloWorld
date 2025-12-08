import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Por favor, forneça um nome de produto'],
      trim: true,
      maxlength: [100, 'Nome não pode ter mais de 100 caracteres']
    },
    description: {
      type: String,
      required: [true, 'Por favor, forneça uma descrição'],
      maxlength: [2000, 'Descrição não pode ter mais de 2000 caracteres']
    },
    price: {
      type: Number,
      required: [true, 'Por favor, forneça um preço'],
      min: [0, 'Preço não pode ser negativo'],
      default: 0
    },
    originalPrice: {
      type: Number,
      default: null
    },
    category: {
      type: String,
      required: [true, 'Por favor, forneça uma categoria'],
      enum: ['Eletrônicos', 'Roupas', 'Livros', 'Casa', 'Esportes', 'Outros']
    },
    image: {
      type: String,
      default: null
    },
    images: [String],
    stock: {
      type: Number,
      required: [true, 'Por favor, forneça a quantidade em estoque'],
      min: [0, 'Estoque não pode ser negativo'],
      default: 0
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    reviews: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
