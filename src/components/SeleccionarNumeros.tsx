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
}

const SeleccionarNumeros: React.FC<Props> = ({
  onVolver,
  numerosVendidos,
  setNumerosVendidos,
  totalNumeros,
  misNumeros,
  setMisNumeros,
  saldoWLD,
  setSaldoWLD
}) => {
  const [numeroSeleccionado, setNumeroSeleccionado] = useState<number | null>(null);
  const [modoManual, setModoManual] = useState<boolean>(true);

  // Nuevo: estado para modal de éxito
  const [mostrarExito, setMostrarExito] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");

  const puedeComprar = () => {
    if (numerosVendidos.length >= totalNumeros) {
      alert("Ya se vendieron todos los números.");
      return false;
    }
    if (misNumeros.length >= 5) {
      alert("Ya tienes el máximo de 5 números.");
      return false;
    }
    if (saldoWLD <= 0) {
      alert("No tienes saldo suficiente para adquirir otro número.");
      return false;
    }
    return true;
  };

  const procesarCompra = (numero: number) => {
    if (numerosVendidos.includes(numero)) {
      alert("Ese número ya fue adquirido.");
      setNumeroSeleccionado(null);
      return;
    }

    setNumerosVendidos((prev) => [...prev, numero]);
    setMisNumeros((prev) => [...prev, numero]);
    setSaldoWLD((prev) => prev - 1);

    // Mostrar modal de éxito
    setMensajeExito(`Compraste el número ${numero} correctamente.`);
    setMostrarExito(true);

    // Cerrar modal de confirmación
    setNumeroSeleccionado(null);

    // Cerrar modal de éxito automáticamente
    setTimeout(() => {
      setMostrarExito(false);
    }, 2000);
  };

  const comprarAleatorio = () => {
    if (!puedeComprar()) return;

    let numero;
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

      <p className="text-lg mb-1">💰 Saldo actual: <span className="font-bold">{saldoWLD} WLD</span></p>
      <p className="text-lg mb-1">🎯 Faltan <span className="font-bold">{totalNumeros - numerosVendidos.length}</span> números para cerrar la rifa.</p>
      <p className="text-lg mb-4">📌 Máximo 5 números por jugador.</p>

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
          <h3 className="text-xl font-semibold mb-3 text-center">Toca un número para adquirirlo</h3>
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
            {misNumeros.map(num => (
              <span key={num} className="px-3 py-1 bg-white text-purple-700 font-bold rounded-full shadow-sm">
                {num}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-white/80 text-center">Aún no has adquirido ningún número.</p>
        )}
      </div>

      <button
        onClick={onVolver}
        className="mt-auto bg-gray-200 text-gray-800 px-6 py-2 rounded-xl hover:bg-gray-300 transition"
      >
        🔙 Volver
      </button>

      {/* Modal de confirmación */}
      {numeroSeleccionado !== null && (
        <ModalConfirmacion
          numero={numeroSeleccionado}
          onConfirmar={() => procesarCompra(numeroSeleccionado)}
          onCancelar={() => setNumeroSeleccionado(null)}
          tipo="confirmacion"
        />
      )}

      {/* Modal de éxito */}
      {mostrarExito && (
        <ModalConfirmacion
          tipo="exito"
          mensaje={mensajeExito}
        />
      )}
    </div>
  );
};

export default SeleccionarNumeros;
