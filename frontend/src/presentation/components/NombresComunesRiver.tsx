import useFetchData from '../hooks/useFetchData';
import { getNombresComunesRiver } from '../../application/servicies/SocioService';

const NombresComunesRiver = () => {

  const { data: nombres, error, loading } = useFetchData<{ nombre: string; count: number }[]>(getNombresComunesRiver);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">Los 5 Nombres Más Comunes entre Hinchas de River</h2>
      {loading ? (
        <p className="text-gray-500 text-center">Cargando...</p>
      ) : error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {nombres?.map((nombre, index) => (
            <div key={index} className="bg-blue-100 p-4 rounded-lg shadow hover:bg-blue-200 transition">
              <h3 className="text-lg font-medium text-blue-600">{nombre.nombre}</h3>
              <p className="text-gray-700">Cantidad: {nombre.count}</p>
            </div>
          ))}
        </div>
      )}
      
    </div>
  );
};

export default NombresComunesRiver;
