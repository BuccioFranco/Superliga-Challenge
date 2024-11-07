import { getTotalSocios } from '../../../application/services/SocioService';
import useFetchData from '../../hooks/useFetchData';
import CardStat from '../ui/CardStats';

const TotalSocios = () => {

  const { data: total, error, loading } = useFetchData<number>(getTotalSocios);

  return (
    <CardStat
      title="Total de Socios Registrados"
      value={total ?? null}
      loading={loading}
      error={error}
    />
  );
};

export default TotalSocios;
