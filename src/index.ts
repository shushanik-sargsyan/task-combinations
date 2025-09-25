import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { router as generateRouter } from "./routes/generate";

const app = express();
app.use(express.json());
app.use('/generate', generateRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


