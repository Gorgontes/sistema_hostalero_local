import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postHabitaciones } from "../../api/Habitacion";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  pisoId: number;
};

const NewHabitacionForm: React.FC<Props> = ({ isOpen, onClose, pisoId }) => {
  const queryClient = useQueryClient();
  const [numeroHabitacion, setNumeroHabitacion] = useState(0);
  const [detallesHabitacion, setDetallesHabitacion] = useState('');
  const mutation = useMutation(postHabitaciones, {
    onSuccess: () =>  {
      queryClient.invalidateQueries(['piso', pisoId]);
    }
  })
  const createHabitacion = () => {
    onClose();
    mutation.mutate({
      detalles: detallesHabitacion,
      numeroHabitacion,
      piso: {
        connect: {
          id: pisoId
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
            <FormLabel>Nro del piso</FormLabel>
            <Input
              onChange={({ currentTarget: { value } }) =>
                setNumeroHabitacion(+value)
              }
              type="number"
            />
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
