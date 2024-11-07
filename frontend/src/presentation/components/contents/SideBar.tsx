import React from 'react';
import { SidebarProps } from '../../../domain/models/contens/SidebarType';
import Button from '../ui/Button';

const Sidebar: React.FC<SidebarProps> = ({ onComponentChange, currentComponent }) => {
  const components = ['TotalSocios', 'PromedioEdad', 'CasadosConEstudios', 'NombresComunes', 'EstadisticasPorEquipo'];

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 min-w-[250px]">
      <h2 className="text-xl font-bold mb-4 text-center">Selecciona una estadística:</h2>
      <div className="flex flex-col gap-2 w-full">
        {components.map((component) => (
          <Button
            key={component}
            label={component.replace(/([A-Z])/g, ' $1').trim()}
            onClick={() => onComponentChange(component)}
            isActive={currentComponent === component} 
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
