import fs from 'fs';
import path from 'path';
import { Socio } from '../types/sociosTypes';

export class SocioModel {
  static async obtenerDatos() {
    const filePath = path.join(__dirname, '../../data/socios.json');
    console.log("Ruta del archivo JSON:", filePath);
    try {
      const data = await fs.promises.readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error("Error al leer o analizar el archivo JSON:", error);
      return [];
    }
  }

  static async getTotalSocios(): Promise<{ total: number; ultimoId: string | null }> {
    const socios: Socio[] = await SocioModel.obtenerDatos();
    const total = socios.length;
    const ultimoId = total > 0 ? String(socios[total - 1].id) : null;

    return { total, ultimoId };
  }

  static async getPromedioEdadRacing(): Promise<{ promedioEdad: number }> {
    const socios: Socio[] = await SocioModel.obtenerDatos();
    const racingSocios = socios.filter(socio => socio.equipo === 'Racing');

    const totalEdad = racingSocios.reduce((sum: number, socio: Socio) => {
      const edad = Number(socio.edad);
      return sum + (isNaN(edad) ? 0 : edad);
    }, 0);

    const promedio = racingSocios.length > 0 ? Math.floor(totalEdad / racingSocios.length) : 0;

    return { promedioEdad: promedio };
  }

  static async getCasadosConEstudios(): Promise<Socio[]> {
    const socios: Socio[] = await SocioModel.obtenerDatos(); 
    return socios
      .filter(socio => socio.estadoCivil === 'Casado' && socio.nivelEstudios === 'Universitario')
      .sort((a, b) => a.edad - b.edad)
      .slice(0, 100);
  }

  static async getNombresComunesRiver(): Promise<{ nombre: string; count: number }[]> {
    const socios: Socio[] = await SocioModel.obtenerDatos(); // Obtener los datos
    const riverSocios = socios.filter(socio => socio.equipo === 'River');

    console.log("Socios de River:", riverSocios); // Verificar los socios de River

    const nombresContados: Record<string, number> = {};
    riverSocios.forEach(socio => {
      nombresContados[socio.nombre] = (nombresContados[socio.nombre] || 0) + 1;
    });

    console.log("Conteo de nombres:", nombresContados); // Verificar el conteo de nombres

    const nombresComunes = Object.entries(nombresContados)
      .map(([nombre, count]) => ({ nombre: nombre, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // Limitar a los 5 nombres más comunes

    console.log("Nombres más comunes de River:", nombresComunes); // Verificar los nombres más comunes

    return nombresComunes; // Devolver los nombres comunes
  }


  static async getEstadisticasPorEquipo(): Promise<{ _id: string; count: number; averageAge: number; minAge: number; maxAge: number }[]> {
    const estadisticas: { _id: string; count: number; averageAge: number; minAge: number; maxAge: number }[] = [];

    // Obtener los datos de socios desde el archivo JSON
    const socios: Socio[] = await SocioModel.obtenerDatos();

    // Agrupar los socios por equipo
    const gruposPorEquipo = socios.reduce((acc, socio) => {
      const equipo = socio.equipo;
      if (!acc[equipo]) {
        acc[equipo] = [];
      }
      acc[equipo].push(socio);
      return acc;
    }, {} as { [key: string]: Socio[] });

    // Calcular estadísticas por equipo
    for (const equipo in gruposPorEquipo) {
      const sociosDelEquipo = gruposPorEquipo[equipo];
      const count = sociosDelEquipo.length;

      if (count === 0) continue; // Evita calcular estadísticas si no hay socios

      const averageAge = Math.round(
        sociosDelEquipo.reduce((sum, socio) => sum + Number(socio.edad), 0) / count
      );
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
  }


}
