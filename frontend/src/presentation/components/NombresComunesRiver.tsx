// src/presentation/components/NombresComunesRiver.tsx
import React, { useEffect, useState } from 'react';
import { getNombresComunesRiver } from '../../application/servicies/SocioService'; 

const NombresComunesRiver: React.FC = () => {
  const [nombres, setNombres] = useState<{ _id: string; count: number }[]>([]);
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
            <li key={index} className="mb-1">{nombre._id} - {nombre.count}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NombresComunesRiver;
