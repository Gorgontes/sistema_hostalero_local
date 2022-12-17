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
import { ElementRef, useRef, useState } from "react";
import {  useQuery } from "@tanstack/react-query";
import { fetchPisosAndHab } from "../../api/Habitacion";

let key = 0

const _Filtros = () => {
  const banosRef = useRef<ElementRef<typeof BcTextAndCount>>(null);
  const camasRef = useRef<ElementRef<typeof BcTextAndCount>>(null);
  // const [filtros, setFiltros] = useState<{banos: number, camas: number}>({})
  const {data} = useQuery(['pisos'], () => {
    fetchPisosAndHab()
  })

  const aplicarFiltros = () => {
    const filtros:{banos: number, camas: number} = {} as any
    if (banosRef.current?.value) 
      filtros['banos'] = +banosRef.current?.value
    if (camasRef.current?.value)
      filtros['camas'] = +camasRef.current?.value
    // setFiltros(filtros)
  }

  const limpiarFiltros = () => {
    banosRef.current!.value = ''
    camasRef.current!.value = ''
  }

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
              <div className="py-3 text-center" key={key}>
                <BcTextAndCount label="Baños Privados" ref={banosRef}/>
                <BcTextAndCount label="Camas" ref={camasRef}/>
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
