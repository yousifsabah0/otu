import { createPool, Pool } from "mysql2";

export let pool: Pool;

export function init() {
  try {
    pool = createPool({
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    });
  } catch (error) {
    console.error(error);
  }
}
