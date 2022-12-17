import { Prisma } from "@prisma/client";

export async function postReserva(reversa: Prisma.ReservaCreateInput) {
  return window.Main.db.reserva.postReserva(reversa)
}