import fs from 'fs';
import path from 'path';
import { Socio } from '../../types/sociosTypes';
import { CustomError } from '../../utils/CustomError';

export class SocioModel {
  static async cargarDatos(): Promise<Socio[]> {
    const filePath = path.join(__dirname, '../../data/socios.json');
    try {
      const data = await fs.promises.readFile(filePath, 'utf-8');
      return JSON.parse(data) as Socio[];
    } catch (error) {
      throw new CustomError('Error al leer o analizar el archivo JSON', 500); 
    }
  }

  static async getTotalSocios(): Promise<{ total: number; ultimoId: string | null }> {
    try {
      const socios = await SocioModel.cargarDatos();
      return {
        total: socios.length,
        ultimoId: socios.length > 0 ? String(socios[socios.length - 1].id) : null
      };
    } catch (error) {
      throw new CustomError('Error al obtener el total de socios', 500); 
    }
  }

  static async getCasadosConEstudios(): Promise<Socio[]> {
    try {
      const socios = await SocioModel.cargarDatos();
      return socios
        .filter(socio => socio.estadoCivil === 'Casado' && socio.nivelEstudios === 'Universitario')
        .sort((a, b) => a.edad - b.edad)
        .slice(0, 100);
    } catch (error) {
      throw new CustomError('Error al obtener socios casados con estudios universitarios', 500); 
    }
  }

  static async getEstadisticasPorEquipo(): Promise<{ _id: string; count: number; averageAge: number; minAge: number; maxAge: number }[]> {
    try {
      const estadisticas: { _id: string; count: number; averageAge: number; minAge: number; maxAge: number }[] = [];
      const socios: Socio[] = await SocioModel.cargarDatos();
  
      const gruposPorEquipo = socios.reduce((acc, socio) => {
        const equipo = socio.equipo;
        if (!acc[equipo]) {
          acc[equipo] = [];
        }
        acc[equipo].push(socio);
        return acc;
      }, {} as { [key: string]: Socio[] });
  
      for (const equipo in gruposPorEquipo) {
        const sociosDelEquipo = gruposPorEquipo[equipo];
        const count = sociosDelEquipo.length;
  
        if (count === 0) continue;
  
        const totalEdad = sociosDelEquipo.reduce((sum, socio) => sum + Number(socio.edad), 0);
        const averageAge = Math.ceil(totalEdad / count); // Redondeo a entero
        const minAge = Math.min(...sociosDelEquipo.map(socio => Number(socio.edad)));
        const maxAge = Math.max(...sociosDelEquipo.map(socio => Number(socio.edad)));
  
        estadisticas.push({
          _id: equipo,
          count,
          averageAge,
          minAge,
          maxAge,
        });
      }
  
      return estadisticas;
    } catch (error) {
      throw new CustomError('Error al obtener estadísticas por equipo', 500);
    }
  }
  

  static async getPromedioEdadPorEquipo(): Promise<{ equipo: string; promedioEdad: number }[]> {
    try {
      const socios = await SocioModel.cargarDatos();
      const equipos = Array.from(new Set(socios.map(socio => socio.equipo)));  

      const estadisticas = equipos.map((equipo) => {
        const sociosDelEquipo = socios.filter(socio => socio.equipo === equipo);
        const totalEdad = sociosDelEquipo.reduce((sum, socio) => sum + (socio.edad || 0), 0);
        const promedioEdad = sociosDelEquipo.length > 0 ? Math.floor(totalEdad / sociosDelEquipo.length) : 0;
        
        return { equipo, promedioEdad };
      });

      return estadisticas;
    } catch (error) {
      throw new CustomError('Error al obtener el promedio de edad por equipo', 500);
    }
  }

  static async getNombresComunesPorEquipo(): Promise<{ equipo: string; nombresComunes: { nombre: string; count: number }[] }[]> {
    try {
      const socios = await SocioModel.cargarDatos();
      const equipos = Array.from(new Set(socios.map(socio => socio.equipo)));  

      const nombresComunesPorEquipo = equipos.map((equipo) => {
        const sociosDelEquipo = socios.filter(socio => socio.equipo === equipo);
        const nombreContador = SocioModel.contarNombres(sociosDelEquipo);

        const nombresComunes = Object.entries(nombreContador)
          .map(([nombre, count]) => ({ nombre, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5); 
        
        return { equipo, nombresComunes };
      });

      return nombresComunesPorEquipo;
    } catch (error) {
      throw new CustomError('Error al obtener los nombres comunes por equipo', 500);
    }
  }

  private static contarNombres(socios: Socio[]): Record<string, number> {
    return socios.reduce((contador, socio) => {
      contador[socio.nombre] = (contador[socio.nombre] || 0) + 1;
      return contador;
    }, {} as Record<string, number>);
  }
}
