import React from 'react';
import { Toaster } from 'react-hot-toast';
import usePropina from '../hooks/usePropina';
import InputMonto from './InputMonto';
import BotonPorcentaje from './BotonPorcentaje';

const CalculadoraPropina: React.FC = () => {
  const {
    propina,
    handleCambiarMonto,
    handleCambiarPorcentaje,
    handleCalcular,
    handleLimpiar,
    PORCENTAJES_DISPONIBLES,
  } = usePropina();

  const hayMonto = propina.montoCuenta !== 0 && propina.montoCuenta > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 sm:p-10 font-sans">
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            background: '#363636',
            color: '#fff',
            fontWeight: 'bold',
          },
          success: {
            style: { background: '#10b981' },
          },
          error: {
            style: { background: '#ef4444' },
          },
        }}
      />
      
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">
                Calculadora de Propinas
            </h1>
            <p className="text-gray-600 text-lg">
              Herramienta rápida para calcular propinas
            </p>
          </div>

          {/* Input del monto */}
          <InputMonto
            label="Monto de la Cuenta"
            value={propina.montoCuenta}
            onChange={handleCambiarMonto}
            placeholder="Ingresa el monto"
          />

          {/* porcentaje */}
          <div className="mb-8">
            <label className="block text-lg font-bold text-gray-700 mb-4">
              Selecciona el Porcentaje de Propina
            </label>
            <div className="grid grid-cols-3 gap-4">
              {PORCENTAJES_DISPONIBLES.map((porcentaje) => (
                <BotonPorcentaje
                  key={porcentaje}
                  porcentaje={porcentaje}
                  seleccionado={propina.porcentajePropina === porcentaje}
                  onClick={() => handleCambiarPorcentaje(porcentaje)}
                />
              ))}
            </div>
          </div>

          {/* Resultados */}
          {hayMonto && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-6 border-2 border-green-200">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-600 mb-1">
                    Monto de Propina
                  </p>
                  <p className="text-3xl font-bold text-green-600">
                    L.{propina.montoPropina.toFixed(2)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-600 mb-1">
                    Total a Pagar
                  </p>
                  <p className="text-3xl font-bold text-blue-600">
                    L.{propina.totalPagar.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Botones */}
          <div className="flex gap-4">
                <button onClick={handleCalcular} disabled={!hayMonto} className={`flex-1 py-4 rounded-lg font-bold text-lg transition-all duration-200 ${
                    hayMonto
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                Calcular
                </button>
                <button
                onClick={handleLimpiar}
                className="px-6 py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-bold text-lg transition-all"
                >
                Limpiar
                </button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-500">
                Tip: Selecciona el porcentaje y calcula automáticamente
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculadoraPropina;