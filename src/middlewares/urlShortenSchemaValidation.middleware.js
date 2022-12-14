import chalk from "chalk";
import dayjs from "dayjs";

import { urlShortenSchema } from "../models/urlShorten.model.js";

export function urlShortenSchemaValidation(req, res, next) {
  const url = req.body;

  const { error } = urlShortenSchema.validate(url, { abortEarly: false });
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
