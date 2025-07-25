import React from 'react';

interface Props {
  onVolver: () => void;
}

const Resultados: React.FC<Props> = ({ onVolver }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-sm text-center">
      <h1 className="text-2xl font-bold text-pink-600 mb-4">🏆 Ganadores</h1>
      <p className="text-gray-700 mb-4">Aquí se mostrarán los ganadores de la última rifa.</p>

      <button
        onClick={onVolver}
        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg w-full font-semibold transition"
      >
        Volver
      </button>
    </div>
  );
};

export default Resultados;
