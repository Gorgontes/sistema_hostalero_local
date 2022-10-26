import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, Center, IconButton, useDisclosure } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  deletePisoById,
  fetchHabitaciones,
  fetchPisosAndHab,
} from "../../api/Habitacion";
import NewHabitacionForm from "./NewHabitacionForm";

interface Props {
  piso: Awaited<ReturnType<typeof fetchPisosAndHab>>[number];
}

const HabitacionGroup: React.FC<Props> = ({ piso }) => {
  // const [habitaciones, setHabitaciones] = useState(piso.habitaciones)
  const {isOpen, onClose, onOpen} = useDisclosure();
  const { data: habitaciones } = useQuery(
    [`piso${piso.id}`],
    fetchHabitaciones,
    { initialData: piso.habitaciones }
  );
  const queryClient = useQueryClient();
  const deletePiso = useMutation(deletePisoById, {
    onSuccess: () => {
      queryClient.invalidateQueries(["habitaciones"]);
    },
  });
  return (
    <div className="px-4 py-1 w-full bg-gray-400 rounded-lg">
      <div>{piso.numeroPiso}</div>
      <div className="flex items-center">
        <div className="flex space-x-4 items-center">
          {habitaciones.map((habitacion) => {
            return (
              <Center className="h-9 w-16 rounded-lg bg-cyan-500">
                {habitacion.numeroHabitacion}
              </Center>
            );
          })}
          <IconButton
            aria-label="Agregar habitacion"
            icon={<AddIcon />}
            colorScheme="teal"
            onClick={onOpen}
          />
        </div>
        <IconButton
          className="ml-auto"
          aria-label="Eliminar piso"
          icon={<DeleteIcon />}
          onClick={() => deletePiso.mutate(piso.id)}
          colorScheme="red"
        />
      </div>
      <NewHabitacionForm isOpen={isOpen} onClose={onClose} pisoId={piso.id} />
    </div>
  );
};

export default HabitacionGroup;
