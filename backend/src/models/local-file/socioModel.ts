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

  static getEstadisticasPorEquipo() {
    const estadisticas: { _id: string; count: number; averageAge: number; minAge: number; maxAge: number }[] = [];

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
      const averageAge = sociosDelEquipo.reduce((sum, socio) => sum + socio.edad, 0) / count;
      const minAge = Math.min(...sociosDelEquipo.map(socio => socio.edad));
      const maxAge = Math.max(...sociosDelEquipo.map(socio => socio.edad));

      estadisticas.push({
        _id: equipo,
        count,
        averageAge: isNaN(averageAge) ? 0 : averageAge, // Maneja el caso de no tener socios
        minAge,
        maxAge,
      });
    }

    return estadisticas;
  }

}
