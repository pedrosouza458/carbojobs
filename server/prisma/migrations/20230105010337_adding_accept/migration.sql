/*
  Warnings:

  - Added the required column `accept` to the `Banner` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Banner" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "photo" TEXT NOT NULL,
    "accept" BOOLEAN NOT NULL,
    "serviceId" TEXT,
    CONSTRAINT "Banner_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Banner" ("id", "photo", "serviceId") SELECT "id", "photo", "serviceId" FROM "Banner";
DROP TABLE "Banner";
ALTER TABLE "new_Banner" RENAME TO "Banner";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
