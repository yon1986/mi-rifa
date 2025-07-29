// @ts-ignore
import { useState } from 'react';
import ModalConfirmacion from './ModalConfirmacion';

interface Props {
  onVolver: () => void;
  numerosVendidos: number[];
  setNumerosVendidos: React.Dispatch<React.SetStateAction<number[]>>;
  totalNumeros: number;
  setTotalNumeros: React.Dispatch<React.SetStateAction<number>>;
  misNumeros: number[];
  setMisNumeros: React.Dispatch<React.SetStateAction<number[]>>;
  saldoWLD: number;
  setSaldoWLD: React.Dispatch<React.SetStateAction<number>>;
  onListaCompleta: () => void;
}

const SeleccionarNumeros: React.FC<Props> = ({
  onVolver,
  numerosVendidos,
  setNumerosVendidos,
  totalNumeros,
  misNumeros,
  setMisNumeros,
  saldoWLD,
  setSaldoWLD,
  onListaCompleta
}) => {
  const [numeroSeleccionado, setNumeroSeleccionado] = useState<number | null>(null);
  const [modoManual, setModoManual] = useState<boolean>(true);

  const [mostrarExito, setMostrarExito] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");

  const [mostrarError, setMostrarError] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  // Validación al seleccionar
  const puedeComprar = (): boolean => {
    if (numerosVendidos.length >= totalNumeros) {
      setMensajeError("Ya se vendieron todos los números.");
      setMostrarError(true);
      return false;
    }
    if (saldoWLD <= 0) {
      setMensajeError("No tienes saldo suficiente para adquirir otro número.");
      setMostrarError(true);
      return false;
    }
    return true;
  };

  // Confirmar compra
  const procesarCompra = (numero: number) => {
    if (saldoWLD <= 0) {
      setMensajeError("No tienes saldo suficiente para adquirir otro número.");
      setMostrarError(true);
      setNumeroSeleccionado(null);
      return;
    }
    if (numerosVendidos.includes(numero)) {
      setMensajeError("Ese número ya fue adquirido.");
      setMostrarError(true);
      setNumeroSeleccionado(null);
      return;
    }

    // Compra exitosa
    setNumerosVendidos((prev) => [...prev, numero]);
    setMisNumeros((prev) => [...prev, numero]);
    setSaldoWLD((prev) => prev - 1);

    setMensajeExito(`Compraste el número ${numero} correctamente.`);
    setMostrarExito(true);
    setNumeroSeleccionado(null);

    setTimeout(() => {
      setMostrarExito(false);
    }, 2000);

    if (numerosVendidos.length + 1 === totalNumeros) {
      setTimeout(() => {
        onListaCompleta();
      }, 500);
    }
  };

  const comprarAleatorio = () => {
    if (!puedeComprar()) return;

    let numero: number;
    do {
      numero = Math.floor(Math.random() * totalNumeros) + 1;
    } while (numerosVendidos.includes(numero));

    setNumeroSeleccionado(numero);
  };

  const manejarClickNumero = (numero: number) => {
    if (!puedeComprar()) return;
    if (numerosVendidos.includes(numero)) return;
    setNumeroSeleccionado(numero);
  };

  const numerosDisponibles = Array.from({ length: totalNumeros }, (_, i) => i + 1);

  return (
    <div className="min-h-screen px-4 py-6 text-white bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-400 flex flex-col items-center">
      <h2 className="text-4xl font-extrabold mb-4">🎟 Comprar Números</h2>

      <p className="text-lg mb-1">
        💰 Saldo actual: <span className="font-bold">{saldoWLD} WLD</span>
      </p>
      <p className="text-lg mb-1">
        🎯 Faltan <span className="font-bold">{totalNumeros - numerosVendidos.length}</span> números para cerrar la rifa.
      </p>
      <p className="text-lg mb-4">📌 Puedes comprar todos los números que quieras.</p>

      <button
        onClick={() => setModoManual(!modoManual)}
        className={`mb-4 px-6 py-3 rounded-full font-bold shadow-xl transition text-lg ${
          modoManual
            ? 'bg-yellow-300 text-purple-800 hover:bg-yellow-400'
            : 'bg-green-400 text-white hover:bg-green-500'
        }`}
      >
        {modoManual ? '🎲 Cambiar a modo aleatorio' : '🖐️ Cambiar a modo manual'}
      </button>

      {modoManual ? (
        <div className="bg-white/20 rounded-xl p-4 w-full max-w-md shadow backdrop-blur-sm mb-6">
          <h3 className="text-xl font-semibold mb-3 text-center">
            Toca un número para adquirirlo
          </h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {numerosDisponibles.map((num) => {
              const vendido = numerosVendidos.includes(num);
              const esMio = misNumeros.includes(num);

              return (
                <button
                  key={num}
                  onClick={() => manejarClickNumero(num)}
                  disabled={vendido}
                  className={`w-12 h-12 rounded-full text-lg font-bold border-2 shadow ${
                    vendido
                      ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                      : esMio
                      ? 'bg-green-400 text-white border-green-500'
                      : 'bg-white text-purple-700 hover:bg-yellow-200'
                  }`}
                >
                  {num}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <button
          onClick={comprarAleatorio}
          disabled={saldoWLD <= 0}
          className={`mb-6 px-6 py-4 text-xl rounded-2xl shadow-xl font-bold transition ${
            saldoWLD <= 0
              ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
              : 'bg-yellow-300 text-purple-800 hover:bg-yellow-400'
          }`}
        >
          🎲 Comprar número aleatorio
        </button>
      )}

      <div className="bg-white/20 rounded-xl p-4 w-full max-w-md shadow backdrop-blur-sm mb-6">
        <h3 className="text-xl font-semibold mb-2 text-center">Tus números:</h3>
        {misNumeros.length > 0 ? (
          <div className="flex flex-wrap gap-2 justify-center text-lg">
            {misNumeros.map((num) => (
              <span
                key={num}
                className="px-3 py-1 bg-white text-purple-700 font-bold rounded-full shadow-sm"
              >
                {num}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-white/80 text-center">
            Aún no has adquirido ningún número.
          </p>
        )}
      </div>

      <button
        onClick={onVolver}
        className="mt-auto bg-gray-200 text-gray-800 px-6 py-2 rounded-xl hover:bg-gray-300 transition"
      >
        🔙 Volver
      </button>

      {/* Modales */}
      {numeroSeleccionado !== null && (
        <ModalConfirmacion
          numero={numeroSeleccionado}
          onConfirmar={() => procesarCompra(numeroSeleccionado)}
          onCancelar={() => setNumeroSeleccionado(null)}
          tipo="confirmacion"
        />
      )}

      {mostrarExito && (
        <ModalConfirmacion
          tipo="exito"
          mensaje={mensajeExito}
          onCancelar={() => setMostrarExito(false)}
        />
      )}

      {mostrarError && (
        <ModalConfirmacion
          tipo="error"
          mensaje={mensajeError}
          onCancelar={() => setMostrarError(false)}
        />
      )}
    </div>
  );
};

export default SeleccionarNumeros;
