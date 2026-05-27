import { Router } from "express";
import { journalists } from "../models/data";


const journalistRouter = Router();


// •	GET /journalists — Get all journalists
journalistRouter.get('/')

// •	GET /journalists/:id — Get a single journalist
journalistRouter.get('/:id')

// •	POST /journalists — Create a new journalist
journalistRouter.post('/')


// •	PUT /journalists/:id — Update journalist info
journalistRouter.put('/:id')

// •	DELETE /journalists/:id — Delete a journalist
journalistRouter.delete('/:id')

// •	GET /journalists/:id/articles — Article by specific journalist
journalistRouter.get('/:id/articles')