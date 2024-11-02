// routes/socioRoutes.ts
import express from 'express';
import { getTotalSocios, getPromedioEdadRacing, getCasadosUniversitarios, getNombresComunesRiver, getEstadisticasPorEquipo } from '../controllers/socioController';

const router = express.Router();

router.get('/total', getTotalSocios);

router.get('/promedio-edad-racing', getPromedioEdadRacing);

router.get('/casados-universitarios', getCasadosUniversitarios);

router.get('/nombres-comunes-river', getNombresComunesRiver);

// Ruta para obtener las estadísticas por equipo
router.get('/estadisticas-equipo', getEstadisticasPorEquipo);

export default router;
