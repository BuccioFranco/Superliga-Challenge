import React from 'react';
import Home from './presentation/pages/Home';
import FondoVideo from './assets/videos/fondoEstadio.mp4';

const App: React.FC = () => {
  return (
    <div className="h-screen w-screen font-title relative overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={FondoVideo} type="video/mp4" />
        Tu navegador no soporta videos HTML5.
      </video>
      <div className="relative z-10">
        <Home />
      </div>
    </div>
  );
};

export default App;
