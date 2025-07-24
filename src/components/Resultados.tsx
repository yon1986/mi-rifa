import React from 'react';

interface Props {
  ganador: number;
  misNumeros: number[];
  totalWLD: number;
  onVolver: () => void;
}

const Resultados: React.FC<Props> = ({ ganador, misNumeros, totalWLD, onVolver }) => {
  const premio = Math.floor(totalWLD * 0.95);
  const sosGanador = misNumeros.includes(ganador);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-4 bg-gradient-to-b from-yellow-300 via-orange-400 to-pink-500 text-white">
      <h1 className="text-5xl font-extrabold drop-shadow-xl mb-4">🎉 Resultados</h1>

      <div className="bg-white text-purple-800 p-6 rounded-xl shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-2">🎯 Número ganador:</h2>
        <p className="text-6xl font-extrabold text-green-600 mb-4 drop-shadow">{ganador}</p>

        <h2 className="text-xl font-bold mb-2">🏆 Premio total:</h2>
        <p className="text-3xl font-extrabold text-yellow-500 mb-4">{premio} WLD</p>

        <h2 className="text-xl font-bold mb-2">📋 Tus números:</h2>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {misNumeros.map(num => (
            <span
              key={num}
              className={`px-4 py-2 rounded-full font-bold text-lg shadow ${
                num === ganador ? 'bg-green-500 text-white' : 'bg-gray-200 text-purple-700'
              }`}
            >
              {num}
            </span>
          ))}
        </div>

        <div className="text-lg font-semibold mb-4">
          {sosGanador ? (
            <p className="text-green-600 text-xl font-bold">🎉 ¡Felicidades! Sos el ganador. Reclamá tus {premio} WLD.</p>
          ) : (
            <p className="text-white/80 text-xl">😔 Esta vez no ganaste. ¡Probá en la próxima rifa!</p>
          )}
        </div>

        <button
          onClick={onVolver}
          className="mt-4 bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition font-bold"
        >
          🔙 Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default Resultados;
