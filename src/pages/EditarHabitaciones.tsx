import { Button } from "@chakra-ui/react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { fetchPisosAndHab } from "../api/Habitacion";
import PisoEditor from "../components/Habitaciones/PisoEditor";

type Props = {};

const EditarHabitaciones = (props: Props) => {
  const { data: pisos, isLoading } = useQuery(
    ["habitaciones"],
    fetchPisosAndHab
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }
  console.log(pisos);
  return (
    <div className="h-full outline flex flex-col p-4">
      <div className="overflow-auto py-4 px-2 h-0 grow">
        {
          pisos!.map((piso) => <PisoEditor key={piso.id} piso={piso}/>)
        }
      </div>
      <Button className="w-40 mt-4 self-end mr-2" colorScheme={'orange'}>Agregar piso</Button>
    </div>
  );
};

export default EditarHabitaciones;
