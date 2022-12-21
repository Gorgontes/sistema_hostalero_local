import { ipcRenderer, contextBridge } from "electron";
import { Prisma, HabitacionPiso, Habitacion, Reserva } from "@prisma/client";

declare global {
  interface Window {
    Main: typeof api;
    ipcRenderer: typeof ipcRenderer;
  }
}

const api = {
  googleapi: {
    sincronizar: () => {
      ipcRenderer.invoke("sincronizar");
    },
    saveConfigDrive: async (fileId: string, nameSheet: string) => {
      ipcRenderer.invoke('saveConfigDrive', fileId, nameSheet)
    }
  },
  db: {
    reportes: {
      getReporte: async (): Promise<
        Prisma.HabitacionGetPayload<{
          include: {
            reservaActual: {
              include: {
                cliente: true;
              };
            };
          };
        }>
      > => {
        return ipcRenderer.invoke("getReporte");
      },
    },
    reserva: {
      getReservaId: async (id: number) => {
        return ipcRenderer.invoke("getReservaById", id);
      },
      reservarHabitacion: async (
        datosReserva: Prisma.ReservaCreateWithoutHabitacionInput,
        habitacion: Habitacion,
        estado: string
      ) => {
        // if(typeof datosReserva.cliente.create?.fechaNacimiento == 'object')
        //   datosReserva.cliente.create.fechaNacimiento = datosReserva.cliente.create?.fechaNacimiento?.getTime()!
        // console.warn('prelaod', datosReserva.cliente)
        return ipcRenderer.invoke(
          "reservarHabitacion",
          datosReserva,
          habitacion,
          estado
        );
      },
      ocuparReserva: async (habitacion: Habitacion) => {
        return ipcRenderer.invoke("ocuparReservaPendiente", habitacion);
      },
      finalizarReserva: async (reserva: Reserva) => {
        return ipcRenderer.invoke("finalizarReserva", reserva);
      },
    },
    users: {
      createUser: async (user: Prisma.UserCreateInput) => {
        return ipcRenderer.invoke("createUser", user);
      },
      getUsers: async () => {
        return ipcRenderer.invoke("getUsers");
      },
    },
    habitaciones: {
      fetchHabitaciones: async (id?: number) => {
        return ipcRenderer.invoke("fetchHabitaciones", id);
      },
      postHabitacion: async (habitacion: Prisma.HabitacionCreateInput) => {
        return ipcRenderer.invoke("postHabitacion", habitacion);
      },
      updateHabitacion: async (
        habitacion: Prisma.HabitacionUpdateInput,
        id: number
      ) => {
        return ipcRenderer.invoke("updateHabitacion", habitacion, id);
      },
      deleteHabitacionById: async (id: number) => {
        return ipcRenderer.invoke("deleteHabitacionById", id);
      },
    },
    pisos: {
      postPiso: async (
        piso: Prisma.HabitacionPisoCreateInput
      ): Promise<HabitacionPiso> => {
        return ipcRenderer.invoke("postPiso", piso);
      },
      fetchPisosAndHab: async (
        habitacionFiltro?: Prisma.HabitacionWhereInput
      ): Promise<
        Array<
          Prisma.HabitacionPisoGetPayload<{ include: { habitaciones: true } }>
        >
      > => {
        return ipcRenderer.invoke(
          "fetchPisosAndHabitaciones",
          habitacionFiltro
        );
      },
      deletePisoById: async (id: number) => {
        return ipcRenderer.invoke("deletePisoById", id);
      },
      fetchPisoById: async (id: number) => {
        return ipcRenderer.invoke("fetchPisoById", id);
      },
    },
  },

  Minimize: () => {
    ipcRenderer.send("minimize");
  },
  Maximize: () => {
    ipcRenderer.send("maximize");
  },
  Close: () => {
    ipcRenderer.send("close");
  },

  on: (channel: string, callback: (data: any) => void) => {
    ipcRenderer.on(channel, (_, data) => callback(data));
  },
};
contextBridge.exposeInMainWorld("Main", api);
/**
 * Using the ipcRenderer directly in the browser through the contextBridge ist not really secure.
 * I advise using the Main/api way !!
 */
contextBridge.exposeInMainWorld("ipcRenderer", ipcRenderer);
