// src/presentation/views/SociosView.tsx
import React, { useEffect, useState } from 'react';
import { processSocioData, SocioStats  } from '../../application/useCases/getSocioStats';
import { TotalSocios } from '../components/TotalSocios';
import { PromedioEdadRacing } from '../components/PromedioEdadRacing';
import { ListaCasadosUniversitarios } from '../components/ListaCasadosUniversitarios';
import { NombresComunesRiver } from '../components/NombresComunesRiver';
import { EstadisticasPorEquipo } from '../components/EstadisticasPorEquipo';

export const HomePage: React.FC = () => {
  const [data, setData] = useState<SocioStats | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await processSocioData();
      setData(result);
    };
    fetchData();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gray-100 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Estadísticas de Socios</h1>
      <div className="bg-white rounded shadow p-6 w-full max-w-4xl space-y-6">
        <TotalSocios total={data.totalSocios} />
        <PromedioEdadRacing promedioEdad={data.promedioEdadRacing} />
        <ListaCasadosUniversitarios socios={data.primeras100CasadasUniversitarias} />
        <NombresComunesRiver nombres={data.nombresComunesRiver} />
        <EstadisticasPorEquipo estadisticas={data.estadisticasPorEquipo} />
      </div>
    </div>
  );
};

