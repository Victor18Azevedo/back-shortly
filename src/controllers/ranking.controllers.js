import chalk from "chalk";
import dayjs from "dayjs";

import { selectUsersData } from "../repository/ranking.repositories.js";

export async function getRanking(req, res) {
  try {
    const { rows } = await selectUsersData();
    res.send(rows);
  } catch (error) {
    console.log(
      chalk.redBright(dayjs().format("YYYY-MM-DD HH:mm:ss"), error.message)
    );
    return res.sendStatus(500);
  }
}
