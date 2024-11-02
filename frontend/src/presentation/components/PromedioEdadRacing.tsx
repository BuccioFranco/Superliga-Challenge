// src/presentation/components/PromedioEdadRacing.tsx
import React from 'react';

interface PromedioEdadRacingProps {
  promedioEdad: number;
}

export const PromedioEdadRacing: React.FC<PromedioEdadRacingProps> = ({ promedioEdad }) => (
  <div className="text-lg font-semibold">Promedio de edad de socios de Racing: {promedioEdad.toFixed(2)}</div>
);
