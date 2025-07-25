import React, { useState } from 'react';
import ModalConfirmacion from './ModalConfirmacion';

interface Props {
  numerosVendidos: number[];
  setNumerosVendidos: React.Dispatch<React.SetStateAction<number[]>>;
  totalNumeros: number;
  misNumeros: number[];
  setMisNumeros: React.Dispatch<React.SetStateAction<number[]>>;
  saldoWLD: number;
  setSaldoWLD: React.Dispatch<React.SetStateAction<number>>;
  onVolver: () => void;
}

const SeleccionarNumeros: React.FC<Props> = ({
  numerosVendidos,
  setNumerosVendidos,
  totalNumeros,
  misNumeros,
  setMisNumeros,
  saldoWLD,
  setSaldoWLD,
  onVolver,
}) => {
  const [numeroSeleccionado, setNumeroSeleccionado] = useState<number | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mensajeExito, setMensajeExito] = useState(false);

  const seleccionarNumero = () => {
    if (numerosVendidos.length < totalNumeros) {
      let numero: number;
      do {
        numero = Math.floor(Math.random() * totalNumeros) + 1;
      } while (numerosVendidos.includes(numero));

      setNumeroSeleccionado(numero);
      setMostrarModal(true);
    }
  };

  const confirmarCompra = () => {
    if (numeroSeleccionado !== null && saldoWLD > 0) {
      setNumerosVendidos([...numerosVendidos, numeroSeleccionado]);
      setMisNumeros([...misNumeros, numeroSeleccionado]);
      setSaldoWLD(saldoWLD - 1);
      setMostrarModal(false);
      setMensajeExito(true);
      setTimeout(() => setMensajeExito(false), 2000);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-sm text-center">
      <h1 className="text-2xl font-bold text-purple-800 mb-4">Adquirir un número</h1>
      <p className="text-gray-700 mb-4">
        Saldo disponible: <span className="font-semibold">{saldoWLD} WLD</span>
      </p>

      <button
        onClick={seleccionarNumero}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full font-semibold mb-4 transition"
      >
        Seleccionar número aleatorio
      </button>

      <button
        onClick={onVolver}
        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg w-full font-semibold transition"
      >
        Volver
      </button>

      {mensajeExito && <p className="text-green-600 mt-4">¡Número comprado con éxito!</p>}

      <ModalConfirmacion
        isOpen={mostrarModal}
        numero={numeroSeleccionado}
        onConfirm={confirmarCompra}
        onClose={() => setMostrarModal(false)}
      />
    </div>
  );
};

export default SeleccionarNumeros;
