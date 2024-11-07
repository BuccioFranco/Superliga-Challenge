export type FetchState<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
};