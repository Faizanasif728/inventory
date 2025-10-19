import httpStatus from 'http-status';
import asyncHandler from '../../lib/asyncHandler';
import sendResponse from '../../lib/sendResponse';
import categoryServices from './category.services';

class CategoryController {
  private services = categoryServices;

  // create
  create = asyncHandler(async (req, res) => {
    const result = await this.services.create(req.body, req.user._id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Category created successfully!',
      data: result
    });
  });

  // read
  getAll = asyncHandler(async (req, res) => {
    const result = await this.services.getAll(req.query, req.user._id);

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Category retrieved successfully!',
      meta: {
        page,
        limit,
        total: result?.totalCount[0]?.total || 0,
        totalPage: Math.ceil((result?.totalCount[0]?.total || 0) / limit)
      },
      data: result.data
    });
  });

  // update
  update = asyncHandler(async (req, res) => {
    const result = await this.services.update(req.params.id, req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Category updated successfully!',
      data: result
    });
  });

  // delete
  delete = asyncHandler(async (req, res) => {
    await this.services.delete(req.params.id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Category deleted successfully!'
    });
  });
}

const categoryController = new CategoryController();
export default categoryController;
