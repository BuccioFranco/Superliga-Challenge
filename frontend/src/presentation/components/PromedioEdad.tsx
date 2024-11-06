import React from 'react';
import { getPromedioEdad } from '../../application/services/SocioService';
import useFetchData from '../hooks/useFetchData';

interface PromedioEdadProps {
  selectedEquipo: string | null;
}

const PromedioEdad: React.FC<PromedioEdadProps> = ({ selectedEquipo }) => {
  const { data: promedioEdad, loading, error } = useFetchData(
    () => (selectedEquipo ? getPromedioEdad(selectedEquipo) : Promise.resolve(null)),
    [selectedEquipo]
  );

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
        Promedio de Edad de Socios de {selectedEquipo || 'No seleccionado'}
      </h2>
      {loading ? (
        <p className="text-gray-500 text-center">Cargando...</p>
      ) : error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : (
        promedioEdad !== null && (
          <div className="flex justify-center items-center h-20">
            <p className="text-4xl font-bold text-blue-700">
              {promedioEdad.toFixed(2)} años
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default PromedioEdad;
