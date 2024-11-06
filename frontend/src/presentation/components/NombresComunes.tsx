import React, { useCallback } from 'react';
import { getNombresComunes } from '../../application/services/SocioService';
import useFetchData from '../hooks/useFetchData';

interface NombresComunesProps {
  selectedEquipo: string | null;
}

const NombresComunes: React.FC<NombresComunesProps> = ({ selectedEquipo }) => {
  const fetchNombresComunes = useCallback(() => {
    if (!selectedEquipo) return Promise.resolve([]);
    return getNombresComunes(selectedEquipo);
  }, [selectedEquipo]);

  const { data: nombres, loading, error } = useFetchData(fetchNombresComunes, [selectedEquipo]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
        Nombres Comunes para {selectedEquipo || 'No seleccionado'}
      </h2>

      {loading ? (
        <p className="text-gray-500 text-center">Cargando...</p>
      ) : error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : (
        <div>
          {nombres?.map((nombre, index) => (
            <div key={index} className="mb-4">
              <div className="bg-blue-100 p-4 rounded-lg shadow hover:bg-blue-200 transition">
                <h3 className="text-lg font-medium text-blue-600">{nombre.nombre}</h3>
                <p className="text-gray-700">Cantidad: {nombre.count}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NombresComunes;
