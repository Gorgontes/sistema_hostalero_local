-- CreateTable
CREATE TABLE "Cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombres" TEXT NOT NULL,
    "apellidoPaterno" TEXT,
    "apellidoMaterno" TEXT,
    "tipoDocumento" INTEGER NOT NULL,
    "numeroDocumento" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Reserva" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "precio" INTEGER NOT NULL,
    "fechaIngreso" DATETIME,
    "fechaSalida" DATETIME,
    "habitacionId" INTEGER NOT NULL,
    "clienteId" INTEGER NOT NULL,
    CONSTRAINT "Reserva_habitacionId_fkey" FOREIGN KEY ("habitacionId") REFERENCES "Habitacion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reserva_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Habitacion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pisoId" INTEGER NOT NULL,
    "detalles" TEXT NOT NULL,
    "estado" INTEGER NOT NULL,
    CONSTRAINT "Habitacion_pisoId_fkey" FOREIGN KEY ("pisoId") REFERENCES "HabitacionPiso" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HabitacionPiso" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "detalles" TEXT,
    "numeroPiso" INTEGER NOT NULL
);
