import { Habitacion } from "@prisma/client";
import cntl from "cntl";
import { createContext } from "react";

export const HabitacionContext = createContext<PropsHabitacionCardContext|null>(null)

export type PropsHabitacionCardContext = {
  readonly habitacion: Habitacion;
};

export const StyleEstado = {
  libre: cntl`text-primario bg-white border-primario border-4`,
  ocupada: cntl`text-white bg-primario border-primario border-4`,
  reservada: cntl`text-white bg-morado`,
};