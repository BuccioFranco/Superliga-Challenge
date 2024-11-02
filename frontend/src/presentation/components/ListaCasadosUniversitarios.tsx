// src/presentation/components/ListaCasadosUniversitarios.tsx
import React from 'react';
import { Socio } from '../../domain/models/SocioType';

interface ListaCasadosUniversitariosProps {
  socios: Socio[];
}

export const ListaCasadosUniversitarios: React.FC<ListaCasadosUniversitariosProps> = ({ socios }) => (
  <div>
    <h2 className="text-lg font-semibold">100 primeras personas casadas con estudios universitarios:</h2>
    <ul>
      {socios.map((socio, index) => (
        <li key={index}>{socio.nombre} - {socio.edad} años - {socio.equipo}</li>
      ))}
    </ul>
  </div>
);
