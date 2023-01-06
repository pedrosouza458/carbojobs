-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Banner" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "photo" TEXT NOT NULL,
    "serviceId" TEXT,
    "phone" TEXT NOT NULL,
    "accept" BOOLEAN NOT NULL,
    CONSTRAINT "Banner_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Banner" ("accept", "id", "phone", "photo", "serviceId") SELECT "accept", "id", "phone", "photo", "serviceId" FROM "Banner";
DROP TABLE "Banner";
ALTER TABLE "new_Banner" RENAME TO "Banner";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
