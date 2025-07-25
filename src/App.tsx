// @ts-ignore
import React, { useState } from 'react';
import Inicio from './components/Inicio';

function App() {
  const [numerosVendidos, setNumerosVendidos] = useState<number[]>([]);
  const [totalNumeros, setTotalNumeros] = useState<number>(15);
  const [misNumeros, setMisNumeros] = useState<number[]>([]);
  const [saldoWLD, setSaldoWLD] = useState<number>(5);

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
        misNumeros={misNumeros}
        setMisNumeros={setMisNumeros}
        saldoWLD={saldoWLD}
        setSaldoWLD={setSaldoWLD}
      />
    </div>
  );
}

export default App;
