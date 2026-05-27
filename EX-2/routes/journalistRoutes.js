import { Router } from "express";
import {
  getAllJournalists,
  getJournalist,
  createJournalist,
  updateJournalist,
  deleteJournalist,
  getArticlesWithJournalist
} from "./../controllers/journalistController.js";


const journalistRouter = Router();



// •	GET /journalists — Get all journalists
journalistRouter.get('/', getAllJournalists);

// •	GET /journalists/:id — Get a single journalist
journalistRouter.get('/:id', getJournalist);

// •	POST /journalists — Create a new journalist
journalistRouter.post('/', createJournalist);


// •	PUT /journalists/:id — Update journalist info
journalistRouter.put('/:id', updateJournalist);

// •	DELETE /journalists/:id — Delete a journalist
journalistRouter.delete('/:id', deleteJournalist);

// •	GET /journalists/:id/articles — Article by specific journalist
journalistRouter.get('/:id/articles', getArticlesWithJournalist);

export default journalistRouter; 