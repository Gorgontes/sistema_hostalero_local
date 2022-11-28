import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { Button, IconButton, useDisclosure } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useCallback } from "react";
import { deletePisoById, fetchPisoById, postHabitaciones, postPiso } from "../../api/Habitacion";
import HabitacionCard from "./HabitacionCard";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import HabitacionForm from "./NewHabitacionForm";
import { Prisma } from "@prisma/client";

interface Props {
  piso: Awaited<ReturnType<typeof fetchPisoById>>;
}

const PisoEditor: React.FC<Props> = (props) => {
  const queryClient = useQueryClient();
  const handleSubmitHabitacion = useCallback((
    habitacion: Omit<Prisma.HabitacionCreateInput, "piso">
  ) => {
    let newHabitacion: Prisma.HabitacionCreateInput = {
      ...habitacion,
      piso: {connect: {id: props.piso.id}}
    };
    onClose();
    createHabitacion(newHabitacion);
  },[props.piso]);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const {
    data: piso,
    isLoading,
    isError,
  } = useQuery(["piso", props.piso.id], () => fetchPisoById(props.piso.id), {
    initialData: props.piso,
    refetchOnMount: false,
  });

  const { mutate: deletePiso } = useMutation(deletePisoById, {
    onSuccess: () => {
      queryClient.invalidateQueries(["habitaciones"]);
    },
  });

  const { mutate: createHabitacion } = useMutation(postHabitaciones, {
    onSuccess: () => {
      queryClient.invalidateQueries(["piso", props.piso.id]);
    },
  })
  if (isLoading) {
    return <div>cargando...</div>;
  }

  if (isError) {
    return <div>hubo un error!!!</div>;
  }

  return (
    <div className="outline-primario outline rounded-lg p-0 block">
      <div className="bg-primario text-white text-2xl p-3 rounded-md flex items-center">
        Piso: {piso.numeroPiso}
        <IconButton
        aria-label={"Eliminar piso"}
        className="ml-auto "
        size={'lg'}
        variant={'outline'}
        icon={<DeleteIcon className="" />}
        onClick={() => console.log('delete piso' + props.piso.id)}
        />
      </div>
      <div className="p-4 flex flex-col">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] gap-4">
          {piso.habitaciones.map((hab, index) => (
            <HabitacionCard
              nombre={hab.nombreHabitacion.toString()}
              estado={"ocupada"}
              key={hab.id}
              className={'cursor-pointer'}
              onClick={() => onOpen()}
            />
          ))}
        </div>
        <Button
          colorScheme="green"
          leftIcon={<AddIcon />}
          className={"mt-4 ml-auto"}
          onClick={onOpen}
        >
          Agregar habitacion
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent width={780} className="!max-w-none">
            <ModalHeader className="text-primario pb-5 border-b-2 border-primario">
              Ubicacion: Piso {piso.numeroPiso}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <HabitacionForm callback={handleSubmitHabitacion} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default PisoEditor;
