import React from 'react';
import useFileUpload from '../../hooks/useFileUpload';
import { CsvReaderProps } from '../../../domain/models/file/CsvReaderType';
import FileActionButton from '../ui/FileActionButton';

const CsvReader: React.FC<CsvReaderProps> = ({ onDataLoad, onClearData }) => {
  const { file, error, handleFileSelect, uploadFile, cancelFile } = useFileUpload(
    onDataLoad,
    onClearData
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
          <FileActionButton
            onClick={() => {
              cancelFile();
              onClearData();
            }}
            text="Eliminar archivo"
            bgColor="bg-red-500"
            hoverColor="bg-red-600"
          />
          <FileActionButton
            onClick={uploadFile}
            text="Enviar"
            bgColor="bg-blue-500"
            hoverColor="bg-blue-600"
          />
        </div>
      )}

      {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
    </div>
  );
};

export default CsvReader;
