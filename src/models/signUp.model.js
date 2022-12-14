import joi from "joi";

export const signUpSchema = joi.object({
  name: joi.string().min(3).max(255).trim().required(),
  email: joi.string().email().trim().required(),
  password: joi.string().min(6).max(16).trim().required(),
  confirmPassword: joi.ref("password"),
});
