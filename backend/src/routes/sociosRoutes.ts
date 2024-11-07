import express from 'express';
import { upload } from '../middleware/upload';
import { SocioController } from '../controllers/socioController';
import { CsvController } from '../controllers/socioCsvController';

export const sociosRouter = express.Router();

sociosRouter.post('/socios/upload', upload.single('file'), CsvController.procesarArchivo);

sociosRouter.get('/socios', SocioController.getSocios); 

sociosRouter.get('/socios/total-socios', SocioController.getTotalSocios); 

sociosRouter.get('/socios/promedio-edad', SocioController.getPromedioEdadPorEquipo);

sociosRouter.get('/socios/casados-estudios', SocioController.getCasadosConEstudios);

sociosRouter.get('/socios/nombres-comunes', SocioController.getNombresComunesPorEquipo);

sociosRouter.get('/socios/estadisticas-equipo', SocioController.getEstadisticasPorEquipo);

