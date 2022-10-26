import { ipcRenderer, contextBridge } from "electron";
import { Prisma, HabitacionPiso } from "@prisma/client";

declare global {
  interface Window {
    Main: typeof api;
    ipcRenderer: typeof ipcRenderer;
  }
}

const api = {
  db: {
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
    },
    pisos: {
      postPiso: async (
        piso: Prisma.HabitacionPisoCreateInput
      ): Promise<HabitacionPiso> => {
        return ipcRenderer.invoke("postPiso", piso);
      },
      fetchPisosAndHab: async (): Promise<
        Array<
          Prisma.HabitacionPisoGetPayload<{ include: { habitaciones: true } }>
        >
      > => {
        return ipcRenderer.invoke("fetchPisosAndHabitaciones");
      },
      deletePisoById: async (id: number) => {
        return ipcRenderer.invoke("deletePisoById", id);
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
