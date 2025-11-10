import { useState, useEffect, useCallback } from 'react';
import { toast} from 'react-hot-toast';
import type { Propina } from '../types/Propina';

//Estado inicial del hook
const usePropina = () => {
    const [propina, setPropina] = useState<Propina>({
        montoCuenta: 0,
        porcentajePropina: 10,
        montoPropina: 0,
        totalPagar: 0,
    });

    //Constantes
    const PORCENTAJES_DISPONIBLES = [5, 10, 15];
    const MONTO_MAXIMO = 1000000;

    //Funcion para calcular 
    const calcularPropina = useCallback(() => {
        const monto = Number(propina.montoCuenta) || 0;
        const porcentaje = propina.porcentajePropina;

        if (monto <= 0) {
            return { montoPropina: 0, totalPagar: 0 };
        }

        const calculoPropina = (monto * porcentaje) / 100;
        const total = monto + calculoPropina;

        return {
            montoPropina: Number(calculoPropina.toFixed(2)),
            totalPagar: Number(total.toFixed(2)),
        };
        
    }, [propina.montoCuenta, propina.porcentajePropina]);

    //useEffect para calcular automaticamente
    useEffect(() => {
        const resultado = calcularPropina();
        setPropina((prev) => ({
            ...prev,
            montoPropina: resultado.montoPropina,
            totalPagar: resultado.totalPagar,
        }));
    }, [calcularPropina]);

    //handle para cambios

    const handleCambiarMonto = ( valor: string) => {
        if (valor === '') {
            setPropina((prev) => ({ ...prev, montoCuenta: 0 }));
            return;
        }

        const numValue = Number(valor);

        if (isNaN(numValue) || numValue < 0) {
            toast.error('Por favor ingresa un monto válido.');
            return;
        }

        if (numValue > MONTO_MAXIMO) {
            toast.error(`El monto no puede exceder ${MONTO_MAXIMO.toLocaleString()}.`);
            return;
        }
        setPropina((prev) => ({ ...prev, montoCuenta: numValue }));
    };
    const handleCambiarPorcentaje = ( porcentaje: number) => {
        setPropina((prev) => ({ ...prev, porcentajePropina: porcentaje }) );
        toast.success(`Propina del ${porcentaje}% seleccionada`);
    };

    const handleCalcular = () => {
        if (propina.montoCuenta <= 0 || propina.montoCuenta <= 0) {
            toast.error('Por favor ingresa un monto de cuenta válido para calcular la propina.');
            return;
        }
        toast.success('Cálculo de propina realizado con éxito.');
    };

    const handleLimpiar = () => {
        setPropina({
            montoCuenta: 0,
            porcentajePropina: 10,
            montoPropina: 0,
            totalPagar: 0,
        });
        toast ('Calculadora reiniciada.');
    };

    return {
        propina,
        handleCambiarMonto,
        handleCambiarPorcentaje,
        handleCalcular,
        handleLimpiar,
        PORCENTAJES_DISPONIBLES,
    };
};
    
export default usePropina;        

