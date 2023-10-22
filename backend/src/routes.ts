import { Router } from "express";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

import { isAuthenticated } from "./middlewares/isAuthenticated";

import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListingCategoryController } from "./controllers/category/ListingCategoriesController";

const router = Router();

//-- Rotas User --/
router.post("/users", new CreateUserController().handle);
router.post("/session", new AuthUserController().handle);
router.get("/me", isAuthenticated, new DetailUserController().handle);

//-- Rotas Category --/
router.post(
  "/category",
  isAuthenticated,
  new CreateCategoryController().handle
);

router.get(
  "/categories",
  isAuthenticated,
  new ListingCategoryController().handle
);

export { router };
