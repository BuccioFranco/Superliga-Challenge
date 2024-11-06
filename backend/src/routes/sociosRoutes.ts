import express from 'express';
import { upload } from '../middleware/upload';
import { SocioController } from '../controllers/socioController';
import { CsvController } from '../controllers/socioCsvController';

export const sociosRouter = express.Router();

sociosRouter.post('/upload', upload.single('file'), CsvController.procesarArchivo);

sociosRouter.get('/total-socios', SocioController.getTotalSocios); 

sociosRouter.get('/promedio-edad', SocioController.getPromedioEdadPorEquipo);

sociosRouter.get('/casados-estudios', SocioController.getCasadosConEstudios);

sociosRouter.get('/nombres-comunes', SocioController.getNombresComunesPorEquipo);

sociosRouter.get('/estadisticas-equipo', SocioController.getEstadisticasPorEquipo);

