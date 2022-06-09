import { useState, useEffect } from 'react'

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";

const ControlPresupuesto = ({ gastos, presupuesto }) => {

    const [porcentaje, setPorcentaje] = useState(0);
    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);

    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0);
        const totalDisponible = presupuesto - totalGastado;

        //Calcular porcentaje gastado
        const nuevoPorcentaje = (((presupuesto - totalGastado) / presupuesto) * 100).toFixed(2);


        setDisponible(totalDisponible);
        setGastado(totalGastado);

        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje);
        }, 1000);

    }, [gastos])

    const formatCantidad = (cantidad) => {
        return cantidad.toLocaleString('es-US', {
            style: 'currency',
            currency: 'CRC'
        })
    }

    return (
        <div className="control-presupuesto contenedor sombra dos-columnas" >
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                        trailColor: '#F5F5F5',
                        textColor: '#3B82F6'
                    })}
                    value={porcentaje}
                    text={`${porcentaje}% Gastado`}
                />
            </div>
            <div className="contenido-presupuesto">
                <p >
                    <span>Presupuesto:</span>{formatCantidad(presupuesto)}
                </p>
                <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                    <span>Disponible:</span>{formatCantidad(disponible)}
                </p>
                <p>
                    <span>Gastado:</span>{formatCantidad(gastado)}
                </p>
            </div>
        </div>
    )
}

export default ControlPresupuesto