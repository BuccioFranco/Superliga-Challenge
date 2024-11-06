import React from 'react';

interface SidebarProps {
  onComponentChange: (component: string) => void;
  currentComponent: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({ onComponentChange, currentComponent }) => {
  const components = ['TotalSocios', 'PromedioEdadRacing', 'CasadosConEstudios', 'NombresComunesRiver', 'EstadisticasPorEquipo'];

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 min-w-[250px]">
      <h2 className="text-xl font-bold mb-4 text-center">Selecciona una estadística:</h2>
      <div className="flex flex-col gap-2 w-full">
        {components.map((component) => (
          <button
            key={component}
            onClick={() => onComponentChange(component)}
            className={`bg-[#C5D3E8] text-gray-800 py-3 rounded hover:bg-[#A6AEBF] transition text-center ${
              currentComponent === component ? 'bg-[#A6AEBF]' : ''
            }`}
          >
            {component.replace(/([A-Z])/g, ' $1').trim()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
