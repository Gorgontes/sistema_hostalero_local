// Native
import { join } from "path";
import { saveConfigDrive, syncSheet } from "./googleapi";

// Packages
import { BrowserWindow, app, ipcMain } from "electron";
import isDev from "electron-is-dev";
if (isDev) {
  var {default: installExtension, REACT_DEVELOPER_TOOLS} = require("electron-devtools-installer")
// import installExtension, {
//   REACT_DEVELOPER_TOOLS,
// } from "electron-devtools-installer";
}

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
    autoHideMenuBar: true,
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
    const ans = await prisma.habitacion.create({
      data: habitacion,
      select: {
        id: true,
      },
    });
    syncSheet()
    return ans
  }
);

ipcMain.handle(
  "updateHabitacion",
  async (_, habitacion: Prisma.HabitacionCreateInput, id: number) => {
    const ans = await prisma.habitacion.update({
      where: { id },
      data: habitacion,
    });
    syncSheet()
    return ans
  }
);

ipcMain.handle(
  "postPiso",
  async (_, piso: Prisma.HabitacionPisoCreateInput) => {
    const ans = await prisma.habitacionPiso.create({
      data: piso,
      select: {
        id: true,
      },
    });
    syncSheet()
    return ans
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
      },
    });
  }
);

ipcMain.handle("deletePisoById", async (_, id: number) => {
  const ans = await prisma.habitacionPiso.delete({
    where: { id },
    select: { id: true },
  });
  syncSheet()
  return ans
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
  const ans = await prisma.habitacion.delete({
    where: { id },
    select: { id: true },
  });
  syncSheet()
  return ans 
});

ipcMain.handle(
  "reservarHabitacion",
  async (
    _,
    datosReserva: Prisma.ReservaCreateWithoutHabitacionInput,
    habitacion: Habitacion,
    estado: "ocupado" | "reservado"
  ) => {
    const { habitacionActual, ..._datosReserva } = datosReserva;
    console.log(datosReserva.cliente.create)
    if (habitacion.reservaId === null){
      const ans = await prisma.habitacion.update({
        data: {
          reservaActual: {
            create: {
              ..._datosReserva,
              habitacion: {
                connect: {
                  id: habitacion.id,
                },
              },
            },
          },
          estado
        },
        where: {
          id: habitacion.id,
        },
      });
      syncSheet()
      return ans
    }
    throw Error("La habitacion ya tiene una reservacion o esta ocupada");
  }
);

ipcMain.handle(
  "ocuparReservaPendiente",
  async (_, habitacion: Habitacion) => {
    if (habitacion.reservaId != null) {
      const res = await prisma.habitacion.update({
        data: {
          estado: "ocupado",
          reservaActual: { update: { fechaIngreso: new Date() } },
        },
        where: {
          id: habitacion.id,
        },
      });
    syncSheet();
      return res
    }
    throw Error('esta habitacion no tiene una reserva actual')
  }
);

ipcMain.handle("finalizarReserva", async (_, reserva: Reserva) => {
  const ans = await prisma.habitacion.update({
    where: {
      id: reserva.habitacionId,
    },
    data: {
      reservaActual: { disconnect: true },
      estado: 'libre'
    },
  });
  syncSheet();
  return ans
});

ipcMain.handle("sincronizar", async (_) => {
  await syncSheet();
});

ipcMain.handle("getReservaById", async(_, id: number) => {
  return prisma.reserva.findFirst({
    where: {
      id: id
    },
    include: {
      cliente: true
    }
  })
})

ipcMain.handle('getReporte', async () => {
  return prisma.habitacion.findMany({
    include: {
      reservaActual: {
        include: {
          cliente: true
        }
      }
    }
  })
})


ipcMain.handle('saveConfigDrive', (_, fileId: string, sheetName: string) => {
  return saveConfigDrive(fileId, sheetName)
})

// solucion temporal
