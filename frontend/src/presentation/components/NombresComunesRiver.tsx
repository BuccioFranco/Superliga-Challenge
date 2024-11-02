// src/presentation/components/NombresComunesRiver.tsx
import React from 'react';

interface NombresComunesRiverProps {
  nombres: string[];
}

export const NombresComunesRiver: React.FC<NombresComunesRiverProps> = ({ nombres }) => (
  <div>
    <h2 className="text-lg font-semibold">5 nombres más comunes entre hinchas de River:</h2>
    <ul>
      {nombres.map((nombre, index) => (
        <li key={index}>{nombre}</li>
      ))}
    </ul>
  </div>
);
