import React from 'react';

interface Props {
  onComprarMas: () => void;
  onVolverInicio: () => void;
  saldoWLD: number;
}

const ModalFinalizado: React.FC<Props> = ({ onComprarMas, onVolverInicio, saldoWLD }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white text-purple-800 rounded-xl p-5 shadow-2xl max-w-sm w-full text-center">
        <h3 className="text-xl font-bold mb-3">🎉 Has terminado</h3>
        <p className="mb-4">¿Qué deseas hacer?</p>
        <div className="flex flex-col gap-3">
          <button
            onClick={onComprarMas}
            disabled={saldoWLD <= 0}
            className={`w-full py-2 rounded-xl shadow-md transition duration-300 text-base font-semibold text-white
              ${saldoWLD > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}
            `}
          >
            ➕ Comprar más números
          </button>
          <button
            onClick={onVolverInicio}
            className="w-full py-2 bg-gray-500 rounded-xl shadow-md hover:bg-gray-600 transition duration-300 text-base font-semibold text-white"
          >
            🔙 Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalFinalizado;
