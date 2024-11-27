import { createPool } from "mysql2";
import dotenv from 'dotenv';
dotenv.config();

// DATABASE CONNECTION
const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectTimeout: 10000
});
const poolPromise = pool.promise();

export { poolPromise };