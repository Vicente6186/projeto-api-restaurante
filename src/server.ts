import express from  'express';
import errorMiddleware from './middlewares/error-middleware';
import routes from './routes';

const app = express();
app.use(express.json());
app.use(routes)
app.use(errorMiddleware)

app.listen(3000, () => console.log('Server running on port 3000'));