import chalk from "chalk";
import dayjs from "dayjs";

import { signInSchema } from "../models/signIn.model.js";

export function signInSchemaValidation(req, res, next) {
  const user = req.body;

  const { error } = signInSchema.validate(user, { abortEarly: false });
  if (error) {
    const message = error.details.map((detail) => detail.message);
    console.log(
      chalk.magentaBright(
        dayjs().format("YYYY-MM-DD HH:mm:ss"),
        "- BAD_REQUEST:",
        message
      )
    );
    res.status(422).send({ message });
    return;
  }

  req.user = user;

  next();
}
