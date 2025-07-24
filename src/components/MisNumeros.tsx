import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  onVolver: () => void;
  misNumeros: number[];
}

const MisNumeros: React.FC<Props> = ({ onVolver, misNumeros }) => {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-400 text-white flex flex-col items-center">
      {/* Título separado */}
      <motion.h1
        className="text-6xl font-extrabold drop-shadow-lg mt-10 mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Mis números
      </motion.h1>

      {/* Lista de números centrada verticalmente */}
      <motion.div
        className="flex-1 flex flex-col justify-center items-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      >
        {misNumeros.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-4 max-w-md">
            {misNumeros.map((num) => (
              <span
                key={num}
                className="inline-block px-5 py-3 bg-white text-purple-700 font-bold rounded-full shadow-md text-2xl"
              >
                {num}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-2xl text-white/80 text-center">Aún no has comprado ningún número.</p>
        )}
      </motion.div>

      {/* Botón más separado */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <button
          onClick={onVolver}
          className="w-72 py-5 text-2xl bg-gray-600 rounded-3xl shadow-xl hover:bg-gray-700 transition duration-300 font-semibold"
        >
          Volver al inicio
        </button>
      </motion.div>
    </div>
  );
};

export default MisNumeros;
