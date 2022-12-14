import chalk from "chalk";
import dayjs from "dayjs";

import connection from "../database/db.js";

export async function usersList(req, res) {
  try {
    const users = await connection.query(`SELECT * FROM users`);
    res.send(users.rows);
  } catch (error) {
    console.log(
      chalk.redBright(dayjs().format("YYYY-MM-DD HH:mm:ss"), error.message)
    );
    return res.sendStatus(500);
  }
}
