import { Router } from "express";

import { signUp } from "../controllers/auth.controllers.js";
import { newUserValidation } from "../middlewares/newUserValidation.middleware.js";
import { signUpSchemaValidation } from "../middlewares/signUpSchemaValidation.middleware.js";

const router = Router();

router.post("/signup", signUpSchemaValidation, newUserValidation, signUp);

export default router;
