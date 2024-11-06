import express from 'express';
import { corsMiddleware } from './middleware/cors';
import { sociosRouter } from './routes/sociosRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(corsMiddleware());
app.use(express.json());
app.use('/api/socios', sociosRouter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true })); 

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
