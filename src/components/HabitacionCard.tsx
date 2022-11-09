import React from 'react'

type Props = {
  name: string
}

const HabitacionCard = (props: Props) => {
  return (
    <div className='habitacion-card'>{props.name}</div>
  )
}

export default HabitacionCard