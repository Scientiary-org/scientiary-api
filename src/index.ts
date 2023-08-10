require("dotenv").config();
import express from "express";
import { DocsRouter } from "./api/routes/docs";

const port = process.env.PORT || 3333;
export const app = express();

app.use(express.json());
app.use(DocsRouter)

app.listen(port, () => {
  console.log(`API running on port: ${port}`);
});
