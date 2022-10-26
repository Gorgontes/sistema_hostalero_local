-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Habitacion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pisoId" INTEGER NOT NULL,
    "detalles" TEXT NOT NULL,
    "estado" INTEGER NOT NULL,
    CONSTRAINT "Habitacion_pisoId_fkey" FOREIGN KEY ("pisoId") REFERENCES "HabitacionPiso" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Habitacion" ("detalles", "estado", "id", "pisoId") SELECT "detalles", "estado", "id", "pisoId" FROM "Habitacion";
DROP TABLE "Habitacion";
ALTER TABLE "new_Habitacion" RENAME TO "Habitacion";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
