import { Socio } from '../../domain/models/SocioType';
import { EstadisticaEquipo } from '../../domain/models/StatsType';
import {
  uploadCsv,
  fetchTotalSocios,
  fetchPromedioEdadRacing,
  fetchCasadosConEstudios,
  fetchNombresComunesRiver,
  fetchEstadisticasPorEquipo,
} from '../../insfractucture/api/socioService';

export const getUploadCsv = async (file: File): Promise<Socio[]> => {
  return uploadCsv(file);
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

export const getNombresComunesRiver = async (): Promise<{ nombre: string; count: number }[]> => {
  const response = await fetchNombresComunesRiver();
  return response.nombresComunes; 
};

export const getEstadisticasPorEquipo = async (): Promise<EstadisticaEquipo[]> => {
  return fetchEstadisticasPorEquipo();
};
