import { Socio } from '../../domain/models/SocioType';
import { EstadisticaEquipo } from '../../domain/models/StatsType';
import {
  uploadCsv,
  fetchTotalSocios,
  fetchPromedioEdad,
  fetchCasadosConEstudios,
  fetchNombresComunes,
  fetchEstadisticasPorEquipo,
} from '../../insfractucture/api/socioService';

export const getUploadCsv = async (file: File): Promise<Socio[]> => {
  return uploadCsv(file);
};

export const getTotalSocios = async (): Promise<number> => {
  return fetchTotalSocios();
};

export const getPromedioEdad = async (equipo: string): Promise<number> => {
  try {
    const response = await fetchPromedioEdad();  
    const equipoData = response.find((item: { equipo: string }) => item.equipo.toLowerCase() === equipo.toLowerCase());

    if (!equipoData) {
      throw new Error(`No se encontraron datos para el equipo: ${equipo}`);
    }

    return equipoData.promedioEdad;
  } catch (error) {
    console.error('Error al obtener el promedio de edad:', error);
    throw error;  
  }
};


export const getCasadosConEstudios = async (): Promise<Socio[]> => {
  return fetchCasadosConEstudios();
};

export const getNombresComunes = async (equipo: string | null): Promise<{ nombre: string; count: number }[]> => {
  if (!equipo) {
    throw new Error('No se ha seleccionado un equipo');
  }

  try {
    const response = await fetchNombresComunes();
    const equiposArray = response.nombresComunes;
    const equipoData = equiposArray.find(item => item.equipo.toLowerCase() === equipo.toLowerCase());

    if (!equipoData) {
      throw new Error(`No se encontraron datos para el equipo: ${equipo}`);
    }

    return equipoData.nombresComunes; 
  } catch (error) {
    console.error('Error al obtener los nombres comunes:', error);
    throw error;
  }
};


export const getEstadisticasPorEquipo = async (): Promise<EstadisticaEquipo[]> => {
  return fetchEstadisticasPorEquipo();
};
