/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from 'mongoose';
import BaseServices from '../baseServices';
import { IPurchase } from './purchase.interface';
import Purchase from './purchase.model';
import sortAndPaginatePipeline from '../../lib/sortAndPaginate.pipeline';

class PurchaseServices extends BaseServices<any> {
  constructor(model: any, modelName: string) {
    super(model, modelName);
  }

  /**
   * Create new sale and decrease product stock
   */
  async create(payload: IPurchase, userId: string) {
    const { unitPrice, quantity } = payload;
    payload.user = new Types.ObjectId(userId);
    payload.expense = unitPrice * quantity;

    return this.model.create(payload);
  }

  /**
   * Read all category of user
   */
  async getAll(userId: string, query: Record<string, unknown>) {
    const search = query.search ? query.search : '';

    const data = await this.model.aggregate([
      {
        $match: {
          user: new Types.ObjectId(userId),
          $or: [{ sellerName: { $regex: search, $options: 'i' } }, { productName: { $regex: search, $options: 'i' } }]
        }
      },
      ...sortAndPaginatePipeline(query)
    ]);

    const totalCount = await this.model.find({ user: userId }).countDocuments();

    return { data, totalCount };
  }

  async readAllYearly(userId: string) {
    return await this.model.aggregate([
      { $match: { user: new Types.ObjectId(userId), createdAt: { $exists: true, $ne: null } } },
      {
        $group: {
          _id: { year: { $year: '$createdAt' } },
          totalExpense: { $sum: '$expense' }
        }
      },
      { $sort: { '_id.year': 1 } },
      { $project: { year: '$_id.year', totalExpense: 1, _id: 0 } }
    ]);
  }
}

const purchaseServices = new PurchaseServices(Purchase, 'Purchase');
export default purchaseServices;
