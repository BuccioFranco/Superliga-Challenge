import React, { useState } from 'react';

import TotalSocios from '../components/TotalSocios';
import PromedioEdadRacing from '../components/PromedioEdadRacing';
import CasadosConEstudios from '../components/ListaCasadosUniversitarios';
import NombresComunesRiver from '../components/NombresComunesRiver';
import EstadisticasPorEquipo from '../components/EstadisticasPorEquipo';
import CsvReader from '../components/FileUploader';

const Home: React.FC = () => {
  const [dataLoaded, setDataLoaded] = useState(false); // Estado para controlar si se han cargado los datos

  const handleDataLoad = () => {
    setDataLoaded(true); // Cambiar a true una vez que los datos han sido cargados
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Gestión de Socios</h1>
      
      {dataLoaded && ( // Solo renderizar las estadísticas si los datos han sido cargados
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <TotalSocios />
          <PromedioEdadRacing />
          <CasadosConEstudios />
          <NombresComunesRiver />
          <EstadisticasPorEquipo />
        </div>
      )}
      
      <CsvReader onDataLoad={handleDataLoad} /> {/* Componente para cargar el CSV */}
    </div>
  );
  
};

export default Home;
