import { Socio } from '../../domain/models/SocioType';
import { EstadisticaEquipo } from '../../domain/models/StatsType';

const API_URL = 'http://localhost:3000/api/socios'; 

export const uploadCsv = async (file: File): Promise<Socio[]> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Error al subir el archivo CSV');
  }

  const data = await response.json();
  return data; 
};

export const fetchTotalSocios = async (): Promise<number> => {
  const response = await fetch(`${API_URL}/total-socios`);
  if (!response.ok) {
    throw new Error('Error al obtener el total de socios');
  }
  const data = await response.json();
  return data.total;
};

export const fetchPromedioEdad = async (): Promise<{ equipo: string; promedioEdad: number }[]> => {
  const response = await fetch(`${API_URL}/promedio-edad`);
  if (!response.ok) {
    throw new Error('Error al obtener el promedio de edad');
  }
  const data = await response.json();
  return data;  
};

export const fetchCasadosConEstudios = async (): Promise<Socio[]> => {
  const response = await fetch(`${API_URL}/casados-estudios`);
  if (!response.ok) {
    throw new Error('Error al obtener los casados con estudios');
  }
  return response.json();
};

export const fetchNombresComunes = async (): Promise<{ equipo: string; nombresComunes: { nombre: string; count: number }[] }[]> => {
  const response = await fetch(`${API_URL}/nombres-comunes`);
  if (!response.ok) {
    throw new Error('Error al obtener los nombres comunes por equipo');
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
