// @ts-ignore
import React, { useState } from 'react';
import Inicio from './components/Inicio';

const App: React.FC = () => {
  const [userData] = useState<any>(null);
  const [sesionIniciada, setSesionIniciada] = useState(false);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-400 text-white">
      {!sesionIniciada ? (
        <div className="text-center px-4">
          <h1 className="text-4xl font-extrabold mb-6">🎉 Bienvenido a la Rifa</h1>
          <button
            onClick={() => setSesionIniciada(true)}
            className="bg-yellow-400 text-purple-800 px-6 py-3 rounded-2xl text-xl font-bold shadow-lg hover:bg-yellow-300 transition"
          >
            ⏭️ Entrar sin World ID (pruebas)
          </button>
        </div>
      ) : (
        <Inicio userData={userData} />
      )}
    </div>
  );
};

export default App;
