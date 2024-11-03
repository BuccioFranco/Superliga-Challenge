import express from 'express';
import { upload } from '../middleware/upload';
import { SocioController } from '../controllers/socioController';

export const sociosRouter = express.Router();

sociosRouter.post('/upload', upload.single('file'), SocioController.procesarArchivo);

sociosRouter.get('/total-socios', SocioController.getTotalSocios); 

sociosRouter.get('/promedio-edad-racing', SocioController.getPromedioEdadRacing);

sociosRouter.get('/casados-estudios', SocioController.getCasadosConEstudios);

sociosRouter.get('/nombres-comunes-river', SocioController.getNombresComunesRiver);

sociosRouter.get('/estadisticas-equipo', SocioController.getEstadisticasPorEquipo);

