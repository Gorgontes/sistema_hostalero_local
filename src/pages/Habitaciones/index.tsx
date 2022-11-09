import { AddIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Button,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  StackDivider,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { fetchPisosAndHab } from "../../api/Habitacion";
import HabitacionCard from "../../components/HabitacionCard";
import HabitacionGroup from "./HabitacionGroup";
import NewPisoForm from "./NewPisoForm";

type Props = {};

const HabitacionesPage = (props: Props) => {
  const { data, isLoading, status } = useQuery(
    ["habitaciones"],
    fetchPisosAndHab
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(data);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <div className="h-full grid grid-cols-[1fr_260px]">
      <div className="grow flex flex-col">
        <div className="flex px-3 pb-5 pt-1 align-baseline">
          <Heading className="text-primario inline" as='h2' size='lg'>Habitaciones</Heading>
          <InputGroup className="ml-auto" width='80'>
            <Input className="!bg-white shadow-lg"/>
            <InputRightElement pointerEvents='none' children={<Search2Icon/>} className=''/>
          </InputGroup>
        </div>
        <div className="outline grow h-0">
          <HabitacionCard nombre="101" estado="reservada"/>
        </div>
      </div>
      <div >

      </div>
      {/* <Heading size="lg">Habitaciones</Heading>
      <div className="grow shrink basis-auto flex flex-col relative">
        <VStack divider={<StackDivider borderColor="gray.200" />}>
          {data!.map((piso) => (
            <HabitacionGroup piso={piso} key={piso.id} />
          ))}
        </VStack>
        <div className="absolute bottom-0 right-0 ">
          <Button
            aria-label="Agregar piso"
            rightIcon={<AddIcon />}
            onClick={onOpen}
            colorScheme="green"
          >
            Agregar piso
          </Button>
        </div>
      </div>
      <NewPisoForm isOpen={isOpen} onClose={onClose} /> */}
    </div>
  );
};

export default HabitacionesPage;
