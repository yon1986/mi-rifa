import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  numero: number;
  onConfirmar: () => void;
  onCancelar: () => void;
}

const ModalConfirmacion: React.FC<Props> = ({ numero, onConfirmar, onCancelar }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white text-purple-800 rounded-2xl p-6 shadow-2xl w-full max-w-xs text-center"
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <h3 className="text-2xl font-bold mb-2">¿Confirmás tu número?</h3>
          <p className="text-lg mb-4">
            Comprar el número <span className="text-purple-600 font-extrabold text-2xl">{numero}</span> por <strong>1 WLD</strong>
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={onConfirmar}
              className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition font-semibold"
            >
              ✅ Confirmar
            </button>
            <button
              onClick={onCancelar}
              className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition font-semibold"
            >
              ❌ Cancelar
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ModalConfirmacion;
