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
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postPiso } from "../../api/Habitacion";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const NewPisoForm: React.FC<Props> = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(postPiso, {
    onSuccess: () => {
      console.log("success adding stuff");
      queryClient.invalidateQueries(["habitaciones"]);
    },
  });
  const [pisoNumero, setNumeroPiso] = useState(0);
  const [pisoDetalle, setPisoDetalles] = useState("");
  const postHabitacionPiso = () => {
    onClose();
    mutation.mutate({
      numeroPiso: pisoNumero,
      detalles: pisoDetalle,
    });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Nuevo piso</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Nombre del Piso</FormLabel>
            <Input
              onChange={({ currentTarget: { value } }) => setNumeroPiso(+value)}
              defaultValue={pisoNumero}
              type="number"
            />
            <FormLabel>Detalles</FormLabel>
            <Textarea
              onChange={({ currentTarget: { value } }) =>
                setPisoDetalles(value)
              }
              placeholder="Ingrese alguno detalle u obervacion"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button onClick={postHabitacionPiso}>agregar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewPisoForm;
