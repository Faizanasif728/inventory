/* eslint-disable @typescript-eslint/no-explicit-any */
import BaseServices from '../baseServices';
import Category from './category.model';
import { Types } from 'mongoose';
import sortAndPaginatePipeline from '../../lib/sortAndPaginate.pipeline';

class CategoryServices extends BaseServices<any> {
  constructor(model: any, modelName: string) {
    super(model, modelName);
  }

  /**
   * Read all categories of user with search and pagination
   */
  async getAll(query: Record<string, unknown> = {}, userId: string) {
    const search = query.search ? query.search : '';

    const data = await this.model.aggregate([
      {
        $match: {
          user: new Types.ObjectId(userId),
          $or: [
            { name: { $regex: search as string, $options: 'i' } },
          ]
        }
      },
      ...sortAndPaginatePipeline(query)
    ]);

    const totalCount = await this.model.aggregate([
      {
        $match: {
          user: new Types.ObjectId(userId)
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: 1 }
        }
      },
      { $project: { _id: 0 } }
    ]);

    return { data, totalCount };
  }
}

const categoryServices = new CategoryServices(Category, 'Category');
export default categoryServices;
