// Native
import { join } from "path";

// Packages
import { BrowserWindow, app, ipcMain } from "electron";
import isDev from "electron-is-dev";
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";

// Prisma
import { PrismaClient, Prisma } from "@prisma/client";
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
    installExtension(REACT_DEVELOPER_TOOLS)
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
  console.log(`el id de la extension es: ${REACT_DEVELOPER_TOOLS.id}`)
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// listen the channel `message` and resend the received message to the renderer process

ipcMain.handle(
  "createUser",
  async (_, userData: Prisma.UserCreateInput) => {
    // setTimeout(() => event.sender.send('message', 'hi from electron'), 500);
    const newUser = await prisma.user.create({
      data: userData,
    });
    console.log(`se creo el usuario: ${newUser.id} con ${newUser.name}`);
    return true;
  }
);

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

ipcMain.handle("fetchPisosAndHabitaciones", async (_, habitacionesFiltros: Prisma.HabitacionListRelationFilter) => {
  return prisma.habitacionPiso.findMany({
    include: {
      habitaciones: true,
    },
    where: {
      habitaciones: habitacionesFiltros
    },
  
  });
});

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
    select: { id: true }
  })
})

ipcMain.handle("postReserva", async (_, reserva: Prisma.ReservaCreateInput) => {
    await prisma.habitacion.update({
      where: {
        id: reserva.habitacion.connect?.id!
      },
      data: {
        estado: reserva.fechaReserva == null ? "ocupado": "reservado"
      },
      select: {
        id: true,
        estado: true
      }
    })
  return prisma.reserva.create({
    data: reserva,
    select: { id: true }
  })
})

// ipcMain.handle