import { AddIcon } from '@chakra-ui/icons'
import { Button, Heading, StackDivider, useDisclosure, VStack } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { fetchPisosAndHab } from '../../api/Habitacion'
import HabitacionForm from './HabitacionForm'
import HabitacionGroup from './HabitacionGroup'
import NewPisoForm from './NewPisoForm'

type Props = {}

const HabitacionesPage = (props: Props) => {
  const { data, isLoading, isFetched, status} = useQuery(['habitaciones'], fetchPisosAndHab);
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log('->',status)

  if(isFetched || !isLoading)
    console.log('data', data);

  if(isLoading) {
    return (<span>Loading...</span>)
  }
  
  return (
    <div className='flex flex-col h-full'>
      <Heading size='lg'>Habitaciones</Heading>
      <div className='grow shrink basis-auto flex flex-col relative'>
        {/* <div className='flex flex-col overflow-y-auto space-y-4 h-0' style={{flex: '1 1 auto'}}>
        </div> */}
        <VStack divider={<StackDivider borderColor='gray.200' />} >
          { data!.map(piso => <HabitacionGroup piso={piso} key={piso.id}/>) }

        </VStack>
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
      <HabitacionForm numeroPiso={1}/>
    </div>
  )
}

export default HabitacionesPage