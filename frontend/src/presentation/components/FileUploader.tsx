// src/presentation/components/CsvReader.tsx
import React, { useState } from 'react';
import Papa from 'papaparse';
import { Socio } from '../../domain/models/SocioType';

interface CsvReaderProps {
  onDataLoad: () => void; // Propiedad para manejar la carga de datos
}

const CsvReader: React.FC<CsvReaderProps> = ({ onDataLoad }) => {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<Socio[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
      setError(null); 
    } else {
      setError("Por favor, selecciona un archivo.");
    }
  };

  const handleFileSubmit = () => {
    if (!file) {
      setError("Por favor, selecciona un archivo antes de enviar.");
      return;
    }

    Papa.parse(file, {
      delimiter: ';', 
      header: false, 
      skipEmptyLines: true,
      complete: (results) => {
        const parsedData: string[][] = results.data as string[][];

        if (parsedData.length > 0) {
          const filteredData: Socio[] = parsedData.map((row) => ({
            nombre: row[0], 
            edad: Number(row[1]) || 0, // Convertir a número, manejar NaN
            equipo: row[2], 
            estadoCivil: row[3], 
            nivelEstudios: row[4], 
          }));

          setData(filteredData);
          onDataLoad(); // Notificar que los datos han sido cargados
          setError(null);
        } else {
          setError("El archivo no contiene datos.");
        }
      },
      error: (err) => {
        setError(`Error al leer el archivo: ${err.message}`);
      },
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Cargar archivo CSV de Socios</h2>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="mb-4 border rounded-lg p-2"
      />
      <button
        onClick={handleFileSubmit}
        className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition duration-200"
      >
        Enviar
      </button>
      {error && <p className="text-red-600 mt-4">{error}</p>}
      {data.length > 0 && (
        <div className="mt-6 overflow-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Nombre</th>
                <th className="border px-4 py-2">Edad</th>
                <th className="border px-4 py-2">Equipo</th>
                <th className="border px-4 py-2">Estado Civil</th>
                <th className="border px-4 py-2">Nivel de Estudios</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="border px-4 py-2">{row.nombre}</td>
                  <td className="border px-4 py-2">{row.edad}</td>
                  <td className="border px-4 py-2">{row.equipo}</td>
                  <td className="border px-4 py-2">{row.estadoCivil}</td>
                  <td className="border px-4 py-2">{row.nivelEstudios}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CsvReader;
