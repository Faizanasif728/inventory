import { Router } from 'express';
import userRoutes from '../modules/user/user.routes';
import productRoute from '../modules/product/product.routes';
import saleRoutes from '../modules/sale/sale.routes';
import categoryRoutes from '../modules/category/category.routes';
import brandRoutes from '../modules/brand/brand.routes';
import sellerRoutes from '../modules/seller/seller.routes';
import purchaseRoutes from '../modules/purchase/purchase.routes';

const rootRouter = Router();

// Health check endpoint for API
rootRouter.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: '✅ API Health Check - Backend is running successfully!',
    status: 'Backend Server Operational',
    apiVersion: 'v1',
    timestamp: new Date().toISOString()
  });
});

rootRouter.use('/users', userRoutes);
rootRouter.use('/products', productRoute);
rootRouter.use('/sales', saleRoutes);
rootRouter.use('/categories', categoryRoutes);
rootRouter.use('/brands', brandRoutes);
rootRouter.use('/sellers', sellerRoutes);
rootRouter.use('/purchases', purchaseRoutes);

export default rootRouter;
