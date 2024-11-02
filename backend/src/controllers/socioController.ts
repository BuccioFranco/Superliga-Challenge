import { Request, Response } from 'express';
import { contarTotalSocios, promedioEdadRacing, primeros100CasadosUniversitarios, nombresMasComunesRiver, estadisticasPorEquipo } from '../utils/dataProcessing';
import { Socio } from '../models/socioType';
import { parseCSV } from '../csvParser';  

let sociosData: Socio[] = [];

const cargarDatos = async () => {
    try {
        sociosData = await parseCSV('./src/temporal/socios.csv');  
    } catch (error) {
        console.error("Error al cargar el archivo CSV:", error);
    }
};

export const getTotalSocios = (_req: Request, res: Response) => {
    const total = contarTotalSocios(sociosData);
    res.json({ total });
};

export const getPromedioEdadRacing = (_req: Request, res: Response) => {
    const promedio = promedioEdadRacing(sociosData);
    res.json({ promedio });
};

export const getCasadosUniversitarios = (_req: Request, res: Response) => {
    const lista = primeros100CasadosUniversitarios(sociosData);
    res.json({ lista });
};

export const getNombresComunesRiver = (_req: Request, res: Response) => {
    const nombres = nombresMasComunesRiver(sociosData);
    res.json({ nombres });
};

export const getEstadisticasPorEquipo = (_req: Request, res: Response) => {
    const estadisticas = estadisticasPorEquipo(sociosData);
    res.json({ estadisticas });
};

cargarDatos();
