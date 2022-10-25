import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { Box, Center, IconButton } from '@chakra-ui/react'
import React, { useState } from 'react'

export interface Props {
  title: string;
}

const HabitacionGroup: React.FC<Props> = (props: Props) => {
  let i = 0;
  const [rooms, setRooms] = useState<any[]>([]);
  return (
    <div className='px-4 py-1 w-full bg-gray-400 rounded-lg'>
      <div>{props.title}</div>
      <div className='flex items-center'>
        <div className='flex space-x-4 items-center'>
          {
            rooms.map(roomId => {
              return (
                <Center className='h-9  w-16 rounded-lg bg-cyan-500' onClick={() => console.log(roomId)} >
                  {roomId}
                </Center>
              )
            })
          }
          <IconButton
            aria-label='Agregar habitacion'
            icon={<AddIcon/>}
            onClick={() => setRooms([...rooms, rooms.length])}
            colorScheme='teal'
           />
        </div>
        <IconButton
          className='ml-auto'
          aria-label='Eliminar piso'
          icon={<DeleteIcon/>}
          onClick={() => console.log('hello world')}
          colorScheme='red'
          />
      </div>
    </div>
  )
}

export default HabitacionGroup