import { useState } from 'react';
import { Socio } from '../../domain/models/SocioType';
import { getUploadCsv } from '../../application/servicies/SocioService';

const useFileUpload = (onDataLoad: (data: Socio[]) => void, onClearData: () => void) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (selectedFile: File | null) => {
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      setError(null);
    } else {
      setError('Por favor, selecciona un archivo CSV válido.');
    }
  };

  const uploadFile = async () => {
    if (!file) {
      setError("Por favor, selecciona un archivo antes de enviar.");
      return;
    }

    try {
      const responseData: Socio[] = await getUploadCsv(file);
      onDataLoad(responseData);  // Cargar datos
      setError(null);
    } catch (error) {
      setError(`Error al cargar el archivo: ${(error as Error).message}`);
    }
  };

  const cancelFile = () => {
    setFile(null);
    setError(null);
    onClearData();  // Llamamos a la función de limpieza
  };

  return {
    file,
    error,
    handleFileSelect,
    uploadFile,
    cancelFile,
  };
};

export default useFileUpload;
