import { createContext } from "react";

export const HabitacionesFiltroContext = createContext<FiltroHabitaciones | null>({ banos: undefined, camas: undefined })

export type FiltroHabitaciones = {
  banos: undefined | { equals: number }
  camas: undefined | { equals: number }
};
