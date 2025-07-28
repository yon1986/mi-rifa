// @ts-ignore
import React, { useState } from 'react';
import SeleccionarNumeros from './SeleccionarNumeros';
import MisNumeros from './MisNumeros';
import Resultados from './Resultados';
import ComoSeJuega from './ComoSeJuega';
import { motion } from 'framer-motion';

interface Props {
  userData: any; // Recibimos los datos del usuario desde App.tsx
}

const Inicio: React.FC<Props> = ({ userData }) => {
  const [mostrarModulo, setMostrarModulo] = useState<"numeros" | "misNumeros" | "resultados" | "comoJugar" | null>(null);
  const [numerosVendidos, setNumerosVendidos] = useState<number[]>([]);
  const [misNumeros, setMisNumeros] = useState<number[]>([]);
  const [totalNumeros, setTotalNumeros] = useState<number>(15);
  const [saldoWLD, setSaldoWLD] = useState<number>(5);

  const premio = Math.floor(totalNumeros * 0.95);

  // Mostrar Resultados automáticamente si ya se vendieron todos los números
  if (numerosVendidos.length === totalNumeros && mostrarModulo === null) {
    setMostrarModulo("resultados");
  }

  return (
    <div className="h-screen w-full bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-400 text-white flex flex-col justify-between">
      {/* Mostrar saludo con los datos del usuario */}
      <div className="bg-white/10 text-center py-3">
        <p className="text-lg">
          👋 Bienvenido, <span className="font-bold">{userData?.nullifier_hash?.slice(0, 6) || "Usuario"}</span>
        </p>
        <p className="text-sm text-white/70">
          Saldo simulado: <span className="font-bold">{saldoWLD} WLD</span>
        </p>
      </div>

      {mostrarModulo === null ? (
        <>
          <motion.div
            className="flex flex-col items-center justify-center flex-1"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-6xl font-extrabold drop-shadow-lg mb-4">🎉 Rifa</h1>
            <p className="text-lg mb-2">Total números: <span className="font-bold">{totalNumeros}</span></p>

            <div className="bg-yellow-300 text-purple-800 font-extrabold text-3xl rounded-2xl px-6 py-4 shadow-xl mb-6 animate-pulse border-4 border-yellow-500 text-center w-full max-w-sm mx-auto">
              🏆 Premio: {premio} WLD
            </div>

            <motion.button
              onClick={() => setMostrarModulo("numeros")}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: ["0 0 0px #fff", "0 0 30px #22d3ee", "0 0 0px #fff"],
                transition: { repeat: Infinity, duration: 2 }
              }}
              className="w-full py-4 text-2xl bg-cyan-500 rounded-3xl shadow-2xl hover:bg-cyan-600 transition duration-300 font-bold"
            >
              🎟 Adquirí un número por solo 1 WLD
            </motion.button>

            <p className="text-center mt-3 text-xl text-white/90">
              Faltan {totalNumeros - numerosVendidos.length} números para cerrar la rifa
            </p>

            <div className="flex flex-col gap-4 w-full max-w-sm mt-8">
              <motion.button
                onClick={() => setMostrarModulo("misNumeros")}
                whileTap={{ scale: 0.95 }}
                className="w-full py-5 text-xl bg-green-600 rounded-3xl shadow-xl hover:bg-green-700 transition duration-300 font-semibold"
              >
                📋 Mis números
              </motion.button>
              <motion.button
                onClick={() => setMostrarModulo("comoJugar")}
                whileTap={{ scale: 0.95 }}
                className="w-full py-5 text-xl bg-purple-700 rounded-3xl shadow-xl hover:bg-purple-800 transition duration-300 font-semibold"
              >
                ℹ️ Cómo se juega
              </motion.button>
              <motion.button
                onClick={() => setMostrarModulo("resultados")}
                whileTap={{ scale: 0.95 }}
                className="w-full py-5 text-xl bg-yellow-500 rounded-3xl shadow-xl hover:bg-yellow-600 transition duration-300 font-semibold"
              >
                🏆 Ganadores
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            className="w-full max-w-md mx-auto bg-white/20 rounded-xl p-4 shadow-lg backdrop-blur-sm mt-4 mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <h2 className="text-xl font-bold mb-3 text-center">Números vendidos:</h2>
            <div className="flex flex-wrap justify-center gap-2 text-lg">
              {numerosVendidos.length > 0 ? (
                numerosVendidos.map((num) => (
                  <span
                    key={num}
                    className="inline-block px-3 py-1 bg-white text-purple-700 font-bold rounded-full shadow-sm"
                  >
                    {num}
                  </span>
                ))
              ) : (
                <p className="text-lg text-white/80 text-center">Aún no hay números vendidos.</p>
              )}
            </div>
          </motion.div>
        </>
      ) : mostrarModulo === "numeros" ? (
        <SeleccionarNumeros
          onVolver={() => setMostrarModulo(null)}
          numerosVendidos={numerosVendidos}
          setNumerosVendidos={setNumerosVendidos}
          totalNumeros={totalNumeros}
          setTotalNumeros={setTotalNumeros}
          misNumeros={misNumeros}
          setMisNumeros={setMisNumeros}
          saldoWLD={saldoWLD}
          setSaldoWLD={setSaldoWLD}
        />
      ) : mostrarModulo === "misNumeros" ? (
        <MisNumeros
          onVolver={() => setMostrarModulo(null)}
          misNumeros={misNumeros}
        />
      ) : mostrarModulo === "resultados" ? (
        <Resultados
          ganador={numerosVendidos[Math.floor(Math.random() * numerosVendidos.length)]}
          misNumeros={misNumeros}
          onVolver={() => setMostrarModulo(null)}
          totalWLD={totalNumeros}
        />
      ) : (
        <ComoSeJuega onVolver={() => setMostrarModulo(null)} />
      )}
    </div>
  );
};

export default Inicio;
