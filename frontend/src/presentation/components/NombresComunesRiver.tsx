import React, { useEffect, useState } from 'react';
import { getNombresComunesRiver } from '../../application/servicies/SocioService';

const NombresComunesRiver: React.FC = () => {
  // Cambia el tipo de estado aquí
  const [nombres, setNombres] = useState<{ nombre: string; count: number }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getNombres = async () => {
      try {
        const data = await getNombresComunesRiver();
        setNombres(data);
      } catch (error) {
        console.error(error);
        setError('Error al obtener los nombres comunes de River');
      }
    };

    getNombres();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Los 5 Nombres Más Comunes entre Hinchas de River</h2>
      {error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <ul className="list-disc pl-5">
          {nombres.map((nombre, index) => (
            <li key={index} className="mb-1">{nombre.nombre} - {nombre.count}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NombresComunesRiver;
