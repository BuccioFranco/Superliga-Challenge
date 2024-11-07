import React from 'react';
import { getPromedioEdad } from '../../../application/services/SocioService';
import useFetchData from '../../hooks/useFetchData';
import { TeamProps } from '../../../domain/models/info/TeamType';
import CardStat from '../ui/CardStats';

const PromedioEdad: React.FC<TeamProps> = ({ selectedEquipo }) => {
  const { data: promedioEdad, loading, error } = useFetchData(
    () => (selectedEquipo ? getPromedioEdad(selectedEquipo) : Promise.resolve(null)),
    [selectedEquipo]
  );

  return (
    <CardStat
      title={`Promedio de Edad de Socios de ${selectedEquipo || 'No seleccionado'}`}
      value={promedioEdad?.toFixed(2) ?? null}
      loading={loading}
      error={error}
    />

  );
};

export default PromedioEdad;
