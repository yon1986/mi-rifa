import React, { useState } from 'react';
import Inicio from './components/Inicio';
import SeleccionarNumeros from './components/SeleccionarNumeros';
import Resultados from './components/Resultados';
import MisNumeros from './components/MisNumeros';

type Pantalla = 'inicio' | 'seleccionar' | 'resultados' | 'misNumeros';

function App() {
  const [pantalla, setPantalla] = useState<Pantalla>('inicio');
  const [numerosVendidos, setNumerosVendidos] = useState<number[]>([]);
  const [totalNumeros] = useState<number>(15);
  const [misNumeros, setMisNumeros] = useState<number[]>([]);
  const [saldoWLD, setSaldoWLD] = useState<number>(5);
  const [premio, setPremio] = useState<number>(95); // Premio inicial

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 via-pink-500 to-yellow-400 flex items-center justify-center p-4">
      {pantalla === 'inicio' && (
        <Inicio
          numerosVendidos={numerosVendidos}
          totalNumeros={totalNumeros}
          premio={premio}
          onAdquirir={() => setPantalla('seleccionar')}
          onGanadores={() => setPantalla('resultados')}
          onMisNumeros={() => setPantalla('misNumeros')}
        />
      )}

      {pantalla === 'seleccionar' && (
        <SeleccionarNumeros
          numerosVendidos={numerosVendidos}
          setNumerosVendidos={setNumerosVendidos}
          totalNumeros={totalNumeros}
          misNumeros={misNumeros}
          setMisNumeros={setMisNumeros}
          saldoWLD={saldoWLD}
          setSaldoWLD={setSaldoWLD}
          onVolver={() => setPantalla('inicio')}
        />
      )}

      {pantalla === 'resultados' && (
        <Resultados onVolver={() => setPantalla('inicio')} />
      )}

      {pantalla === 'misNumeros' && (
        <MisNumeros
          misNumeros={misNumeros}
          onVolver={() => setPantalla('inicio')}
        />
      )}
    </div>
  );
}

export default App;
