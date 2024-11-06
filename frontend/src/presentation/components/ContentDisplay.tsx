import React from 'react';
import TotalSocios from './TotalSocios';
import PromedioEdadRacing from './PromedioEdadRacing';
import CasadosConEstudios from './ListaCasadosUniversitarios';
import NombresComunesRiver from './NombresComunesRiver';
import EstadisticasPorEquipo from './EstadisticasPorEquipo';

interface ContentDisplayProps {
  isVisible: boolean;
  currentComponent: string | null;
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({ isVisible, currentComponent }) => {
  const renderComponent = () => {
    switch (currentComponent) {
      case 'TotalSocios':
        return <TotalSocios />;
      case 'PromedioEdadRacing':
        return <PromedioEdadRacing />;
      case 'CasadosConEstudios':
        return <CasadosConEstudios />;
      case 'NombresComunesRiver':
        return <NombresComunesRiver />;
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
