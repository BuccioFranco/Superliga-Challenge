import { CardStatProps } from '../../../domain/models/ui/CardType';

const CardStat: React.FC<CardStatProps> = ({ title, value, loading, error, children }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
        {title}
      </h2>

      {loading ? (
        <p className="text-gray-500 text-center">Cargando...</p>
      ) : error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : (
        value !== null && (
          <div className="flex justify-center items-center h-20">
            <p className="text-4xl font-bold text-blue-700">{value}</p>
          </div>
        )
      )}

      {/* Si hay contenido adicional, lo mostramos */}
      {children}
    </div>
  );
};

export default CardStat;
