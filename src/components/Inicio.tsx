import React, { useState } from 'react';
import ModalConfirmacion from './ModalConfirmacion';

interface Props {
  onVolver: () => void;
  numerosVendidos: number[];
  setNumerosVendidos: React.Dispatch<React.SetStateAction<number[]>>;
  totalNumeros: number;
  setTotalNumeros: React.Dispatch<React.SetStateAction<number>>; // ✅ Agregado
  misNumeros: number[];
  setMisNumeros: React.Dispatch<React.SetStateAction<number[]>>;
  saldoWLD: number;
  setSaldoWLD: React.Dispatch<React.SetStateAction<number>>;
}

const Inicio: React.FC<Props> = ({
  onVolver,
  numerosVendidos,
  setNumerosVendidos,
  totalNumeros,
  setTotalNumeros,
  misNumeros,
  setMisNumeros,
  saldoWLD,
  setSaldoWLD
}) => {
  const [numeroSeleccionado, setNumeroSeleccionado] = useState<number | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mensajeExito, setMensajeExito] = useState(false);

  // Función para seleccionar número
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

  // Confirmar compra
  const confirmarCompra = () => {
    if (numeroSeleccionado !== null && saldoWLD > 0) {
      setNumerosVendidos([...numerosVendidos, numeroSeleccionado]);
      setMisNumeros([...misNumeros, numeroSeleccionado]);
      setSaldoWLD(saldoWLD - 1);
      setMostrarModal(false);
      setMensajeExito(true);

      // Ocultar mensaje de éxito después de 2 segundos
      setTimeout(() => setMensajeExito(false), 2000);

      // Si ya se completaron los números, actualizar
      if (numerosVendidos.length + 1 === totalNumeros) {
        setTotalNumeros(totalNumeros); // Aquí puedes redirigir a resultados
      }
    }
  };

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Mini Rifa Worldcoin</h1>
      <p className="mb-2">Saldo disponible: {saldoWLD} WLD</p>
      <p className="mb-4">Total números: {totalNumeros}</p>

      <button
        onClick={seleccionarNumero}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
      >
        Adquirir un número
      </button>

      <div className="mb-4">
        <button
          onClick={onVolver}
          className="bg-gray-500 text-white px-3 py-1 rounded-md"
        >
          Volver
        </button>
      </div>

      {mensajeExito && <p className="text-green-500">¡Número comprado con éxito!</p>}

      <ModalConfirmacion
        isOpen={mostrarModal}
        numero={numeroSeleccionado}
        onConfirm={confirmarCompra}
        onClose={() => setMostrarModal(false)}
      />
    </div>
  );
};

export default Inicio;
