import chalk from "chalk";
import dayjs from "dayjs";

import connection from "../database/db.js";

export async function newUserValidation(req, res, next) {
  const newUser = req.newUser;

  try {
    const user = await connection.query(
      "SELECT email FROM users WHERE email ILIKE $1",
      [newUser.email]
    );
    if (user.rowCount >= 1) {
      console.log(
        chalk.magentaBright(
          dayjs().format("YYYY-MM-DD HH:mm:ss"),
          "- BAD_REQUEST: email is already in used"
        )
      );
      res.sendStatus(409);
      return;
    }
  } catch (error) {
    console.log(
      chalk.redBright(dayjs().format("YYYY-MM-DD HH:mm:ss"), error.message)
    );
    return res.sendStatus(500);
  }

  next();
}
