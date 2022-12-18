import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { ElementRef, useContext, useRef, useState } from "react";
import {
  finalizarReserva,
  getReservaById,
  ocuparReserva,
  reservarHabitacion,
} from "../../api/Reserva";
// import { postReserva } from "../../api/Reserva";
import BcDetallesHabitacion from "../../basic_components/BcDetallesHabitacion";
import BcHabitacionNumber from "../../basic_components/BcHabitacionNumber";
import BcHuespedDatosFormLeft from "../../basic_components/BcHuespedDatosFormLeft";
import BcHuespedDatosFormRight, {
  _Buttons,
} from "../../basic_components/BcHuespedDatosFormRight";
import BcTextWithCircleState from "../../basic_components/BcTextWithCircleState";
import { BasicStateRoom } from "../../constants/enums/BasicStateRoom";
import { HabitacionContext, StyleEstado } from "./HabitacionCardContext";

type Props = {
  onClose: () => void;
};

const HabitacionReservaForm = (props: Props) => {
  const queryClient = useQueryClient();
  const habitacionContext = useContext(HabitacionContext);
  // const {data: reserva} = useQuery()
  const huespedFormRef =
    useRef<ElementRef<typeof BcHuespedDatosFormLeft>>(null);
  const estadiaFormRef =
    useRef<ElementRef<typeof BcHuespedDatosFormRight>>(null);
  console.log("form render", habitacionContext?.habitacion.id);
  const { data: reserva } = useQuery(
    ["reserva", habitacionContext?.habitacion.id],
    async () => {
      if (habitacionContext?.habitacion.reservaId != null) {
        const res = await getReservaById(
          habitacionContext!.habitacion.reservaId
        );
        setCargo(!cargo);
        return res;
      }
      return null;
    }
  );

  const { mutate: _reservarHabitacion } = useMutation(reservarHabitacion, {
    onSuccess() {
      queryClient.invalidateQueries(["pisos"]);
    },
  });
  const { mutate: _ocuparHabitacion } = useMutation(ocuparReserva, {
    onSuccess() {
      queryClient.invalidateQueries(["pisos"]);
    },
  });
  const { mutate: _finalizarReserva } = useMutation(finalizarReserva, {
    onSuccess() {
      queryClient.invalidateQueries(["pisos"]);
    },
  });
  console.log("habitacion context", habitacionContext?.habitacion);
  const [cargo, setCargo] = useState(true);
  const onOcupar = () => {
    const datosHuesped = huespedFormRef.current?.getDatosHuesped();
    const datosEstadia = estadiaFormRef.current?.getDatos();
    if (habitacionContext?.habitacion?.reservaId === null)
      _reservarHabitacion({
        datosReserva: {
          cliente: {
            create: {
              ciudadProcedencia: datosHuesped?.ciudadProcedencia,
              nombresCompletos: datosHuesped?.nombresCompletos!,
              numeroDocumento: datosHuesped?.numeroDocumento!,
            },
          },
          fechaIngreso: new Date(),
          noches: datosEstadia?.noches,
          precio: datosEstadia?.precio,
          observacion: datosHuesped?.observaciones,
        },
        habitacion: habitacionContext!?.habitacion,
        estado: "ocupado",
      });
    else _ocuparHabitacion(habitacionContext!.habitacion);

    props.onClose();
  };

  const onReservar = () => {
    const datosHuesped = huespedFormRef.current?.getDatosHuesped();
    const datosEstadia = estadiaFormRef.current?.getDatos();
    _reservarHabitacion({
      datosReserva: {
        cliente: {
          create: {
            ciudadProcedencia: datosHuesped?.ciudadProcedencia,
            nombresCompletos: datosHuesped?.nombresCompletos!,
            numeroDocumento: datosHuesped?.numeroDocumento!,
          },
        },
        noches: datosEstadia?.noches,
        precio: datosEstadia?.precio,
        observacion: datosHuesped?.observaciones,
        fechaReserva: new Date(),
      },
      habitacion: habitacionContext!?.habitacion,
      estado: "ocupado",
    });
    props.onClose();
  };

  const onFinalizar = () => {
    if (reserva) _finalizarReserva(reserva);
    props.onClose();
  };

  let currentState: BasicStateRoom;
  switch (habitacionContext?.habitacion.estado) {
    case "libre":
      currentState = BasicStateRoom.free;
      break;
    case "ocupado":
      currentState = BasicStateRoom.occupied;
      break;
    case "reservado":
      currentState = BasicStateRoom.reserved;
      break;

    default:
      currentState = BasicStateRoom.occupied;
      break;
  }
  return (
    <div className="">
      <div className="flex space-x-28">
        <BcHabitacionNumber
          numero={habitacionContext?.habitacion.nombreHabitacion as string}
          estado={currentState}
        />
        <div className="flex divide-x divide-dashed hover:divide-solid shadow-sm shadow-primario rounded-lg">
          <div className="w-72 mx-auto flex flex-col">
            Estado
            <div className="items-center flex justify-center grow">
              <BcTextWithCircleState estado={currentState} />
            </div>
          </div>

          <div className="mx-auto w-72 items-center justify-center">
            Detalles
            <BcDetallesHabitacion
              banos={habitacionContext!?.habitacion.banos}
              camas={habitacionContext!?.habitacion.camas}
              hasTv={habitacionContext!?.habitacion.tv}
              hasWifi={habitacionContext!?.habitacion.wifi}
            />
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="flex-1 mr-5">
          <BcHuespedDatosFormLeft
            ref={huespedFormRef}
            status={currentState}
            reserva={reserva}
            huesped={reserva?.cliente}
            key={reserva?.cliente?.id}
          />
        </div>
        <div className="flex-1">
          <BcHuespedDatosFormRight ref={estadiaFormRef}>
            {() => (
              <>
                <_Buttons
                  status={currentState}
                  onOcupar={onOcupar}
                  onFinalizar={onFinalizar}
                  onReservar={onReservar}
                />
              </>
            )}
          </BcHuespedDatosFormRight>
        </div>
      </div>
      <div className="mt-10"></div>
      <input type="text" />
    </div>
  );
};

export default HabitacionReservaForm;
