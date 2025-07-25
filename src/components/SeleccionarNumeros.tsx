// @ts-ignore
import { useState } from 'react';
import ModalConfirmacion from './ModalConfirmacion';

interface Props {
  onVolver: () => void;
  numerosVendidos: number[];
  setNumerosVendidos: React.Dispatch<React.SetStateAction<number[]>>;
  totalNumeros: number;
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

    setTimeout(() => {
      setNumeroSeleccionado(null);
    }, 1000);
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

      <p className="text-lg mb-1">💰 Saldo actual: <span className="font-bold">{saldoWLD} WLD
