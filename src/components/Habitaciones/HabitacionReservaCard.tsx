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
import _ModalLogoAndTitle from "../ConnectionDrive/_ModalLogoAndTitle";



const HabitacionReservaCard = (props: PropsHabitacionCardContext) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const estilosAdicionales = `${StyleEstado[props.habitacion.estado as keyof typeof StyleEstado]}`;
  let _sizeNumber = props.habitacion.nombreHabitacion.length > 5 ? "text-2xl" : "text-3xl"

  return (
    <>
      <div
        className={`
          ${_sizeNumber}
          font-bold
          py-2 rounded-lg
          text-center
          ${estilosAdicionales}
        `}
        onClick={onOpen}
      >
        {props.habitacion.nombreHabitacion}
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent width={1100} className={"!max-w-none"} >
          <ModalCloseButton />
          <ModalHeader className="bg-primario text-background_main">Habitación</ModalHeader>
          <ModalCloseButton className="!bg-rojo_suave text-background_main hover:bg-white" />
          <ModalBody>
            <HabitacionContext.Provider value={props}>
              <HabitacionReservaForm onClose={onClose}/>
            </HabitacionContext.Provider>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default HabitacionReservaCard;
