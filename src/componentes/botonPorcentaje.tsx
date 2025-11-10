import React from 'react';

interface botonPorcentajeProps{
    porcentaje: number;
    seleccionado: boolean;
    onClick: () => void;
}

const botonPorcentaje: React.FC<botonPorcentajeProps> = ({
    porcentaje,
    seleccionado,
    onClick
}) => {
    const claseBase = "px-6 py-4 rounded-lg font-bold text-xl transition-all duration-200 tranform hover:scale-105";
    const claseSeleccionado = seleccionado
    ? "bg-blue-600 text-white shadow-lg"
    : "bg-gray-200 text-gray-700 hover: bg-gray-300";

    return (
        <button
        onClick={onClick}
        className={`${claseBase} ${claseSeleccionado}`}>
        {porcentaje}%
        </button>
    );
};

export default botonPorcentaje;