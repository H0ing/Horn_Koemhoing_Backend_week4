import express from 'express';
import { articles } from './models/data.js';
import articleRouter from './routes/articleRoutes.js';
import categoryRouter from './routes/categoryRoutes.js';
import journalistRouter from './routes/journalistRoutes.js';

const app = express();

const PORT = 3000;

// app.get('/', (req, res) => {
//     res.json(articles)
// });
app.use(express.json())
app.use('/articles', articleRouter);
app.use('/categories', categoryRouter);
app.use('journalists', journalistRouter);

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});