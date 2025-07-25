import React from 'react';

interface Props {
  numerosVendidos: number[];
  totalNumeros: number;
  premio: number;
  onAdquirir: () => void;
  onGanadores: () => void;
  onMisNumeros: () => void;
}

const Inicio: React.FC<Props> = ({
  numerosVendidos,
  totalNumeros,
  premio,
  onAdquirir,
  onGanadores,
  onMisNumeros,
}) => {
  return (
    <div className="bg-white shadow-2xl rounded-2xl p-6 w-full max-w-sm text-center">
      <h1 className="text-3xl font-extrabold text-purple-800 mb-4">
        Mini Rifa Worldcoin
      </h1>

      <p className="text-gray-800 mb-4">
        Premio actual: <span className="text-4xl font-bold text-green-500">{premio} WLD</span>
      </p>

      <p className="text-gray-700 mb-4">
        Números vendidos: <span className="font-semibold">{numerosVendidos.length}</span> / {totalNumeros}
      </p>

      <button
        onClick={onAdquirir}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full font-semibold mb-4 transition"
      >
        🎟 Adquirir un número
      </button>

      <button
        onClick={onMisNumeros}
        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg w-full font-semibold mb-4 transition"
      >
        🔢 Mis números
      </button>

      <button
        onClick={onGanadores}
        className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg w-full font-semibold transition"
      >
        🏆 Ganadores
      </button>
    </div>
  );
};

export default Inicio;
