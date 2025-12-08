import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/flamezz-shop',
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',
  ENVIRONMENT: process.env.NODE_ENV || 'development',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || 'sk_test_example',
  STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY || 'pk_test_example'
};
