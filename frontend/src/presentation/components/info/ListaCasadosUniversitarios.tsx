import { Socio } from '../../../domain/models/info/SocioType';
import { getCasadosConEstudios } from '../../../application/services/SocioService';
import usePagination from '../../hooks/usePagination';
import useFetchData from '../../hooks/useFetchData';

const ITEMS_PER_PAGE = 10;

const CasadosConEstudios = () => {
  const { data: socios, error, loading } = useFetchData<Socio[]>(getCasadosConEstudios);
  const {
    currentItems,
    currentPage,
    totalPages,
    handleNextPage,
    handlePreviousPage,
  } = usePagination(socios || [], ITEMS_PER_PAGE);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
        Listado de Casados con Estudios Universitarios
      </h2>
      {loading ? (
        <p className="text-gray-500 text-center">Cargando...</p>
      ) : error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Nombre
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Edad
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Equipo
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((socio, index) => (
                <tr key={index} className="border-t last:border-b hover:bg-gray-50">
                  <td className="px-4 py-2 text-gray-700">{socio.nombre}</td>
                  <td className="px-4 py-2 text-gray-700">{socio.edad}</td>
                  <td className="px-4 py-2 text-gray-700">{socio.equipo}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-center items-center space-x-4 mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm rounded bg-gray-300 text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition"
            >
              Anterior
            </button>
            <span className="text-sm text-gray-600">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm rounded bg-gray-300 text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CasadosConEstudios;
