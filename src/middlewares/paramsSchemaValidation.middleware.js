import chalk from "chalk";
import dayjs from "dayjs";

import { paramsSchema } from "../models/params.model.js";

export function paramsSchemaValidation(req, res, next) {
  const params = req.params;

  const { error } = paramsSchema.validate(params, { abortEarly: false });
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

  next();
}
