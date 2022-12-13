import React, { useContext } from "react";
import BcDetallesHabitacion from "../../basic_components/BcDetallesHabitacion";
import BcHabitacionNumber from "../../basic_components/BcHabitacionNumber";
import BcTextWithCircleState from "../../basic_components/BcTextWithCircleState";
import { BasicStateRoom } from "../../constants/enums/BasicStateRoom";
import { HabitacionContext, StyleEstado } from "./HabitacionCardContext";

type Props = {};

const HabitacionReservaForm = (props: Props) => {
  const habitacionContext = useContext(HabitacionContext);
  const styleEstado =
    StyleEstado[
    habitacionContext?.habitacion.estado as keyof typeof StyleEstado
    ];

  let currentState
  console.log(habitacionContext?.habitacion.banos)
  console.log(habitacionContext?.habitacion.camas)
  console.log(habitacionContext?.habitacion.wifi)
  console.log(habitacionContext?.habitacion.tv)
  switch (habitacionContext?.habitacion.estado) {
    case "libre":
      currentState = BasicStateRoom.free
      break;
    case "ocupado":
      currentState = BasicStateRoom.occupied
      break;
    case "reservado":
      currentState = BasicStateRoom.reserved
      break;

    default:
      currentState = BasicStateRoom.occupied
      break;
  }
  return (
    <div className="">
      <div className="flex space-x-28">
        <BcHabitacionNumber numero={habitacionContext?.habitacion.nombreHabitacion as string} estado={currentState} />
        <div className="flex divide-x divide-dashed hover:divide-solid shadow-sm shadow-primario rounded-lg">
          <div className="w-72 mx-auto items-center justify-center">
            Estado
            <div className="items-center flex justify-center">
              <BcTextWithCircleState estado={currentState} />
            </div>
          </div>

          <div className="mx-auto w-72 items-center justify-center">
            Detalles
            <BcDetallesHabitacion
              banos={habitacionContext?.habitacion.banos as number}
              camas={habitacionContext?.habitacion.camas as number}
              hasTv={habitacionContext?.habitacion.tv as boolean}
              hasWifi={habitacionContext?.habitacion.wifi as boolean}
            />

          </div>
        </div>
      </div>
      <div className="flex">
        <div className="flex-1">form huesped</div>
        <div className="flex-1">form estadia</div>
      </div>
    </div>
  );
};

export default HabitacionReservaForm;
