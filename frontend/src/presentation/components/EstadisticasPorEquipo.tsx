// src/presentation/components/EstadisticasPorEquipo.tsx
import React from 'react';

interface EquipoStats {
  equipo: string;
  promedioEdad: number;
  edadMinima: number;
  edadMaxima: number;
  totalSocios: number;
}

interface EstadisticasPorEquipoProps {
  estadisticas: EquipoStats[];
}

export const EstadisticasPorEquipo: React.FC<EstadisticasPorEquipoProps> = ({ estadisticas }) => (
  <div>
    <h2 className="text-lg font-semibold">Estadísticas por equipo:</h2>
    <ul>
      {estadisticas.map((equipo, index) => (
        <li key={index}>
          <strong>{equipo.equipo}</strong>: {equipo.totalSocios} socios, promedio de edad {equipo.promedioEdad.toFixed(2)}, edad mínima {equipo.edadMinima}, edad máxima {equipo.edadMaxima}
        </li>
      ))}
    </ul>
  </div>
);
