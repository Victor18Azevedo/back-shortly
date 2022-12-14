import joi from "joi";

export const paramsSchema = joi.object({
  id: joi.number().integer().min(1),
});
