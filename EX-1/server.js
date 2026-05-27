import express from 'express';
import users from './model/userModel.js';
import Logger from './middleware/logger.js';
import userRouter from './routes/userRoutes.js';
const app = express();
app.use(express.json());

// In-memory user store



// Logger middleware
app.use(Logger);

app.use('/users', userRouter);

// // GET /users - List all users
// app.get('/users', listUser);

// // GET /users/:id - Get one user
// app.get('/users/:id', getUser);

// // POST /users - Create new user
// app.post('/users', createUser);

// // PUT /users/:id - Update user
// app.put('/users/:id', updateUser);

// // DELETE /users/:id - Delete user
// app.delete('/users/:id', deleteUser);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
