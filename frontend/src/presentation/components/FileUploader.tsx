import React from 'react';
import { Socio } from '../../domain/models/SocioType';
import useFileUpload from '../hooks/useFileUpload';

interface CsvReaderProps {
  onDataLoad: (data: Socio[]) => void;
  onClearData: () => void;
}

const CsvReader: React.FC<CsvReaderProps> = ({ onDataLoad, onClearData }) => {
  // Hook para manejar la selección y carga de archivos
  const { file, error, handleFileSelect, uploadFile, cancelFile } = useFileUpload(
    onDataLoad,
    onClearData // Llamada a onClearData cuando se elimina el archivo
  );

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-xs mx-auto">
      <h2 className="text-lg font-semibold text-center mb-4">Añadir archivo</h2>

      {!file ? (
        <label className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 text-center text-gray-500 hover:bg-gray-100 transition duration-200">
          <span className="text-blue-500 font-semibold">Seleccionar archivo</span>
          <input
            type="file"
            accept=".csv"
            onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
            className="hidden"
          />
        </label>
      ) : (
        <div className="flex flex-col items-center">
          <p className="text-gray-700 mb-2">{file.name}</p>
          <button
            onClick={() => {
              cancelFile();
              onClearData(); // Llamamos a onClearData al eliminar el archivo
            }}
            className="bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600 transition duration-200 mb-2"
          >
            Eliminar archivo
          </button>
          <button
            onClick={uploadFile}
            className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition duration-200"
          >
            Enviar
          </button>
        </div>
      )}

      {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
    </div>
  );
};

export default CsvReader;
