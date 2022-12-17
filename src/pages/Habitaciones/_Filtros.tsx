import { ArrowForwardIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  StackDivider,
  Box,
  Text,
  Button,
} from "@chakra-ui/react";
import BcCheckbox from "../../basic_components/BcCheckbox";
import BcStateRoom from "../../basic_components/BcStateRoom";
import BcTextAndCount from "../../basic_components/BcTextAndCount";
import { BasicStateRoom } from "../../constants/enums/BasicStateRoom";
import { ElementRef, useRef, useState, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPisosAndHab } from "../../api/Habitacion";
import { HabitacionesFiltroContext } from "./HabitacionesContext";

const filtros: { banos: { equals: number }; camas: { equals: number } } =
  {} as any;


const _Filtros = () => {
  const queryClient = useQueryClient();
  const banosRef = useRef<ElementRef<typeof BcTextAndCount>>(null);
  const camasRef = useRef<ElementRef<typeof BcTextAndCount>>(null);
  const habitacionFiltroContext = useContext(HabitacionesFiltroContext)
  const [keyCama, setKeyCama] = useState(0)
  const [keyBano, setKeyBano] = useState(1)

  const aplicarFiltros = () => {
    if (banosRef.current?.value)
      habitacionFiltroContext!.banos = { equals: +banosRef.current?.value };
    if (camasRef.current?.value)
      habitacionFiltroContext!.camas = { equals: +camasRef.current?.value };
    queryClient.invalidateQueries(["pisos"]);
    console.log("test");
  };

  const limpiarFiltros = () => {
    habitacionFiltroContext!.banos = {} as any
    habitacionFiltroContext!.camas = {} as any
    banosRef.current!.value = "";
    camasRef.current!.value = "";
    setKeyBano((keyBano + 2) % 4)
    setKeyCama((keyCama + 2) % 4)
    queryClient.invalidateQueries(["pisos"]);
  };

  return (
    <div className="shadow-lg my-3 rounded-lg">
      <Card>
        {/* <CardHeader>
          <Heading size="xs" className="text-center text-primario">
            Filtros
          </Heading>
        </CardHeader> */}
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4" className="">
            <Box className="divide-y">
              <Heading className="py-3 text-center flex items-center" size="xs">
                <div className="text-primario">Filtros </div>
                {/* <div>Filtros ({countOfFiltersApplied})</div> */}
                <Button
                  rightIcon={<CloseIcon />}
                  colorScheme="teal"
                  variant="outline"
                  size="sm"
                  borderRadius="20px"
                  className="ml-auto"
                  onClick={limpiarFiltros}
                >
                  Limpiar
                </Button>
              </Heading>
              {/* <Heading className='py-3 text-center' size='xs'> */}
              <div className="py-3 text-center">
                <BcTextAndCount label="Baños Privados" ref={banosRef} key={keyBano} />
                <BcTextAndCount label="Camas" ref={camasRef} key={keyCama}/>
                {/* <BcCheckbox label="Tv" isActive={false} ref={tvRef}/>
                <BcCheckbox label="Wifi" isActive={true} ref={wifiRef}/> */}
              </div>

              <Button size="md" className="w-full" onClick={aplicarFiltros}>
                Aplicar Filtros
              </Button>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </div>
  );
};

export default _Filtros;
