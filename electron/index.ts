// Native
import { join } from "path";
import { syncSheet } from "./googleapi";

// Packages
import { BrowserWindow, app, ipcMain } from "electron";
import isDev from "electron-is-dev";
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";

// Prisma
import { PrismaClient, Prisma, Habitacion, Reserva } from "@prisma/client";
const prisma = new PrismaClient();

const height = 920;
const width = 1500;

function createWindow() {
  const window = new BrowserWindow({
    width,
    height,
    show: true,
    resizable: true,
    fullscreenable: true,
    webPreferences: {
      preload: join(__dirname, "preload.js"),
    },
  });

  const port = process.env.PORT || 3000;
  const url = isDev
    ? `http://localhost:${port}`
    : join(__dirname, "../src/out/index.html");

  if (isDev) {
    installExtension(REACT_DEVELOPER_TOOLS);
    window?.loadURL(url);
  } else {
    window?.loadFile(url);
  }

  // For AppBar
  ipcMain.on("minimize", () => {
    window.isMinimized() ? window.restore() : window.minimize();
    // or alternatively: win.isVisible() ? win.hide() : win.show()
  });
  ipcMain.on("maximize", () => {
    window.isMaximized() ? window.restore() : window.maximize();
  });

  ipcMain.on("close", () => {
    window.close();
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  console.log(`el id de la extension es: ${REACT_DEVELOPER_TOOLS.id}`);
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.handle("createUser", async (_, userData: Prisma.UserCreateInput) => {
  // setTimeout(() => event.sender.send('message', 'hi from electron'), 500);
  const newUser = await prisma.user.create({
    data: userData,
  });
  console.log(`se creo el usuario: ${newUser.id} con ${newUser.name}`);
  return true;
});

ipcMain.handle("getUsers", async () => {
  return prisma.user.findMany();
});

ipcMain.handle("fetchHabitaciones", async (_, id?: number) => {
  if (id == null) return prisma.habitacion.findMany();
  return prisma.habitacion.findMany({
    where: {
      pisoId: {
        equals: id,
      },
    },
  });
});

ipcMain.handle(
  "postHabitacion",
  async (_, habitacion: Prisma.HabitacionCreateInput) => {
    return prisma.habitacion.create({
      data: habitacion,
      select: {
        id: true,
      },
    });
  }
);

ipcMain.handle(
  "updateHabitacion",
  async (_, habitacion: Prisma.HabitacionCreateInput, id: number) => {
    return prisma.habitacion.update({
      where: { id },
      data: habitacion,
    });
  }
);

ipcMain.handle(
  "postPiso",
  async (_, piso: Prisma.HabitacionPisoCreateInput) => {
    return prisma.habitacionPiso.create({
      data: piso,
      select: {
        id: true,
      },
    });
  }
);

ipcMain.handle(
  "fetchPisosAndHabitaciones",
  async (_, habitacionesFiltros: Prisma.HabitacionWhereInput) => {
    console.log(habitacionesFiltros);
    return prisma.habitacionPiso.findMany({
      include: {
        habitaciones: {
          where: habitacionesFiltros,
        },
        // habitaciones: {
        //   where: {banos: {equals: 2 }}
        // },
      },
    });
  }
);

ipcMain.handle("deletePisoById", async (_, id: number) => {
  return prisma.habitacionPiso.delete({
    where: { id },
    select: { id: true },
  });
});

ipcMain.handle("fetchPisoById", async (_, id: number) => {
  return prisma.habitacionPiso.findFirst({
    where: { id },
    include: {
      habitaciones: true,
    },
  });
});

ipcMain.handle("deleteHabitacionById", async (_, id: number) => {
  return prisma.habitacion.delete({
    where: { id },
    select: { id: true },
  });
});


ipcMain.handle(
  "reservarHabitacion",
  async (
    _,
    datosReserva: Prisma.ReservaCreateInput,
    habitacion: Habitacion
  ) => {
    if (habitacion.reservaId === null)
      return prisma.habitacion.update({
        data: {
          reservaActual: { create: datosReserva },
        },
        where: {
          id: habitacion.id,
        },
      });
    throw Error("La habitacion ya tiene una reservacion o esta ocupada")
  }
);

ipcMain.handle("finalizarReserva",async (_, reserva: Reserva) => {
  prisma.habitacion.update({
    where: {
      id: reserva.habitacionId
    },
    data: {
      reservaActual: {delete: true}
    }
  })
  
})

ipcMain.handle("sincronizar", async (_,fileId: string, nameFile: string) => {
  await syncSheet(fileId, nameFile);
})
