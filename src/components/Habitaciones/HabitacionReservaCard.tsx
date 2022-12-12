import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Habitacion } from "@prisma/client";
import cntl from "cntl";
import { StringifyOptions } from "querystring";
import { createContext } from "react";
import HabitacionReservaForm from "./HabitacionReservaForm";
import { HabitacionContext, PropsHabitacionCardContext, StyleEstado } from "./HabitacionCardContext"



const HabitacionReservaCard = (props: PropsHabitacionCardContext ) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const estilosAdicionales = `${
    StyleEstado[props.habitacion.estado as keyof typeof StyleEstado]
  }`;
  console.log(props.habitacion);
  return (
    <>
      <div
        className={`text-3xl font-bold py-2 rounded-lg text-center ${estilosAdicionales}`}
        onClick={onOpen}
      >
        {props.habitacion.nombreHabitacion}
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent width={800} className={"!max-w-none"}>
          <ModalCloseButton />
          <ModalHeader>this is the header</ModalHeader>
          <ModalBody>
            <HabitacionContext.Provider value={props}>
              <HabitacionReservaForm />
            </HabitacionContext.Provider>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default HabitacionReservaCard;
