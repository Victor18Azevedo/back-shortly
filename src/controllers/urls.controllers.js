import chalk from "chalk";
import dayjs from "dayjs";
import { nanoid } from "nanoid";

import {
  selectUrlById,
  selectUrlByShortUrl,
  updateVisitCount,
  insertShortUrl,
  deleteUrlById,
} from "../repository/urls.repositories.js";

export async function getUrlById(req, res) {
  const { id } = req.params;

  try {
    const queryResult = await selectUrlById(id);

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
    const queryResult = await selectUrlByShortUrl(shortUrl);

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

    await updateVisitCount(id);
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
    await insertShortUrl(url, shortUrl, id);
    res.status(201).send({ shortUrl });
  } catch (error) {
    console.log(
      chalk.redBright(dayjs().format("YYYY-MM-DD HH:mm:ss"), error.message)
    );
    return res.sendStatus(500);
  }
}

export async function deleteUrl(req, res) {
  const { id } = req.params;

  try {
    const queryResult = await deleteUrlById(id);

    if (queryResult.rowCount !== 1) {
      console.log(
        chalk.redBright(
          dayjs().format("YYYY-MM-DD HH:mm:ss"),
          "- ERROR: delete url error"
        )
      );
      res.sendStatus(500);
      return;
    }

    res.sendStatus(204);
  } catch (error) {
    console.log(
      chalk.redBright(dayjs().format("YYYY-MM-DD HH:mm:ss"), error.message)
    );
    return res.sendStatus(500);
  }
}
