import chalk from "chalk";
import dayjs from "dayjs";

import {
  selectUserData,
  selectUserUrls,
} from "../repository/users.repositories.js";

export async function getUserUrls(req, res) {
  const { id } = req.user;

  try {
    const userData = await selectUserData(id);

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

    const userUrls = await selectUserUrls(id);

    userData.rows[0].shortenedUrls = userUrls.rows;
    res.send(userData.rows[0]);
  } catch (error) {
    console.log(
      chalk.redBright(dayjs().format("YYYY-MM-DD HH:mm:ss"), error.message)
    );
    return res.sendStatus(500);
  }
}
