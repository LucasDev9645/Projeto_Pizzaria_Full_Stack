import { Request, Response } from "express";

import { ListingCategoryService } from "../../services/category/ListingCategoriesService";

class ListingCategoryController {
  async handle(req: Request, res: Response) {
    const listingCategoriesService = new ListingCategoryService();

    const category = await listingCategoriesService.execute();

    return res.json(category);
  }
}

export { ListingCategoryController };
