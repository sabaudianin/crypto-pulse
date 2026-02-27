import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

// 1. Sprawdź czy URL bazy danych istnieje
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in .env");
}

// 2. Konfiguracja Pool pod AWS RDS
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10, // Limit połączeń dla bezpieczeństwa
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  // KLUCZ DLA AWS RDS:
  ssl: {
    rejectUnauthorized: false, // Ignoruje błąd certyfikatu w chainie
  },
});

// 3. Obsługa błędów puli (zapobiega crashom aplikacji)
pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export { prisma };
