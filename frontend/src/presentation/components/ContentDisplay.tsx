import React from 'react';
import TotalSocios from './TotalSocios';
import PromedioEdad from './PromedioEdad';
import CasadosConEstudios from './ListaCasadosUniversitarios';
import NombresComunes from './NombresComunes';
import EstadisticasPorEquipo from './EstadisticasPorEquipo';

interface ContentDisplayProps {
  isVisible: boolean;
  currentComponent: string | null;
  selectedEquipo: string;  
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({ isVisible, currentComponent, selectedEquipo }) => {
  const renderComponent = () => {
    switch (currentComponent) {
      case 'TotalSocios':
        return <TotalSocios />;
      case 'PromedioEdad':
        return <PromedioEdad selectedEquipo={selectedEquipo}/>;
      case 'CasadosConEstudios':
        return <CasadosConEstudios />;
      case 'NombresComunes':
        return <NombresComunes selectedEquipo={selectedEquipo} />;
      case 'EstadisticasPorEquipo':
        return <EstadisticasPorEquipo />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`w-full max-w-3xl rounded-lg shadow-inner p-4 transform transition-all duration-500 ease-in-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}
    >
      {renderComponent()}
    </div>
  );
};

export default ContentDisplay;
