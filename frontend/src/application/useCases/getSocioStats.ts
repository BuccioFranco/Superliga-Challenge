import { getSocios } from "../../insfractucture/api/socioService";
import { Socio } from "../../domain/models/SocioType";

export interface SocioStats {
  totalSocios: number;
  promedioEdadRacing: number;
  primeras100CasadasUniversitarias: Socio[];
  nombresComunesRiver: string[];
  estadisticasPorEquipo: {
    equipo: string;
    promedioEdad: number;
    edadMinima: number;
    edadMaxima: number;
    totalSocios: number;
  }[];
}

export const  processSocioData = async (): Promise<SocioStats> => {
  const socios = await getSocios();

  // Procesamiento de la data para cada una de las estadísticas requeridas:
  const totalSocios = socios.length;
  const sociosRacing = socios.filter(socio => socio.equipo === "Racing");
  const promedioEdadRacing = sociosRacing.reduce((acc, socio) => acc + socio.edad, 0) / sociosRacing.length;

  const primeras100CasadasUniversitarias = socios
    .filter(s => s.estadoCivil === "Casado" && s.nivelEstudios === "Universitario")
    .sort((a, b) => a.edad - b.edad)
    .slice(0, 100);

  const nombresRiver = socios
    .filter(s => s.equipo === "River")
    .map(s => s.nombre);
  const nombresComunesRiver = nombresRiver
    .reduce((acc, nombre) => {
      acc[nombre] = (acc[nombre] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  const nombresComunesArray = Object.entries(nombresComunesRiver)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([nombre]) => nombre);

  const equipos = Array.from(new Set(socios.map(s => s.equipo)));
  const estadisticasPorEquipo = equipos.map(equipo => {
    const sociosEquipo = socios.filter(s => s.equipo === equipo);
    const promedioEdad = sociosEquipo.reduce((acc, s) => acc + s.edad, 0) / sociosEquipo.length;
    const edades = sociosEquipo.map(s => s.edad);
    return {
      equipo,
      promedioEdad,
      edadMinima: Math.min(...edades),
      edadMaxima: Math.max(...edades),
      totalSocios: sociosEquipo.length,
    };
  }).sort((a, b) => b.totalSocios - a.totalSocios);

  return {
    totalSocios,
    promedioEdadRacing,
    primeras100CasadasUniversitarias,
    nombresComunesRiver: nombresComunesArray,
    estadisticasPorEquipo,
  };
};