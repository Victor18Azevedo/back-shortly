import bcrypt from "bcrypt";
import chalk from "chalk";
import dayjs from "dayjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import { insertUser, selectUser } from "../repository/auth.repositories.js";

export async function signUp(req, res) {
  const { name, email, password } = req.newUser;

  try {
    const passwordHash = bcrypt.hashSync(password, 10);

    await insertUser(name, email, passwordHash);
    res.sendStatus(201);
    return;
  } catch (error) {
    console.log(
      chalk.redBright(dayjs().format("YYYY-MM-DD HH:mm:ss"), error.message)
    );
    res.sendStatus(500);
    return;
  }
}

export async function signIn(req, res) {
  dotenv.config();
  const { email, password } = req.user;

  try {
    const queryResult = await selectUser(email);
    const user = queryResult.rows[0];
    if (!user) {
      console.log(
        chalk.magentaBright(
          dayjs().format("YYYY-MM-DD HH:mm:ss"),
          "- BAD_REQUEST: user unregistered"
        )
      );
      res.status(401).send({ message: "Usuário não cadastrado" });
      return;
    }

    if (bcrypt.compareSync(password, user.password)) {
      const generateToken = (id, name) =>
        jwt.sign({ id, name }, process.env.SECRET_JWT, {
          expiresIn: "1d",
        });

      const token = generateToken(user.id, user.name);

      res.send({
        token,
      });
      return;
    } else {
      console.log(
        chalk.magentaBright(
          dayjs().format("YYYY-MM-DD HH:mm:ss"),
          "- BAD_REQUEST: incorrect user password"
        )
      );
      res.status(401).send({ message: "Senha incorreta" });
      return;
    }
  } catch (error) {
    console.log(
      chalk.redBright(dayjs().format("YYYY-MM-DD HH:mm:ss"), error.message)
    );
    res.sendStatus(500);
    return;
  }
}
