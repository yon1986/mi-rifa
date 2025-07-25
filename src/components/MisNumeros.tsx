import React from 'react';

interface Props {
  misNumeros: number[];
  onVolver: () => void;
}

const MisNumeros: React.FC<Props> = ({ misNumeros, onVolver }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-sm text-center">
      <h1 className="text-2xl font-bold text-orange-500 mb-4">🔢 Mis números</h1>
      {misNumeros.length > 0 ? (
        <ul className="text-gray-700 mb-4">
          {misNumeros.map((numero, index) => (
            <li key={index} className="font-semibold">{numero}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 mb-4">Aún no has comprado ningún número.</p>
      )}

      <button
        onClick={onVolver}
        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg w-full font-semibold transition"
      >
        Volver
      </button>
    </div>
  );
};

export default MisNumeros;
