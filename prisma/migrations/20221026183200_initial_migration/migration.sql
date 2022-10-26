/*
  Warnings:

  - A unique constraint covering the columns `[numeroPiso]` on the table `HabitacionPiso` will be added. If there are existing duplicate values, this will fail.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Habitacion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pisoId" INTEGER NOT NULL,
    "detalles" TEXT,
    "estado" INTEGER,
    "numeroHabitacion" INTEGER NOT NULL,
    CONSTRAINT "Habitacion_pisoId_fkey" FOREIGN KEY ("pisoId") REFERENCES "HabitacionPiso" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Habitacion" ("detalles", "estado", "id", "numeroHabitacion", "pisoId") SELECT "detalles", "estado", "id", "numeroHabitacion", "pisoId" FROM "Habitacion";
DROP TABLE "Habitacion";
ALTER TABLE "new_Habitacion" RENAME TO "Habitacion";
CREATE UNIQUE INDEX "Habitacion_numeroHabitacion_key" ON "Habitacion"("numeroHabitacion");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "HabitacionPiso_numeroPiso_key" ON "HabitacionPiso"("numeroPiso");
