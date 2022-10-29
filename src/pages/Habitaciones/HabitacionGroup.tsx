import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { Button, Center, IconButton, useDisclosure } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import {
  deletePisoById,
  fetchHabitaciones,
  fetchPisoById,
  fetchPisosAndHab,
} from "../../api/Habitacion";
import NewHabitacionForm from "./NewHabitacionForm";

interface Props {
  piso: Awaited<ReturnType<typeof fetchPisoById>>;
}

const HabitacionGroup: React.FC<Props> = (props) => {
  const queryClient = useQueryClient();
  const {isOpen, onClose, onOpen} = useDisclosure();

  const { data: piso, isLoading } = useQuery(
    ['piso', props.piso.id],
    () => fetchPisoById(props.piso.id),
    {
      initialData: props.piso,
      refetchOnMount: false
    }
  );
  const deletePiso = useMutation(deletePisoById, {
    onSuccess: () => {
      queryClient.invalidateQueries(["habitaciones"]);
    },
  });

  if (isLoading) {
    console.log('loading');
    return (<div>cargando...</div>)
  }

  return (
    <div className="px-4 py-1 w-full bg-gray-300 rounded-lg border-2 shadow-lg">
      <div>Piso {piso.numeroPiso}
          <Button
            className="ml-5"
            aria-label="Agregar habitacion"
            colorScheme="teal"
            onClick={onOpen}
            size="sm"
          >Agregar habitacion</Button>
      </div>
      <div className="flex items-center">
        <div className="flex items-center flex-wrap">
          {piso.habitaciones!.map((habitacion) => {
            return (
              <div className="px-2 py-1" key={habitacion.id}>
                <Center className="h-9 w-16 rounded-lg bg-cyan-500">
                  {habitacion.numeroHabitacion}
                </Center>
              </div>
            );
          })}
        </div>
        <IconButton
          className="ml-auto"
          aria-label="Eliminar piso"
          icon={<DeleteIcon />}
          onClick={() => deletePiso.mutate(piso.id)}
          colorScheme="red"
        />
      </div>
      <NewHabitacionForm isOpen={isOpen} onClose={onClose} piso={piso} />
    </div>
  );
};

export default HabitacionGroup;
