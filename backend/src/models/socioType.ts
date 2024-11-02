export interface Socio {
  nombre: string;
  edad: number;
  equipo: string;
  estadoCivil: string;
  nivelEstudios: string;
}

export interface EquipoEstadisticas {
  equipo: string;
  promedioEdad: number;
  minEdad: number;
  maxEdad: number;
  total: number; 
}