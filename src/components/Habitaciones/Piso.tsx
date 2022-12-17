import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useRef } from "react";
import { deletePisoById, fetchPisoById } from "../../api/Habitacion";
import HabitacionCard, { Estado } from "./HabitacionCard";
import HabitacionReservaCard from "./HabitacionReservaCard";

interface Props {
  piso: Awaited<ReturnType<typeof fetchPisoById>>;
}

const Piso: React.FC<Props> = ({piso}) => {
  const queryClient = useQueryClient();
  const { isOpen, onClose, onOpen } = useDisclosure();


  return (
    <>
      <div className="outline-primario outline rounded-lg p-0 block">
        <div className="bg-primario text-white text-3xl p-3 rounded-md">
          Piso: {piso.numeroPiso}
        </div>
        <div className="p-4">
          {piso.habitaciones.length ? (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(8rem,1fr))] gap-4">
              {piso.habitaciones.map((habitacion) => (
                <HabitacionReservaCard habitacion={habitacion} key={habitacion.id}/>
              ))}
            </div>
          ) : (
            <p>No hay habitaciones registradas en este piso</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Piso;
