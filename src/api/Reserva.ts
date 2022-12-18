import { Habitacion, Prisma } from "@prisma/client";

// export async function postReserva(reversa: Prisma.ReservaCreateInput) {
//   return window.Main.db.reserva.postReserva(reversa);
// }

export async function reservarHabitacion(
  datosReserva: Prisma.ReservaCreateInput,
  habitacion: Habitacion
) {
  return window.Main.db.reserva.reservarHabitacion(datosReserva, habitacion);
}
export async function finalizarReserva() {}
