import { AddIcon } from '@chakra-ui/icons'
import { Button, FormControl, FormLabel, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure } from '@chakra-ui/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { fetchHabitaciones, fetchPisosAndHab, postPiso } from '../../api/Habitacion'
import HabitacionGroup from './HabitacionGroup'
import NewPisoForm from './NewPisoForm'

type Props = {}

const HabitacionesPage = (props: Props) => {
  const { data, isLoading, isFetched, } = useQuery(['habitaciones'], fetchPisosAndHab);
  const { isOpen, onOpen, onClose } = useDisclosure();


  if(isFetched || !isLoading)
    console.log('data', data);

  if(isLoading) {
    return (<span>Loading...</span>)
  }
  
  return (
    <div className='flex flex-col h-full'>
      <Heading size='lg'>Habitaciones</Heading>
      <div className='grow shrink basis-auto flex flex-col relative'>
        <div className='flex flex-col overflow-y-auto space-y-4 h-0' style={{flex: '1 1 auto'}}>
          {
            data!.map(piso => (
              <HabitacionGroup
                piso={piso}
                key={piso.id}/>
            ))
          }
        </div>
        <div className='absolute bottom-0 right-0'>
          <Button
            aria-label='Agregar piso'
            rightIcon={<AddIcon/>}
            onClick={onOpen}
            colorScheme='green'>
            Agregar piso
          </Button>
        </div>
      </div>
      <NewPisoForm isOpen={isOpen} onClose={onClose}/>
    </div>
  )
}

export default HabitacionesPage