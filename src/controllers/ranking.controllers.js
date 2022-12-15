import chalk from "chalk";
import dayjs from "dayjs";

import connection from "../database/db.js";

export async function getRanking(req, res) {
  try {
    const { rows } = await connection.query(
      `SELECT users."id", users."name", uu."visitCount", uu."linkCount"
      FROM (
        SELECT urls."userId", SUM(urls."visitCount") AS "visitCount", COUNT(urls."userId") AS "linkCount"
        FROM urls
        GROUP BY urls."userId") uu
      JOIN users ON users."id" = uu."userId"`
    );

    res.send(rows);
  } catch (error) {
    console.log(
      chalk.redBright(dayjs().format("YYYY-MM-DD HH:mm:ss"), error.message)
    );
    return res.sendStatus(500);
  }
}
