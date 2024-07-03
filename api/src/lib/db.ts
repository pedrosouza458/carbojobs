import postgres from "postgres";
require("dotenv").config();

const dbUrl = process.env.DB_URL as string;

export const sql = postgres(dbUrl);
