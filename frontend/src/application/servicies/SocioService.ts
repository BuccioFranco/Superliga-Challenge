// src/application/services/SocioService.ts
import { Socio } from '../../domain/models/SocioType';
import { EstadisticaEquipo } from '../../domain/models/StatsType';
import {
  fetchTotalSocios,
  fetchPromedioEdadRacing,
  fetchCasadosConEstudios,
  fetchNombresComunesRiver,
  fetchEstadisticasPorEquipo,
} from '../../insfractucture/api/socioService';

export const getSocios = async (): Promise<Socio[]> => {
  const response = await fetch('http://localhost:3000/api/socios');
  if (!response.ok) {
    throw new Error('Error al obtener los socios');
  }
  return response.json();
};

export const getTotalSocios = async (): Promise<number> => {
  return fetchTotalSocios();
};

export const getPromedioEdadRacing = async (): Promise<number> => {
  return fetchPromedioEdadRacing();
};

export const getCasadosConEstudios = async (): Promise<Socio[]> => {
  return fetchCasadosConEstudios();
};

export const getNombresComunesRiver = async (): Promise<{ _id: string; count: number }[]> => {
  return fetchNombresComunesRiver();
};

export const getEstadisticasPorEquipo = async (): Promise<EstadisticaEquipo[]> => {
  return fetchEstadisticasPorEquipo();
}; 
