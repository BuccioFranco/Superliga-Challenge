import { getTotalSocios } from '../../application/services/SocioService';
import useFetchData from '../hooks/useFetchData';

const TotalSocios = () => {

  const { data: total, error, loading } = useFetchData<number>(getTotalSocios);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm mx-auto ">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
        Total de Socios Registrados
      </h2>
      {error && <p className="text-red-600 text-center">{error}</p>}
      {loading ? (
        <p className="text-gray-500">Cargando...</p>
      ) : (
        <div className="flex justify-center items-center h-20">
          <p className="text-4xl font-bold text-blue-700">{total}</p>
        </div>
      )}
    </div>
  );
};

export default TotalSocios;
