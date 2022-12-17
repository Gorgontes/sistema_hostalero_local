import { Habitacion, Prisma } from "@prisma/client";

export async function fetchHabitaciones(id?: number): Promise<Habitacion[]> {
  return window.Main.db.habitaciones.fetchHabitaciones(id);
}

export async function postHabitaciones(habitacion: Prisma.HabitacionCreateInput) {
  return window.Main.db.habitaciones.postHabitacion(habitacion);
}

export async function updateHabitacion(habitacion: Prisma.HabitacionUpdateInput, id: number) {
  return window.Main.db.habitaciones.updateHabitacion(habitacion, id);
}

export async function deleteHabitacionById(id: number) {
  return window.Main.db.habitaciones.deleteHabitacionById(id);
}

export async function postPiso(piso: Prisma.HabitacionPisoCreateInput) {
  return window.Main.db.pisos.postPiso(piso);
}

export async function fetchPisosAndHab(habitacionFitlro?: Prisma.HabitacionWhereInput) {
  return window.Main.db.pisos.fetchPisosAndHab(habitacionFitlro);
}

export async function deletePisoById(id: number) {
  return window.Main.db.pisos.deletePisoById(id);
}

export async function fetchPisoById(id: number): Promise<Prisma.HabitacionPisoGetPayload<{ include: { habitaciones: true } }>> {
  return window.Main.db.pisos.fetchPisoById(id);
}