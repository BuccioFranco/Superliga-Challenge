import express from 'express';
import socioRoutes from './routes/sociosRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api/socios', socioRoutes);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});