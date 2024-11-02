import { Socio } from '../../domain/models/SocioType';
import { EstadisticaEquipo } from '../../domain/models/StatsType';

const API_URL = 'http://localhost:3000/api/socios'; 

export const fetchTotalSocios = async (): Promise<number> => {
  const response = await fetch(`${API_URL}/total-socios`);
  if (!response.ok) {
    throw new Error('Error al obtener el total de socios');
  }
  const data = await response.json();
  return data.total;
};

export const fetchPromedioEdadRacing = async (): Promise<number> => {
  const response = await fetch(`${API_URL}/promedio-edad-racing`);
  if (!response.ok) {
    throw new Error('Error al obtener el promedio de edad de Racing');
  }
  const data = await response.json();
  return data.promedioEdad;
};

export const fetchCasadosConEstudios = async (): Promise<Socio[]> => {
  const response = await fetch(`${API_URL}/casados-estudios`);
  if (!response.ok) {
    throw new Error('Error al obtener los casados con estudios');
  }
  return response.json();
};

export const fetchNombresComunesRiver = async (): Promise<{ _id: string; count: number }[]> => {
  const response = await fetch(`${API_URL}/nombres-comunes-river`);
  if (!response.ok) {
    throw new Error('Error al obtener los nombres comunes de River');
  }
  return response.json();
};

export const fetchEstadisticasPorEquipo = async (): Promise<EstadisticaEquipo[]> => {
  const response = await fetch(`${API_URL}/estadisticas-equipo`);
  if (!response.ok) {
    throw new Error('Error al obtener las estadísticas por equipo');
  }
  return response.json();
};
