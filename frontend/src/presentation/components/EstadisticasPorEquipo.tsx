import { getEstadisticasPorEquipo } from "../../application/services/SocioService";
import useFetchData from '../hooks/useFetchData';

const EstadisticasPorEquipo= () => {
  
  const { data: estadisticas, error, loading } = useFetchData(getEstadisticasPorEquipo);  

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">Estadísticas por Equipo</h2>
      {loading ? (
        <p className="text-gray-500 text-center">Cargando...</p>
      ) : error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {estadisticas?.map((equipo, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-lg font-semibold mb-2 text-blue-600">{equipo._id}</h3>
              <p className="text-gray-700"><span className="font-medium">Socios:</span> {equipo.count}</p>
              <p className="text-gray-700"><span className="font-medium">Promedio de Edad:</span> {equipo.averageAge}</p>
              <p className="text-gray-700"><span className="font-medium">Edad Mínima:</span> {equipo.minAge}</p>
              <p className="text-gray-700"><span className="font-medium">Edad Máxima:</span> {equipo.maxAge}</p>
            </div>
          ))}
        </div>
      )}
      
    </div>
  );
};

export default EstadisticasPorEquipo;
