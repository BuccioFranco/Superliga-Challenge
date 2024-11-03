import React, { useEffect, useState } from 'react';
import { EstadisticaEquipo } from '../../domain/models/StatsType';
import { getEstadisticasPorEquipo } from '../../application/servicies/SocioService'; 

const EstadisticasPorEquipo: React.FC = () => {
  const [estadisticas, setEstadisticas] = useState<EstadisticaEquipo[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getEstadisticas = async () => {
      try {
        const data = await getEstadisticasPorEquipo();
        setEstadisticas(data);
      } catch (error) {
        console.error(error);
        setError('Error al obtener las estadísticas por equipo');
      }
    };

    getEstadisticas();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Estadísticas por Equipo</h2>
      {error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <ul className="list-disc pl-5">
          {estadisticas.map((equipo, index) => (
            <li key={index} className="mb-2">
              {equipo._id}: {equipo.count} socios, Promedio de Edad: {equipo.averageAge}, Edad Mínima: {equipo.minAge}, Edad Máxima: {equipo.maxAge}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EstadisticasPorEquipo;
