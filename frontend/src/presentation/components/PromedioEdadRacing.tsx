import { getPromedioEdadRacing } from '../../application/servicies/SocioService';
import useFetchData from '../hooks/useFetchData';

const PromedioEdadRacing = () => {
  const { data: promedioEdad, error, loading } = useFetchData<number>(getPromedioEdadRacing);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
        Promedio de Edad de Socios de Racing
      </h2>
      {loading ? (
        <p className="text-gray-500 text-center">Cargando...</p>
      ) : error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : (
        <div className="flex justify-center items-center h-20">
          <p className="text-4xl font-bold text-blue-700">
            {promedioEdad?.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
};

export default PromedioEdadRacing;
