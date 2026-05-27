import { Router } from "express";
import {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getArticlesByCategory,
} from "./../controllers/categoryController.js"



const categoryRouter = Router();




// GET /categories - Get all categories
categoryRouter.get('/',getAllCategories)

// GET /categories/: id - Get a single category
categoryRouter.get('/:id', getCategory)
// POST /categories - Add a new category
categoryRouter.post('/', createCategory)
// PUT /categories/: id -Update a category
categoryRouter.put('/:id', updateCategory)
// DELETE /categories/: id-Delete a category
categoryRouter.delete('/:id', deleteCategory)
// GET /categories/: id/articles - Articles from a categories
categoryRouter.get('/:id/articles', getArticlesByCategory)

export default categoryRouter;