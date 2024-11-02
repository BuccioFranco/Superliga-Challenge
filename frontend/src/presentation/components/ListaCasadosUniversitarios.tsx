// src/presentation/components/CasadosConEstudios.tsx
import React, { useEffect, useState } from 'react';
import { Socio } from '../../domain/models/SocioType';
import { getCasadosConEstudios } from '../../application/servicies/SocioService'; 

const CasadosConEstudios: React.FC = () => {
  const [socios, setSocios] = useState<Socio[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const data = await getCasadosConEstudios();
        setSocios(data);
      } catch (error) {
        console.error(error);
        setError('Error al obtener los casados con estudios');
      }
    };

    fetchTotal();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Listado de Casados con Estudios Universitarios</h2>
      {error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Nombre</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Edad</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Equipo</th>
            </tr>
          </thead>
          <tbody>
            {socios.map((socio, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{socio.nombre}</td>
                <td className="border border-gray-300 px-4 py-2">{socio.edad}</td>
                <td className="border border-gray-300 px-4 py-2">{socio.equipo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CasadosConEstudios;
