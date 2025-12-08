import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Por favor, forneça um nome'],
      trim: true,
      maxlength: [50, 'Nome não pode ter mais de 50 caracteres']
    },
    email: {
      type: String,
      required: [true, 'Por favor, forneça um email'],
      unique: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Por favor, forneça um email válido']
    },
    password: {
      type: String,
      required: [true, 'Por favor, forneça uma senha'],
      minlength: [6, 'Senha deve ter no mínimo 6 caracteres'],
      select: false
    },
    phone: {
      type: String,
      default: null
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String
    },
    avatar: {
      type: String,
      default: null
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: true
    },
    lastLogin: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

// Hash password antes de salvar
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar senhas
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Remover senha do resultado
userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model('User', userSchema);
