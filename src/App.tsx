// @ts-ignore
import React, { useState } from 'react';
import Inicio from './components/Inicio';
import { IDKitWidget } from '@worldcoin/idkit';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  // Callback cuando se autentica con World ID real
  const handleSuccess = (response: any) => {
    console.log("✅ Datos de autenticación:", response);
    setUserData(response);
    setIsAuthenticated(true);
  };

  // Login falso para pruebas
  const handleFakeLogin = () => {
    const fakeData = { nullifier_hash: "fake_user_12345" };
    setUserData(fakeData);
    setIsAuthenticated(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {!isAuthenticated ? (
        <div className="text-center">
          <h1 className="text-xl font-bold mb-4">Bienvenido a Mi Rifa</h1>

          {/* Botón normal con World ID */}
          <IDKitWidget
            app_id="app_staging_1234" // ID temporal de prueba
            action="login"
            signal="login-signal"
            onSuccess={handleSuccess}
          >
            {({ open }) => (
              <button
                onClick={open}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
              >
                Iniciar sesión con World ID
              </button>
            )}
          </IDKitWidget>

          {/* Botón verde solo para pruebas */}
          <button
            onClick={handleFakeLogin}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-2"
          >
            🔹 Entrar sin QR (prueba)
          </button>
        </div>
      ) : (
        <Inicio userData={userData} />
      )}
    </div>
  );
}

export default App;
