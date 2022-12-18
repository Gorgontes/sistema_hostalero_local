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
import { useContext, useState } from "react";
import { HabitacionesFiltroContext } from "./HabitacionesContext";

type Props = {};

const HabitacionesPage = (props: Props) => {
  const habitacionFiltroContext = useContext(HabitacionesFiltroContext);
  const [estados, setEstados] = useState({ocupado: 1,reservado: 0, libre: 0});
  const { data: pisos, isLoading } = useQuery(["pisos"], async() => {
    const pisos = await fetchPisosAndHab(habitacionFiltroContext!);
    const estados = {
      ocupado: 0,
      reservado: 0,
      libre: 0,
    };
    for (const piso of pisos ?? []) {
      piso.habitaciones.forEach((habitacion) => {
        return estados[habitacion.estado as keyof typeof estados]++;
      });
    }
    setEstados({ ...estados })
    return pisos
  }, {onSuccess: () => {
  }});

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
          {pisos!.map((habitacion) => (
            <Piso piso={habitacion} key={habitacion.id} />
          ))}
        </div>
      </div>
      <div className="">
        <_Filtros />
        <_EstadosHabitaciones estados={estados} />
      </div>
    </div>
  );
};

export default HabitacionesPage;
