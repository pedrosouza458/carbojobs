/*
  Warnings:

  - Added the required column `phone` to the `Banner` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Banner" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "photo" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "accept" BOOLEAN NOT NULL,
    CONSTRAINT "Banner_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Banner" ("accept", "id", "photo", "serviceId") SELECT "accept", "id", "photo", "serviceId" FROM "Banner";
DROP TABLE "Banner";
ALTER TABLE "new_Banner" RENAME TO "Banner";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
