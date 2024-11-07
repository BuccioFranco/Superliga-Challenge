import React from 'react';
import TotalSocios from '../info/TotalSocios';
import PromedioEdad from '../info/PromedioEdad';
import CasadosConEstudios from '../info/ListaCasadosUniversitarios';
import NombresComunes from '../info/NombresComunes';
import EstadisticasPorEquipo from '../info/EstadisticasPorEquipo';
import { ContentDisplayProps } from '../../../domain/models/contens/ContentDisplayType';

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
