import React from 'react';
import { MenuEquipoProps } from '../../../domain/models/contens/MenuType';
import Button from '../ui/Button';

const MenuEquipo: React.FC<MenuEquipoProps> = ({ onEquipoSelect }) => {
  const equipos = [
    'River', 'Boca', 'Independiente', 'Racing', 'San Lorenzo',
    'Huracán', 'Estudiantes', 'Gimnasia LP', 'Newells', 'Rosario Central', 'Velez'
  ];

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mt-4 min-w-48 max-w-sm mx-auto">
      <div className="grid grid-cols-1 gap-1  ">
        {equipos.map((equipo) => (
          <Button
            key={equipo}
            label={equipo}
            onClick={() => onEquipoSelect(equipo)}
            isActive={false}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuEquipo;
