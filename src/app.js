import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dayjs from "dayjs";
import chalk from "chalk";

import usersRoutes from "./routes/usersRoutes.routes.js";
import authRoutes from "./routes/authRoutes.routes.js";
import urlsRoutes from "./routes/urlsRoutes.routes.js";
import rankingRoutes from "./routes/rankingRoutes.routes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(authRoutes);
app.use(usersRoutes);
app.use(urlsRoutes);
app.use(rankingRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(
    chalk.bold.cyan(
      `${dayjs().format("YYYY-MM-DD HH:mm:ss")} [Listening ON] Port: ${PORT}`
    )
  );
});
