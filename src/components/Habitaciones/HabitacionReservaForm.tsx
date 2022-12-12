import React, { useContext } from "react";
import { HabitacionContext, StyleEstado } from "./HabitacionCardContext";

type Props = {};

const HabitacionReservaForm = (props: Props) => {
  const habitacionContext = useContext(HabitacionContext);
  const styleEstado =
    StyleEstado[
      habitacionContext?.habitacion.estado as keyof typeof StyleEstado
    ];
  return (
    <div className="">
      <div className="flex space-x-4">
        <div className={`${styleEstado} text-3xl font-bold py-8 text-center flex items-center w-48 justify-center rounded-lg`}>
          <span>{habitacionContext?.habitacion.nombreHabitacion}</span>
        </div>
        <div>datos generales</div>
      </div>
      <div className="flex">
        <div className="flex-1">form huesped</div>
        <div className="flex-1">form estadia</div>
      </div>
    </div>
  );
};

export default HabitacionReservaForm;
