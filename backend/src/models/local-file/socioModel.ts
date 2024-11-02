import { Socio } from '../types/sociosTypes';

let socios: Socio[] = []; 

export class SocioModel {
  private static socios: Socio[] = [];

  static async getTotalSocios(): Promise<number> {
    return socios.length + 1; 
  }

  static async procesarDatos(sociosData: Socio[]): Promise<void> {
    socios = sociosData; 
  }

  static getPromedioEdadRacing(): number {
    const racingSocios = this.socios.filter(socio => socio.equipo === 'Racing');
    const totalEdad = racingSocios.reduce((sum, socio) => sum + socio.edad, 0);
    return racingSocios.length > 0 ? totalEdad / racingSocios.length : 0;
  }

  static getCasadosConEstudios(): Socio[] {
    return this.socios
      .filter(socio => socio.estadoCivil === 'Casado' && socio.nivelEstudios === 'Universitario')
      .sort((a, b) => a.edad - b.edad) 
      .slice(0, 100); 
  }

  static getNombresComunesRiver(): { _id: string; count: number }[] {
    const riverSocios = this.socios.filter(socio => socio.equipo === 'River');

    const nombresContados: Record<string, number> = {};
    riverSocios.forEach(socio => {
      nombresContados[socio.nombre] = (nombresContados[socio.nombre] || 0) + 1;
    });

    const nombresComunes = Object.entries(nombresContados)
      .map(([nombre, count]) => ({ _id: nombre, count }))
      .sort((a, b) => b.count - a.count) // Ordenar de mayor a menor
      .slice(0, 5); // Tomar los 5 nombres más comunes

    return nombresComunes;
  }

  static getEstadisticasPorEquipo(): Record<string, { cantidad: number; promedioEdad: number; menorEdad: number; mayorEdad: number }> {
    const estadisticas: Record<string, { cantidad: number; promedioEdad: number; menorEdad: number; mayorEdad: number }> = {};

    this.socios.forEach(socio => {
      if (!estadisticas[socio.equipo]) {
        estadisticas[socio.equipo] = {
          cantidad: 0,
          promedioEdad: 0,
          menorEdad: Infinity,
          mayorEdad: -Infinity,
        };
      }

      estadisticas[socio.equipo].cantidad++;
      estadisticas[socio.equipo].promedioEdad += socio.edad; 
      estadisticas[socio.equipo].menorEdad = Math.min(estadisticas[socio.equipo].menorEdad, socio.edad);
      estadisticas[socio.equipo].mayorEdad = Math.max(estadisticas[socio.equipo].mayorEdad, socio.edad);
    });

    for (const equipo in estadisticas) {
      estadisticas[equipo].promedioEdad /= estadisticas[equipo].cantidad;
    }

    return estadisticas;
  }

}
