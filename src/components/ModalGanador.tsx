import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  numeroGanador: number;
  premio: string;
  misNumeros: number[];
  onIrNuevaRifa: () => void;
}

const ModalGanador: React.FC<Props> = ({ numeroGanador, premio, misNumeros, onIrNuevaRifa }) => {
  const soyGanador = misNumeros.includes(numeroGanador);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white text-purple-900 rounded-3xl p-8 shadow-2xl w-full max-w-md text-center"
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <h2 className="text-4xl font-extrabold mb-4">🏆 ¡Rifa Terminada!</h2>
          <p className="text-2xl mb-2">
            Número ganador:{" "}
            <span className="text-purple-700 font-extrabold">{numeroGanador}</span>
          </p>
          <p className="text-xl mb-6">
            Premio total: <span className="font-bold">{premio} WLD</span>
          </p>

          {soyGanador ? (
            <p className="text-green-600 text-xl mb-6 font-bold">
              🎉 ¡Felicidades! Tienes el número ganador.
            </p>
          ) : (
            <p className="text-red-600 text-lg mb-6">
              No fuiste el ganador esta vez... ¡Sigue participando!
            </p>
          )}

          <button
            onClick={onIrNuevaRifa}
            className="bg-purple-600 text-white px-6 py-3 rounded-2xl hover:bg-purple-700 transition font-bold text-lg"
          >
            🔄 Ir a la nueva rifa
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ModalGanador;
