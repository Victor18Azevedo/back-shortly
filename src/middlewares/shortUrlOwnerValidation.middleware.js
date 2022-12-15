import chalk from "chalk";
import dayjs from "dayjs";

import connection from "../database/db.js";

export async function shortUrlOwnerValidation(req, res, next) {
  const user = req.user;
  const { id } = req.params;

  try {
    const queryResult = await connection.query(
      `SELECT "userId" FROM urls WHERE "id" = $1`,
      [id]
    );

    if (queryResult.rowCount === 0) {
      console.log(
        chalk.magentaBright(
          dayjs().format("YYYY-MM-DD HH:mm:ss"),
          "- BAD_REQUEST: url's id not exist"
        )
      );
      res.sendStatus(404);
      return;
    }

    if (user.id !== queryResult.rows[0].userId) {
      console.log(
        chalk.magentaBright(
          dayjs().format("YYYY-MM-DD HH:mm:ss"),
          "- BAD_REQUEST: url's id is not the user's"
        )
      );
      res.sendStatus(401);
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
