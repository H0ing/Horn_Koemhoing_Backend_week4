import { Router } from "express";

const articleRouter = Router();




// •	GET /articles — Get all articles
articleRouter.get('/')

// •	GET /articles/:id — Get a single article by ID
articleRouter.get('/:id')

// •	POST /articles — Create a new article
articleRouter.post('/')

// •	PUT /articles/:id — Update an existing article
articleRouter.put('/:id')

// •	DELETE /articles/:id — Delete an article
articleRouter.delete('/:id')


