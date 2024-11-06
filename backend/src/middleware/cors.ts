import cors, { CorsOptions } from 'cors';

const ACCEPTED_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:8080',
];

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS }: { acceptedOrigins?: string[] } = {}) => {
  const corsOptions: CorsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
      if (acceptedOrigins.includes(origin || '')) {
        return callback(null, true);
      }

      if (!origin) {
        return callback(null, true); 
      }

      return callback(new Error('Not allowed by CORS'));
    }
  };

  return cors(corsOptions);
};
