// src/presentation/components/PromedioEdadRacing.tsx
import React, { useEffect, useState } from 'react';
import { getPromedioEdadRacing } from '../../application/servicies/SocioService';

const PromedioEdadRacing: React.FC = () => {
  const [promedioEdad, setPromedioEdad] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPromedio = async () => {
      try {
        const promedio = await getPromedioEdadRacing();
        setPromedioEdad(promedio);
      } catch (error) {
        console.error(error);
        setError('Error al obtener el promedio de edad de socios de Racing');
      }
    };

    fetchPromedio();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-2">Promedio de Edad de Socios de Racing</h2>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <p className="text-lg font-semibold">
          {promedioEdad !== null ? promedioEdad.toFixed(2) : 'Cargando...'}
        </p>
      )}
    </div>
  );
  
};

export default PromedioEdadRacing;
