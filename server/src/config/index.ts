import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  database_url: process.env.DATABASE_URL,
  jwt_secret: process.env.JWT_SECRET,
  production_frontend_url: process.env.PRODUCTION_FRONTEND_URL,
  local_frontend_url: process.env.LOCAL_FRONTEND_URL,
  cors_origin: [
    process.env.PRODUCTION_FRONTEND_URL,
    process.env.LOCAL_FRONTEND_URL
  ].filter(Boolean) as string[]
};

// eslint-disable-next-line no-console
console.log('[IMS][SERVER CONFIG] CORS origins:', JSON.stringify((exports as any).default?.cors_origin ?? []));
