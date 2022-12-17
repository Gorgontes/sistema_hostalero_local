import { Habitacion } from "@prisma/client";
import cntl from "cntl";
import { createContext } from "react";

export const HabitacionContext = createContext<PropsHabitacionCardContext|null>(null)

export type PropsHabitacionCardContext = {
  readonly habitacion: Habitacion;
};

export const StyleEstado = {
  libre: cntl`text-primario bg-white border-primario border-4`,
  ocupado: cntl`text-white bg-primario border-primario border-4`,
  reservado: cntl`text-white bg-morado border-morado border-4`,
};