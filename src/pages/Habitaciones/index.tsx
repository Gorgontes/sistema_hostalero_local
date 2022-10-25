import { AddIcon } from '@chakra-ui/icons'
import { Button, FormControl, FormLabel, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure } from '@chakra-ui/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { fetchHabitaciones, postPiso } from '../../api/Habitacion'

type Props = {}

const HabitacionesPage = (props: Props) => {
  const { data, isLoading, isFetched } = useQuery(['habitaciones'], fetchHabitaciones);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mutation = useMutation(['postPiso'], postPiso);
  const [pisoNumero, setNumeroPiso] = useState(0);
  const [pisoDetalle, setPisoDetalles] = useState('');

  const postHabitacion = () => {
    console.log(pisoNumero)
    console.log(pisoDetalle)
  }


  if(isFetched || !isLoading)
    console.log('data', data);
  
  return (
    <div className='flex flex-col h-full'>
      <Heading size='lg'>Habitaciones</Heading>
      <Button
        aria-label='Agregar piso'
        className='mt-auto w-52 self-end'
        rightIcon={<AddIcon/>}
        onClick={onOpen}
        colorScheme='green'>
        Agregar piso
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nuevo piso</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Nombre del Piso</FormLabel>
              <Input onChange={(e) => setNumeroPiso(parseInt(e.currentTarget.value))} defaultValue={pisoNumero} type='number'/>
              <FormLabel>Detalles</FormLabel>
              <Textarea onChange={(e) => setPisoDetalles(e.currentTarget.value)} placeholder='Ingrese alguno detalle u obervacion'/>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={postHabitacion}>agregar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default HabitacionesPage