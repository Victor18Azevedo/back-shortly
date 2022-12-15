import chalk from "chalk";
import dayjs from "dayjs";
import { nanoid } from "nanoid";

import connection from "../database/db.js";

export async function getUrlById(req, res) {
  const { id } = req.params;

  try {
    const queryResult = await connection.query(
      `SELECT "id", "url", "shortUrl" FROM urls WHERE "id" = $1`,
      [id]
    );

    if (queryResult.rowCount === 0) {
      console.log(
        chalk.magentaBright(
          dayjs().format("YYYY-MM-DD HH:mm:ss"),
          "- BAD_REQUEST: id not exist"
        )
      );
      res.status(404).send("ID inválido");
      return;
    }

    const url = queryResult.rows[0];

    res.send(url);
  } catch (error) {
    console.log(
      chalk.redBright(dayjs().format("YYYY-MM-DD HH:mm:ss"), error.message)
    );
    return res.sendStatus(500);
  }
}

export async function redirectShortUrl(req, res) {
  const { shortUrl } = req.params;

  try {
    const queryResult = await connection.query(
      `SELECT "id", "url" FROM urls WHERE "shortUrl" = $1`,
      [shortUrl]
    );

    if (queryResult.rowCount === 0) {
      console.log(
        chalk.magentaBright(
          dayjs().format("YYYY-MM-DD HH:mm:ss"),
          "- BAD_REQUEST: shortUrl not exist"
        )
      );
      res.status(404).send("shortUrl inválido");
      return;
    }

    const { id, url } = queryResult.rows[0];

    await connection.query(
      `UPDATE urls SET "visitCount" = "visitCount" + 1
      WHERE "id" = $1`,
      [id]
    );

    res.redirect(url);
  } catch (error) {
    console.log(
      chalk.redBright(dayjs().format("YYYY-MM-DD HH:mm:ss"), error.message)
    );
    return res.sendStatus(500);
  }
}

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
