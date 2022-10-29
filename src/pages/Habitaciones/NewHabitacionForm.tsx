import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPisosAndHab, postHabitaciones } from "../../api/Habitacion";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  piso: Awaited<ReturnType<typeof fetchPisosAndHab>>[number];
};

const NewHabitacionForm: React.FC<Props> = ({ isOpen, onClose, piso }) => {
  const queryClient = useQueryClient();
  const [ errorNumeroHabitacion, setErrorNH ] = useState(false)
  let numeroHabitacion = piso.habitaciones.length + 1;
  const [detallesHabitacion, setDetallesHabitacion] = useState('');
  const toastError = useToast();
  const mutation = useMutation(postHabitaciones, {
    onSuccess: () =>  {
      queryClient.invalidateQueries(['piso', piso.id]);
    },
    onError: () => {
      toastError({
        title: 'Error al crear piso',
        isClosable: true,
      })
    }
  })
  const createHabitacion = () => {
    onClose();
    mutation.mutate({
      detalles: detallesHabitacion,
      numeroHabitacion: piso.id * 100 + numeroHabitacion,
      piso: {
        connect: {
          id: piso.id
        }
      },
    })
  }
  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Nueva habitacion</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <FormLabel>Nro del piso</FormLabel>
                <div className="flex items-baseline">
                  <div className="border px-3 py-1.5 rounded-lg bg-gray-300">{piso.numeroPiso}</div>
                  <Input
                    onChange={({ currentTarget }) => {
                      const { value } = currentTarget;
                      if( value.length === 0 ) {
                        numeroHabitacion = 0
                        return;
                      }
                      const reg = /^\d*$/
                      if(!reg.test(value) || value.length > 2) {
                        console.log(value.length > 2);
                        currentTarget.value = value.slice(0,-1);
                      }
                      numeroHabitacion = +value;
                    }}
                    defaultValue={numeroHabitacion.toString().padStart(2,'0')}
                    type="text"
                  />
                </div>
              </div>
              <div>
                <span className="font-semibold">Ubicacion</span> <br/>
                <span>Piso {piso.numeroPiso}</span>
              </div>
            </div>
            <FormLabel>Detalles</FormLabel>
            <Textarea
              onChange={({ currentTarget: { value } }) =>
                setDetallesHabitacion(value)
              }
              placeholder="Ingrese alguno detalle u obervacion"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button onClick={createHabitacion}>agregar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewHabitacionForm;
