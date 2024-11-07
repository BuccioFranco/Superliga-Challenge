import React, { useState } from 'react';
import ContentDisplay from '../components/contents/ContentDisplay';
import CsvReader from '../components/file/FileUploader';
import Sidebar from '../components/contents/SideBar'; // Componente Sidebar con MenuEquipo dentro
import { useDataLoader } from '../hooks/useDataLoader';
import MenuEquipo from '../components/contents/MenuEquipos';

const Home: React.FC = () => {
  const { dataLoaded, loadData, clearData, currentComponent, changeComponent, isVisible } = useDataLoader();
  const [selectedEquipo, setSelectedEquipo] = useState<string>('');

  const handleEquipoSelect = (equipo: string) => {
    setSelectedEquipo(equipo);
  };

  const showMenuEquipo = currentComponent === 'NombresComunes' || currentComponent === 'PromedioEdad';

  return (
    <div className="h-screen w-screen flex p-4 items-center">
      <div className="w-1/2 flex flex-col items-start justify-start pr-4">
        <CsvReader onDataLoad={loadData} onClearData={clearData} />
      </div>
  
      <div className="h-screen w-screen flex flex-grow p-4">
        {dataLoaded && (
          <>
            <div className="w-1/6 flex flex-col items-center justify-center pr-4">
              <Sidebar onComponentChange={changeComponent} currentComponent={currentComponent} />
            </div>
  
            {showMenuEquipo && (
              <div className="w-1/3 mr-[-250px] flex flex-col items-center justify-center z-10">
                <MenuEquipo onEquipoSelect={handleEquipoSelect} />
              </div>
            )}
  
            <div className="flex-grow flex items-center justify-center w-1/2">
              <ContentDisplay
                isVisible={isVisible}
                currentComponent={currentComponent}
                selectedEquipo={selectedEquipo}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
  
};

export default Home;
