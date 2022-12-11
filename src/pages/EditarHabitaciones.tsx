import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { fetchPisosAndHab, postPiso } from "../api/Habitacion";
import PisoEditor from "../components/Habitaciones/PisoEditor";
import PisoForm from "../components/Habitaciones/PisoForm";

type Props = {};

const EditarHabitaciones = (props: Props) => {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: pisos, isLoading } = useQuery(["pisos"], fetchPisosAndHab);

  const { mutate: _postPiso } = useMutation(postPiso, {
    onSuccess: () => {
      queryClient.invalidateQueries(["pisos"]);
    },
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }
  return (
    <div className="h-full flex flex-col p-4">
      <div className="overflow-auto py-4 px-2 h-0 grow space-y-4">
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
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <PisoForm onSubmit={(piso) => {
              onClose();
              _postPiso(piso);
            }}/>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditarHabitaciones;
