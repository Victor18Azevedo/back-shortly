import chalk from "chalk";
import dayjs from "dayjs";

import connection from "../database/db.js";

export async function getUserUrls(req, res) {
  const { id } = req.user;

  try {
    // TODO: simplify to a query

    const userData = await connection.query(
      `SELECT users."id", users."name", uu."visitCount"
      FROM (
        SELECT urls."userId", SUM(urls."visitCount") AS "visitCount"
        FROM urls
        WHERE urls."userId" = $1
        GROUP BY urls."userId") uu
      JOIN users ON users."id" = uu."userId"`,
      [id]
    );

    if (userData.rowCount === 0) {
      console.log(
        chalk.magentaBright(
          dayjs().format("YYYY-MM-DD HH:mm:ss"),
          "- BAD_REQUEST: user don't exist"
        )
      );
      res.status(404).send("usuário inválido");
      return;
    }

    const userUrls = await connection.query(
      `SELECT urls."id", urls."shortUrl", urls."url", urls."visitCount"
      FROM urls WHERE urls."userId" = $1`,
      [id]
    );

    userData.rows[0].shortenedUrls = userUrls.rows;
    res.send(userData.rows[0]);
  } catch (error) {
    console.log(
      chalk.redBright(dayjs().format("YYYY-MM-DD HH:mm:ss"), error.message)
    );
    return res.sendStatus(500);
  }
}
