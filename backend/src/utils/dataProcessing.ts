import { Socio, EquipoEstadisticas } from "../models/socioType";

export const contarTotalSocios = (data: Socio[]): number => {
    return data.length;
};

export const promedioEdadRacing = (data: Socio[]): number => {
    const racingSocios = data.filter(socio => socio.equipo === "Racing");
    const totalEdad = racingSocios.reduce((acc, socio) => acc + socio.edad, 0);
    return racingSocios.length ? totalEdad / racingSocios.length : 0;
};

export const primeros100CasadosUniversitarios = (data: Socio[]): Socio[] => {
    return data
        .filter(socio => socio.estadoCivil === "Casado" && socio.nivelEstudios === "Universitario")
        .sort((a, b) => a.edad - b.edad)
        .slice(0, 100);
};

export const nombresMasComunesRiver = (data: Socio[]): string[] => {
    const riverSocios = data.filter(socio => socio.equipo === "River");
    const nombreContador: Record<string, number> = {};

    riverSocios.forEach(socio => {
        nombreContador[socio.nombre] = (nombreContador[socio.nombre] || 0) + 1;
    });

    return Object.entries(nombreContador)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([nombre]) => nombre);
};

export const estadisticasPorEquipo = (data: Socio[]): EquipoEstadisticas[] => {
    const equipos: Record<string, { total: number, totalEdad: number, minEdad: number, maxEdad: number }> = {};

    data.forEach(socio => {
        const equipo = socio.equipo;
        if (!equipos[equipo]) {
            equipos[equipo] = { total: 0, totalEdad: 0, minEdad: Infinity, maxEdad: -Infinity };
        }
        
        equipos[equipo].total++;
        equipos[equipo].totalEdad += socio.edad;
        equipos[equipo].minEdad = Math.min(equipos[equipo].minEdad, socio.edad);
        equipos[equipo].maxEdad = Math.max(equipos[equipo].maxEdad, socio.edad);
    });

    return Object.entries(equipos).map(([equipo, stats]) => ({
        equipo,
        promedioEdad: stats.totalEdad / stats.total,
        minEdad: stats.minEdad,
        maxEdad: stats.maxEdad,
        total: stats.total
    })).sort((a, b) => b.total - a.total);
};
