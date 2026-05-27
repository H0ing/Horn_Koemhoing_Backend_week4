import { Router } from "express";
import {
  getAllArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle
} from "./../controllers/articleController.js";

const articleRouter = Router();




// •	GET /articles — Get all articles
articleRouter.get('/', getAllArticles);

// •	GET /articles/:id — Get a single article by ID
articleRouter.get('/:id', getArticle);

// •	POST /articles — Create a new article
articleRouter.post('/', createArticle);

// •	PUT /articles/:id — Update an existing article
articleRouter.put('/:id', updateArticle);

// •	DELETE /articles/:id — Delete an article
articleRouter.delete('/:id', deleteArticle);


export default articleRouter;