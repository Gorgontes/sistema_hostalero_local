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
import Piso from "../../components/Habitaciones/Piso";
import _Filtros from "./_Filtros";
import _EstadosHabitaciones from "./_EstadosHabitaciones";

type Props = {};

const HabitacionesPage = (props: Props) => {
  const { data: habitaciones, isLoading } = useQuery(
    ["pisos"],
    () => fetchPisosAndHab()
  );
  // const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(habitaciones);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <div className="h-full grid grid-cols-[1fr_260px]">
      <div className="grow flex flex-col m-5">
        <div className="flex px-3 pb-5 pt-1 align-baseline">
          <Heading className="text-primario inline" as="h2" size="lg">
            Habitaciones
          </Heading>
          {/* <InputGroup className="ml-auto" width="80">
            <Input className="!bg-white shadow-lg" />
            <InputRightElement
              pointerEvents="none"
              children={<Search2Icon />}
              className=""
            />
          </InputGroup> */}
        </div>
        <div className="grow h-0 space-y-4">
          {habitaciones!.map((habitacion) => (
            <Piso piso={habitacion} key={habitacion.id} />
          ))}
        </div>
      </div>
      <div className="">
        <_Filtros />
        <_EstadosHabitaciones />
      </div>
    </div>
  );
};

export default HabitacionesPage;
