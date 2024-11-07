export interface CardStatProps {
  title: string;
  value: string | number | null;
  loading: boolean;
  error: string | null;
  children?: React.ReactNode;  
}