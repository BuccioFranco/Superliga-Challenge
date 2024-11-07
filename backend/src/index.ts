import express, { Request, Response, NextFunction } from 'express';
import { corsMiddleware } from './middleware/cors';
import { sociosRouter } from './routes/sociosRoutes';
import { CustomError } from './utils/CustomError';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(corsMiddleware());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use('/api', sociosRouter);

app.use((err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.message); 

  const statusCode = err.status || 500; 
  const message = err.message || 'Algo salió mal';

  res.status(statusCode).json({ error: message });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

export default app;  