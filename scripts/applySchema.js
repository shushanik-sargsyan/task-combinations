#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

async function main() {
  const sqlPath = path.resolve(new URL('.', import.meta.url).pathname, '..', 'schema.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');

  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    multipleStatements: true,
  });
  try {
    await conn.query(sql);
    console.log('Schema applied');
  } finally {
    await conn.end();
  }
}

main().catch((e) => {
  console.error('Failed to apply schema:', e.message);
  process.exit(1);
});


