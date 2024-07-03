import { Cities } from "../../../../shared/enums/citites";
import { Roles } from "../../../../shared/enums/roles";
import { Services } from "../../../../shared/enums/services";
import { sql } from "../lib/db";

async function setup() {
  await sql/*sql*/ `DROP SCHEMA public CASCADE;`;
  await sql/*sql*/ `CREATE SCHEMA public;`;

  await sql/*sql*/ `
  CREATE TABLE IF NOT EXISTS "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar_url" TEXT,
    "description" TEXT,
    "phone" TEXT,
    "days" TEXT[],
    "hours" TEXT[],
    "role" TEXT NOT NULL,
    "indicated" INTEGER,
    "service" TEXT,
    "city" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);`;

  await sql/*sql*/ `
CREATE TABLE IF NOT EXISTS "business" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "price" DOUBLE PRECISION,
  "bookingFee" DOUBLE PRECISION,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "provider_id" TEXT,

  CONSTRAINT "business_pkey" PRIMARY KEY ("id")
);
`;

  await sql/*sql*/ `
CREATE TABLE IF NOT EXISTS "appointments" (
  "id" TEXT NOT NULL,
  "business_id" TEXT,
  "description" TEXT,
  "date" TEXT,
  "hour" TEXT,
  "name" TEXT,
  "phone" TEXT,
  "status" TEXT NOT NULL DEFAULT 'Pendente',
  "provider_id" TEXT,
  "client_id" TEXT,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);
`;

  await sql/*sql*/ `
CREATE TABLE IF NOT EXISTS "indications" (
    "id" TEXT NOT NULL,
    "provider_id" TEXT,
    "client_id" TEXT,

    CONSTRAINT "indicated_pkey" PRIMARY KEY ("id")
);
`;

  await sql/*sql*/ `
CREATE TABLE IF NOT EXISTS "links" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "url" TEXT,
    "provider_id" TEXT,

    CONSTRAINT "links_pkey" PRIMARY KEY ("id")
);
`;

  await sql/*sql*/ `CREATE UNIQUE INDEX "users_email_key" ON "users"("email"); `;

  await sql/*sql*/ `ALTER TABLE "business" ADD CONSTRAINT "business_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;`;
  await sql/*sql*/ `ALTER TABLE "appointments" ADD CONSTRAINT "appointments_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "business"("id") ON DELETE SET NULL ON UPDATE CASCADE;`;
  await sql/*sql*/ `ALTER TABLE "appointments" ADD CONSTRAINT "appointments_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;`;
  await sql/*sql*/ `ALTER TABLE "appointments" ADD CONSTRAINT "appointments_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;`;
  await sql/*sql*/ `ALTER TABLE "indications" ADD CONSTRAINT "indications_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;`;
  await sql/*sql*/ `ALTER TABLE "indications" ADD CONSTRAINT "indications_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;`;
  await sql/*sql*/ `ALTER TABLE "links" ADD CONSTRAINT "links_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;`;

  await sql.end();
  console.log("Setup feito com sucesso");
}

setup();
