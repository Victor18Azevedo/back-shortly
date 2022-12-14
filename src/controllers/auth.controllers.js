import bcrypt from "bcrypt";
import chalk from "chalk";
import dayjs from "dayjs";

import connection from "../database/db.js";

export async function signUp(req, res) {
  const { name, email, password } = req.newUser;

  try {
    const passwordHash = bcrypt.hashSync(password, 10);

    await connection.query(
      `INSERT INTO users ("name", "email", "password") VALUES ($1, $2, $3)`,
      [name, email, passwordHash]
    );

    res.sendStatus(201);
  } catch (error) {
    console.log(
      chalk.redBright(dayjs().format("YYYY-MM-DD HH:mm:ss"), error.message)
    );
    return res.sendStatus(500);
  }
}
