import dotenv from "dotenv";
dotenv.config();
import express from "express";
import generateRouter from "./routes/generate.js";

const app = express();
app.use(express.json());
app.get('/health', async (req, res) => {
  try {
    const { pool } = require('./db/pool');
    const conn = await pool.getConnection();
    try {
      await conn.query('SELECT 1');
      res.json({ ok: true });
    } finally {
      conn.release();
    }
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});
app.use('/generate', generateRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;


