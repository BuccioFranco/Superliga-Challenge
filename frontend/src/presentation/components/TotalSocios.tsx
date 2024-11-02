// src/presentation/components/TotalSocios.tsx
import React from 'react';

interface TotalSociosProps {
  total: number;
}

export const TotalSocios: React.FC<TotalSociosProps> = ({ total }) => (
  <div className="text-lg font-semibold">Total de socios: {total}</div>
);
