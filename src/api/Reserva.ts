import { Habitacion, Prisma, Reserva } from "@prisma/client";

export async function reservarHabitacion({
  datosReserva,
  habitacion,
  estado,
}: {
  datosReserva: Prisma.ReservaCreateWithoutHabitacionInput;
  habitacion: Habitacion;
  estado: string;
}) {
  return window.Main.db.reserva.reservarHabitacion(datosReserva, habitacion, estado);
}
export async function finalizarReserva(reserva: Reserva) {
  return window.Main.db.reserva.finalizarReserva(reserva)
}

export async function getReservaById(id: number) {
  return window.Main.db.reserva.getReservaId(id);
}

export async function ocuparReserva(habitacion: Habitacion): Promise<Prisma.ReservaGetPayload<{include: {cliente: true}}>> {
  return window.Main.db.reserva.ocuparReserva(habitacion)
}
