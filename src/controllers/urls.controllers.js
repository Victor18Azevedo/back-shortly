import chalk from "chalk";
import dayjs from "dayjs";
import { nanoid } from "nanoid";

import connection from "../database/db.js";

export async function urlShorten(req, res) {
  const { id } = req.user;
  const { url } = req.body;
  try {
    const shortUrl = nanoid(10);
    await connection.query(
      `INSERT INTO urls ("url", "shortUrl", "userId") VALUES
      ($1, $2, $3);`,
      [url, shortUrl, id]
    );
    res.status(201).send({ shortUrl });
  } catch (error) {
    console.log(
      chalk.redBright(dayjs().format("YYYY-MM-DD HH:mm:ss"), error.message)
    );
    return res.sendStatus(500);
  }
}
