import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { fetchPisosAndHab } from "../api/Habitacion";
import PisoEditor from "../components/Habitaciones/PisoEditor";

type Props = {};

const EditarHabitaciones = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: pisos, isLoading } = useQuery(
    ["pisos"],
    fetchPisosAndHab
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }
  console.log(pisos);
  return (
    <div className="h-full outline flex flex-col p-4">
      <div className="overflow-auto py-4 px-2 h-0 grow">
        {pisos!.map((piso) => (
          <PisoEditor key={piso.id} piso={piso} />
        ))}
      </div>
      <Button
        className="w-40 mt-4 self-end mr-2"
        colorScheme={"orange"}
        onClick={onOpen}
      >
        Agregar piso
      </Button>
       <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident corporis amet distinctio deserunt eos similique eum ipsa cupiditate quo, non repellat enim, numquam harum perferendis consequuntur quae veniam impedit eius.</p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditarHabitaciones;
