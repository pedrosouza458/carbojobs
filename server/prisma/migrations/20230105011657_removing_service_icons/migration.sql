/*
  Warnings:

  - You are about to drop the column `icon` on the `Service` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Service" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL
);
INSERT INTO "new_Service" ("id", "type") SELECT "id", "type" FROM "Service";
DROP TABLE "Service";
ALTER TABLE "new_Service" RENAME TO "Service";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
