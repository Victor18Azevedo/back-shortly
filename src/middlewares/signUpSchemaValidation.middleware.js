import chalk from "chalk";
import dayjs from "dayjs";

import { signUpSchema } from "../models/signUp.model.js";

export function signUpSchemaValidation(req, res, next) {
  const newUser = req.body;

  const { error } = signUpSchema.validate(newUser, { abortEarly: false });
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

  delete newUser.confirmPassword;
  req.newUser = newUser;

  next();
}
