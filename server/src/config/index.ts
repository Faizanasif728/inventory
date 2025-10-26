import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  database_url: process.env.DATABASE_URL,
  jwt_secret: process.env.JWT_SECRET,
  production_frontend_url: process.env.PRODUCTION_FRONTEND_URL,
  local_frontend_url: process.env.LOCAL_FRONTEND_URL || 'http://localhost:5173',
  cors_origin: [
    process.env.PRODUCTION_FRONTEND_URL,
    process.env.LOCAL_FRONTEND_URL || 'http://localhost:5173',
    'http://localhost:3000'
  ].filter(Boolean) as string[]
};
