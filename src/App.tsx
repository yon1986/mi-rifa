// @ts-ignore
import React, { useState } from 'react';
import Inicio from './components/Inicio';

function App() {
  // Estados principales que vamos a pasar como props a Inicio
  const [numerosVendidos, setNumerosVendidos] = useState<number[]>([]);
  const [totalNumeros, setTotalNumeros] = useState<number>(15); // ejemplo con 15 números
  const [misNumeros, setMisNumeros] = useState<number[]>([]);
  const [saldoWLD, setSaldoWLD] = useState<number>(5); // saldo inicial de prueba

  // Función onVolver (en el futuro puedes cambiar de pantalla o resetear)
  const onVolver = () => {
    console.log('Volver presionado');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Inicio
        onVolver={onVolver}
        numerosVendidos={numerosVendidos}
        setNumerosVendidos={setNumerosVendidos}
        totalNumeros={totalNumeros}
        setTotalNumeros={setTotalNumeros}
        misNumeros={misNumeros}
        setMisNumeros={setMisNumeros}
        saldoWLD={saldoWLD}
        setSaldoWLD={setSaldoWLD}
      />
    </div>
  );
}

export default App;
