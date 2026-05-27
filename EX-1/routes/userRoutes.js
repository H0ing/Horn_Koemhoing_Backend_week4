import express from 'express';
import { listUser, getUser, createUser, updateUser, deleteUser } from '../controllers/userController.js';


const userRouter = express.Router();



// GET /users - List all users
userRouter.get('/', listUser);

// GET /users/:id - Get one user
userRouter.get('/:id', getUser);

// POST /users - Create new user
userRouter.post('/', createUser);

// PUT /users/:id - Update user
userRouter.put('/:id', updateUser);

// DELETE /users/:id - Delete user
userRouter.delete('/:id', deleteUser);


export default userRouter;