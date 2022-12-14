import joi from "joi";

export const urlShortenSchema = joi.object({
  url: joi
    .string()
    .min(10)
    .uri({
      scheme: [/http/, /https/],
    })
    .required(),
});
