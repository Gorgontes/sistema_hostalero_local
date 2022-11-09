import React from 'react'
type Estado = 'ocupada' | 'libre' | 'reservada';

type Props = {
  estado: Estado,
  nombre: string
}
function habitacionStyle(estado: Estado) {
  switch(estado) {
    case 'ocupada': return 'habitacion-card--ocupada';
    case 'libre': return 'habitacion-card--libre';
    case 'reservada': return 'habitacion-card--reservada';
  }
}

const HabitacionCard = (props: Props) => {
  return (
    <div className={`habitacion-card ${habitacionStyle(props.estado)}`}>{props.nombre}</div>
  )
}

export default HabitacionCard