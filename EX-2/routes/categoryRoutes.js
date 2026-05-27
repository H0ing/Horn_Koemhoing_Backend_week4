import { Router } from "express";

const categoryRouter = Router();

// GET /categories - Get all categories
categoryRouter.get('/')

// GET /categories/: id - Get a single category
categoryRouter.get('/:id')
// POST /categories - Add a new category

// PUT /categories/: id -Update a category
categoryRouter.put('/:id')
// DELETE /categories/: id-Delete a category
categoryRouter.delete('/:id')
// GET /categories/: id/articles - Articles from a categories
categoryRouter.get('/:id/articles')