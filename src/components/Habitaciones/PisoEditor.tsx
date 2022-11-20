import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { Button, Center, IconButton, useDisclosure } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useRef } from "react";
import {
  deletePisoById,
  fetchPisoById,
} from "../../api/Habitacion";
import HabitacionCard from "./HabitacionCard";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import HabitacionForm from "./NewHabitacionForm";
import { Prisma } from "@prisma/client";

interface Props {
  piso: Awaited<ReturnType<typeof fetchPisoById>>;
}

const PisoEditor: React.FC<Props> = (props) => {
  const queryClient = useQueryClient();
  const handleSubmitHabitacion = (habitacion: Omit<Prisma.HabitacionCreateInput, 'piso'>) => {
  // const handleSubmitHabitacion = (habitacion: any) => {
    console.log(habitacion);
  }

  const { isOpen, onClose, onOpen } = useDisclosure();

  const { data: piso, isLoading, isError } = useQuery(
    ["piso", props.piso.id],
    () => fetchPisoById(props.piso.id),
    {
      initialData: props.piso,
      refetchOnMount: false,
    }
  );

  const {mutate: deletePiso} = useMutation(deletePisoById, {
    onSuccess: () => {
      queryClient.invalidateQueries(["habitaciones"]);
    },
  });

  if (isLoading) {
    return <div>cargando...</div>;
  }

  if (isError) {
    return <div>hubo un error!!!</div>;
  }

  return (
    <div className="outline-primario outline rounded-lg p-0 block">
      <div className="bg-primario text-white text-3xl p-3 rounded-md flex items-center">
        Piso: {piso.numeroPiso}
        <DeleteIcon className="ml-auto"/>
      </div>
      <div className="p-4 flex flex-col">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] gap-4">
          {piso.habitaciones.map((hab, index) => (
            <HabitacionCard
              nombre={hab.nombreHabitacion.toString()}
              estado={'ocupada'}
              key={hab.id}
              onClick={() => console.log(index)}
            />
          ))}
        </div>
        <Button colorScheme="green" leftIcon={<AddIcon />} className={'mt-4 ml-auto'} onClick={onOpen}>
          Agregar habitacion
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent width={780} className='!max-w-none'>
          <ModalHeader className="text-primario pb-5 border-b-2 border-primario">Ubicacion: Piso {piso.numeroPiso}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HabitacionForm callback={handleSubmitHabitacion}/>
          </ModalBody>
        </ModalContent>
      </Modal>
      </div>
    </div>
  );
};

export default PisoEditor;
