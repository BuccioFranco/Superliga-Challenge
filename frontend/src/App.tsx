// src/presentation/App.tsx
import React from 'react';
import Home from './presentation/pages/Home'; // Importar el componente Home

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="container mx-auto p-4">
        <Home /> {/* Renderizar el componente Home */}
      </div>
    </div>
  );
};

export default App;
