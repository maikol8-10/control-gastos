import { useState, useEffect } from 'react'

const ControlPresupuesto = ({ gastos, presupuesto }) => {

    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);

    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0);
        setGastado(totalGastado);
        const totalDisponible = presupuesto - totalGastado;
        setDisponible(totalDisponible);
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
                <p>Grafica Aqui</p>
            </div>
            <div className="contenido-presupuesto">
                <p>
                    <span>Presupuesto:</span>{formatCantidad(presupuesto)}
                </p>
                <p>
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