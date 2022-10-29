import { Checkbox, Divider, FormControl, FormLabel, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from '@chakra-ui/react'
import { Habitacion } from '@prisma/client'
import React from 'react'

type Props = {
  habitacion?: Habitacion,
  numeroPiso: number,
}

const HabitacionForm = (props: Props) => {
  return (
    <div style={{'maxHeight': '560px'}}>
      <FormControl>
        <div className='grid grid-cols-2 gap-2'>
          <div>
            <FormLabel>Numero de habitacion</FormLabel>
            <Input />
          </div>
          <div className='flex flex-col'>
            <FormLabel>Ubicacion</FormLabel>
            <div className='my-auto ml-4'>Piso {props.numeroPiso}</div>
          </div>
        </div>
        <div className='col-span-2'>
          <FormLabel>Descripción</FormLabel>
          <Input />
        </div>
        <Divider orientation='horizontal' className='my-2'/>
        <div className='flex align-baseline'>
          <FormLabel className='w-16'>Camas</FormLabel>
          <NumberInput>
            <NumberInputField value={1}/>
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </div>
        <div className='flex align-baseline'>
          <FormLabel className='w-16'>Precio</FormLabel>
          <NumberInput>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </div>
        <div className='flex align-baseline'>
          <FormLabel className='w-16'>Baños</FormLabel>
          <NumberInput>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </div>
        <Checkbox defaultChecked>Wifi</Checkbox>
        <br />
        <Checkbox defaultChecked>TV</Checkbox>

      </FormControl>
    </div>
  )
}

export default HabitacionForm 