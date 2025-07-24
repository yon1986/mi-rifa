import React from "react";

interface Props {
  onVolver: () => void;
}

const ComoSeJuega: React.FC<Props> = ({ onVolver }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 text-white px-6 text-center">
      <h1 className="text-4xl font-extrabold mb-6">ℹ️ ¿Cómo se juega?</h1>

      <div className="bg-white/20 backdrop-blur-lg p-6 rounded-2xl shadow-xl max-w-lg">
        <p className="mb-4 text-lg leading-relaxed">
          Participar en la rifa es muy fácil:
        </p>
        <ul className="list-disc list-inside text-left text-white/90 space-y-3 mb-4">
          <li>📲 Conectá tu cuenta de World App con tu World ID.</li>
          <li>💰 Necesitás saldo en WLD (Worldcoin) para participar.</li>
          <li>🎟 Cada número cuesta <strong>1 WLD</strong>.</li>
          <li>🎯 Podés comprar hasta <strong>5 números</strong>.</li>
          <li>🏆 Cuando se vendan todos los números, se elige un ganador al azar.</li>
          <li>🎉 El ganador recibe el premio acumulado en WLD.</li>
        </ul>
        <p className="text-sm text-white/70">* Recordá revisar si sos el ganador en la sección de resultados.</p>
      </div>

      <button
        onClick={onVolver}
        className="mt-8 bg-yellow-300 text-purple-800 px-6 py-3 rounded-xl font-bold shadow-xl hover:bg-yellow-400 transition"
      >
        🔙 Volver
      </button>
    </div>
  );
};

export default ComoSeJuega;
