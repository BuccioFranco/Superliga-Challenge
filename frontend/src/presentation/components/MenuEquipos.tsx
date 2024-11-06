import React from 'react';

interface MenuEquipoProps {
  onEquipoSelect: (equipo: string) => void;
}

const MenuEquipo: React.FC<MenuEquipoProps> = ({ onEquipoSelect }) => {
  const equipos = [
    'River', 'Boca', 'Independiente', 'Racing', 'San Lorenzo',
    'Huracán', 'Estudiantes', 'Gimnasia LP', 'Newells', 'Rosario Central', 'Velez'
  ];

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mt-4 min-w-48 max-w-sm mx-auto">
      <div className="grid grid-cols-1 gap-1  ">
        {equipos.map((equipo) => (
          <button
            key={equipo}
            onClick={() => onEquipoSelect(equipo)}
            className="bg-[#C5D3E8] text-gray-800 py-3 rounded hover:bg-[#A6AEBF] transition text-center"
          >
            {equipo}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MenuEquipo;
