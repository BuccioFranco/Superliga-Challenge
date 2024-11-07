import { useEffect, useState } from 'react';
import { FetchState } from '../../domain/models/FetchType';

function useFetchData<T>(fetchFunction: () => Promise<T>, deps: unknown[] = []): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchFunction();
        setData(result);
      } catch (error) {
        console.log(error);
        setError('Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchFunction, ...deps]); 

  return { data, error, loading };
}

export default useFetchData;
