// @ts-ignore
import React, { useState, useEffect } from 'react';
import SeleccionarNumeros from './SeleccionarNumeros';
import MisNumeros from './MisNumeros';
import ComoSeJuega from './ComoSeJuega';
import Historial from './Historial';
import ModalGanador from './ModalGanador';
import { motion } from 'framer-motion';

interface Props {
  userData: any;
}

const Inicio: React.FC<Props> = ({ userData }) => {
  const [mostrarModulo, setMostrarModulo] = useState<
    "numeros" | "misNumeros" | "resultados" | "comoJugar" | "historial" | null
  >(null);

  const [ganadorPendiente, setGanadorPendiente] = useState<any>(null);

  const [numerosVendidos, setNumerosVendidos] = useState<number[]>(() => {
    const guardados = localStorage.getItem("numerosVendidos");
    return guardados ? JSON.parse(guardados) : [];
  });

  const [misNumeros, setMisNumeros] = useState<number[]>(() => {
    const guardados = localStorage.getItem("misNumeros");
    return guardados ? JSON.parse(guardados) : [];
  });

  const [totalNumeros, setTotalNumeros] = useState<number>(() => {
    return parseInt(localStorage.getItem("totalNumeros") || "15");
  });

  const [saldoWLD, setSaldoWLD] = useState<number>(5);

  // Calcular premio dinámico
  const premio = (totalNumeros * 0.95).toFixed(2);

  // Guardar estado en localStorage cuando cambian los datos
  useEffect(() => {
    localStorage.setItem("numerosVendidos", JSON.stringify(numerosVendidos));
    localStorage.setItem("misNumeros", JSON.stringify(misNumeros));
    localStorage.setItem("totalNumeros", totalNumeros.toString());
  }, [numerosVendidos, misNumeros, totalNumeros]);

  // Comprobar si hay ganador pendiente al abrir la app
  useEffect(() => {
    const ganador = localStorage.getItem("ganadorPendiente");
    if (ganador) {
      setGanadorPendiente(JSON.parse(ganador));
      setMostrarModulo("resultados");
    }
  }, []);

  // Elegir ganador al terminar lista
  const manejarListaCompleta = () => {
    const numeroGanador =
      numerosVendidos[Math.floor(Math.random() * numerosVendidos.length)];

    // Guardar en historial
    const historial = JSON.parse(localStorage.getItem("historial") || "[]");
    historial.push({
      fecha: new Date().toLocaleString(),
      totalNumeros,
      numeroGanador,
      premio,
    });
    localStorage.setItem("historial", JSON.stringify(historial));

    // Guardar ganador pendiente
    const ganador = { numeroGanador, premio };
    localStorage.setItem("ganadorPendiente", JSON.stringify(ganador));
    setGanadorPendiente(ganador);

    // Reset para nueva rifa
    setTotalNumeros((prev) => prev + 5);
    setNumerosVendidos([]);
    setMisNumeros([]);
    setMostrarModulo("resultados");
  };

  // Simulación de saldo dinámico (solo si userData viene de World ID)
  useEffect(() => {
    if (userData?.nullifier_hash) {
      const saldoSimulado = Math.floor(Math.random() * (20 - 3 + 1)) + 3;
      setSaldoWLD(saldoSimulado);
    }
  }, [userData]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-400 text-white flex flex-col justify-between">
      {mostrarModulo === null ? (
        <>
          {/* Cabecera */}
          <div className="bg-white/10 text-center py-3">
            <p className="text-lg">
              👋 Bienvenido,{" "}
              <span className="font-bold">
                {userData?.nullifier_hash?.slice(0, 6) || "Usuario"}
              </span>
            </p>
            <p className="text-sm text-white/70">
              Saldo disponible: <span className="font-bold">{saldoWLD} WLD</span>
            </p>
          </div>

          {/* Contenido principal */}
          <div className="flex-1 flex flex-col justify-center">
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-6xl font-extrabold drop-shadow-lg mb-4">
                🎉 Rifa
              </h1>
              <p className="text-lg mb-2">
                Total números: <span className="font-bold">{totalNumeros}</span>
              </p>

              {/* Premio */}
              <div className="bg-yellow-300 text-purple-800 font-extrabold text-3xl rounded-2xl px-6 py-4 shadow-xl mb-6 animate-pulse border-4 border-yellow-500 text-center w-full max-w-sm mx-auto">
                🏆 Premio: {premio} WLD
              </div>

              {/* Botón principal */}
              <motion.button
                onClick={() => setMostrarModulo("numeros")}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    "0 0 0px #fff",
                    "0 0 30px #22d3ee",
                    "0 0 0px #fff",
                  ],
                  transition: { repeat: Infinity, duration: 2 },
                }}
                className="w-full py-4 text-2xl bg-cyan-500 rounded-3xl shadow-2xl hover:bg-cyan-600 transition duration-300 font-bold"
              >
                🎟 Adquirí un número por solo 1 WLD
              </motion.button>

              <p className="text-center mt-3 text-xl text-white/90">
                Faltan {totalNumeros - numerosVendidos.length} números para cerrar la rifa
              </p>

              {/* Botones secundarios */}
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
                  onClick={() => setMostrarModulo("historial")}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-5 text-xl bg-blue-600 rounded-3xl shadow-xl hover:bg-blue-700 transition duration-300 font-semibold"
                >
                  🕒 Historial
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Números vendidos */}
          <motion.div
            className="bg-white/20 rounded-xl p-4 shadow-lg backdrop-blur-sm mx-4 mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <h2 className="text-xl font-bold mb-3 text-center">
              Números vendidos:
            </h2>
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
                <p className="text-lg text-white/80 text-center">
                  Aún no hay números vendidos.
                </p>
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
          onListaCompleta={manejarListaCompleta}
        />
      ) : mostrarModulo === "misNumeros" ? (
        <MisNumeros
          onVolver={() => setMostrarModulo(null)}
          misNumeros={misNumeros}
        />
      ) : mostrarModulo === "resultados" ? (
        <ModalGanador
          numeroGanador={ganadorPendiente?.numeroGanador}
          premio={ganadorPendiente?.premio}
          misNumeros={misNumeros}
          onIrNuevaRifa={() => {
            localStorage.removeItem("ganadorPendiente");
            setGanadorPendiente(null);
            setMostrarModulo(null);
          }}
        />
      ) : mostrarModulo === "historial" ? (
        <Historial onVolver={() => setMostrarModulo(null)} />
      ) : (
        <ComoSeJuega onVolver={() => setMostrarModulo(null)} />
      )}
    </div>
  );
};

export default Inicio;
