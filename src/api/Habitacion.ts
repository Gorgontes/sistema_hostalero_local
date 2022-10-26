import { Habitacion, Prisma } from "@prisma/client";

export async function fetchHabitaciones(): Promise<Habitacion[]> {
  return window.Main.db.habitaciones.fetchHabitaciones();
}

export async function postHabitaciones(habitacion: Prisma.HabitacionCreateInput) {
  return window.Main.db.habitaciones.postHabitacion(habitacion);
}

export async function postPiso(piso: Prisma.HabitacionPisoCreateInput) {
  return window.Main.db.pisos.postPiso(piso);
}
  
export async function fetchPisosAndHab() {
  return window.Main.db.pisos.fetchPisosAndHab();
}

export async function deletePisoById(id: number) {
  return window.Main.db.pisos.deletePisoById(id);
}