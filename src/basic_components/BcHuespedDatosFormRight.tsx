import {
  AddIcon,
  CalendarIcon,
  CheckIcon,
  EditIcon,
  LockIcon,
} from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Textarea,
} from "@chakra-ui/react";
import { Reserva } from "@prisma/client";
import { ReactNode, useContext, useState, forwardRef, useImperativeHandle } from "react";
import { HabitacionContext } from "../components/Habitaciones/HabitacionCardContext";
import { BasicStateRoom } from "../constants/enums/BasicStateRoom";

type Props = {
  children: () => ReactNode;
  reserva?: Reserva;
};

type DatosHuesped = {
  fechaIngreso: Date;
  noches: number;
  precio: number;
}
interface Handlers {
  getDatos: () => DatosHuesped;
}

const BcHuespedDatosFormRight = forwardRef<Handlers,Props>(({ children, reserva}, ref) => {
  const habitacionContext = useContext(HabitacionContext);
  const [fechaIngreso, setFechaIngreso] = useState<Date>(new Date());
  const [noches, setNoches] = useState(() => {
      if(habitacionContext?.habitacion.estado === "libre")
        return 1
      return reserva?.noches ?? undefined
  });
  const [isCostEditable, setIsCostEditable] = useState(
    () => !!!habitacionContext?.habitacion.precioReferencial
  );
  const fechaEstimada = new Date();
  const [precio, setPrecio] = useState(
    () => {
      if(habitacionContext?.habitacion.estado === "libre")
        return habitacionContext?.habitacion.precioReferencial?.toFixed(2)
      return reserva?.precio?.toFixed(2)
    }
  );
  console.log('reserva', reserva)
  useImperativeHandle(
    ref,
    () => ({
      getDatos: () => {
        return {
          precio: parseFloat(precio!), fechaIngreso, noches: noches!
        }
      }
    }),
    [precio, noches, fechaIngreso],
  )
  fechaEstimada.setDate(fechaIngreso.getDate() + noches!);
  return (
    <>
    <div className="">
      <div className="text-primario text-3xl my-3 font-bold">
        Datos de Estadía
      </div>
      <div className="flex items-center">
        <div className="text-primario mr-2">Fecha de Ingreso</div>
        <div className="w-[200px] mr-3">
          <Input
            placeholder="fecha"
            size="md"
            type="date"
            value={fechaIngreso.toISOString().split("T").at(0)}
            onChange={(e) => setFechaIngreso(new Date(e.currentTarget.value))}
            isDisabled={habitacionContext?.habitacion.estado === 'ocupado'}
          />
        </div>
        <div className="text-primario mr-2">Noches</div>
        <div className="">
          <NumberInput
            min={1}
            value={noches}
            onChange={(_, noches) => setNoches(noches)}
            isDisabled={habitacionContext?.habitacion.estado === 'ocupado'}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </div>
      </div>
      <div className="flex items-center my-5">
        <div className="text-primario mr-5">Fecha Estimada de Salida</div>
        <div className="text-primario text-2xl">
          {fechaEstimada.toLocaleDateString("es-PE")}
        </div>
      </div>
      <div className="flex items-center mt-2 text-center">
        <div className="text-primario mr-5">Costo</div>
        {isCostEditable ? (
          <NumberInput
            onBlur={() => setIsCostEditable(false)}
            className={"w-36"}
            // value={precio}
            defaultValue={precio ?? undefined}
            onChange={val => setPrecio(val)}
          >
            <NumberInputField autoFocus />
          </NumberInput>
        ) : (
          <>
            <div
              className="text-primario text-2xl w-36"
              onDoubleClick={() => precio != null && setIsCostEditable(true)}
            >
              S/<span className="ml-2">{precio}</span>
            </div>
            {
            habitacionContext?.habitacion.estado !== "ocupado" && <IconButton
              icon={<EditIcon />}
              aria-label={""}
              className={"ml-2"}
              onClick={() => precio != null && setIsCostEditable(true)}
            />
            }
          </>
        )}
        {}
      </div>
      {children()}
    </div>
    </>
  );

});

export default BcHuespedDatosFormRight;
// ---------------------------------------- intern
// ---------------------------------------- not anymore :)
type _Props = {
  status: BasicStateRoom;
  onOcupar?: () => void;
  onReservar?: () => void;
  onFinalizar?: () => void;
};
export const _Buttons = (props: _Props) => {
  switch (props.status) {
    case BasicStateRoom.free:
      return (
        <div className="flex mt-10 justify-around">
          <Button
            leftIcon={<CheckIcon />}
            color={"white"}
            className="w-[170px]"
            onClick={() => (props.onOcupar ? props.onOcupar() : undefined)}
          >
            Ocupar
          </Button>
          <Button
            leftIcon={<CalendarIcon />}
            color={"white"}
            backgroundColor="purple"
            className="w-[170px]"
            onClick={() => (props.onReservar ? props.onReservar() : undefined)}
          >
            Reservar
          </Button>
        </div>
      );
    case BasicStateRoom.occupied:
      return (
        <div className="flex mt-10 justify-center">
          <Button
            leftIcon={<CheckIcon />}
            color={"white"}
            className="w-[170px]"
            onClick={() =>
              props.onFinalizar ? props.onFinalizar() : undefined
            }
          >
            Finalizar
          </Button>
        </div>
      );
    case BasicStateRoom.reserved:
      return (
        <div className="flex justify-center mt-10">
          <Button
            leftIcon={<LockIcon />}
            color={"white"}
            className="w-[170px]"
            onClick={() => (props.onOcupar ? props.onOcupar() : undefined)}
          >
            Ocupar
          </Button>
        </div>
      );

    default:
      return <>Error Generar Botones</>;
  }
};
