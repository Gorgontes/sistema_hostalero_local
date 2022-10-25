import { Prisma } from "@prisma/client";

export async function fetchHabitaciones() {
  return window.Main.db.habitaciones.fetchHabitaciones();
}

export async function postPiso(piso: Prisma.HabitacionPisoCreateInput) {
  return window.Main.db.pisos.postPiso(piso);
}
  