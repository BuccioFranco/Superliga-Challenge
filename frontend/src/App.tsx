import React from 'react';
import Home from './presentation/pages/Home';
import Fondo from './assets/imagenes/fondo.jpg'

const App: React.FC = () => {
  return (
    <div className="h-screen w-screen bg-cover bg-center font-title" style={{ backgroundImage: `url(${Fondo})` }}>
      <Home />
    </div>

  );
};

export default App;
