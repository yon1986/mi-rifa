import React from "react";

interface Props {
  onVolver: () => void;
}

const Historial: React.FC<Props> = ({ onVolver }) => {
  const historial = JSON.parse(localStorage.getItem("historial") || "[]");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-400 text-white flex flex-col p-6">
      <h2 className="text-3xl font-extrabold mb-4 text-center">🕒 Historial de Rifas</h2>

      {historial.length === 0 ? (
        <p className="text-center text-lg text-white/80">Aún no hay rifas terminadas.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {historial.map((item: any, index: number) => (
            <div
              key={index}
              className="bg-white/20 rounded-xl p-4 shadow-lg backdrop-blur-sm"
            >
              <p className="text-lg"><strong>Fecha:</strong> {item.fecha}</p>
              <p className="text-lg"><strong>Números en rifa:</strong> {item.totalNumeros}</p>
              <p className="text-lg"><strong>Número ganador:</strong> 🎉 {item.numeroGanador}</p>
              <p className="text-lg"><strong>Premio:</strong> {item.premio} WLD</p>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={onVolver}
        className="mt-8 bg-gray-200 text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-300 transition font-semibold"
      >
        🔙 Volver
      </button>
    </div>
  );
};

export default Historial;
