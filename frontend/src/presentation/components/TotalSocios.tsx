// src/presentation/components/TotalSocios.tsx
import React, { useEffect, useState } from 'react';
import { getTotalSocios } from '../../application/servicies/SocioService';

const TotalSocios: React.FC = () => {
  const [total, setTotal] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const total = await getTotalSocios();
        setTotal(total);
      } catch (error) {
        console.log(error);
        setError('Error al obtener el total de socios');
      }
    };

    fetchTotal();
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 text-center">
      <h2 className="text-xl font-semibold mb-4">Total de Socios Registrados</h2>
      {error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <p className="text-3xl font-bold">{total}</p>
      )}
    </div>
  );
};

export default TotalSocios;