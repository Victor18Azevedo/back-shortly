import { Router } from "express";

import { signUp, signIn } from "../controllers/auth.controllers.js";
import { newUserValidation } from "../middlewares/newUserValidation.middleware.js";
import { signInSchemaValidation } from "../middlewares/signInSchemaValidation.middleware.js";
import { signUpSchemaValidation } from "../middlewares/signUpSchemaValidation.middleware.js";

const router = Router();

router.post("/signup", signUpSchemaValidation, newUserValidation, signUp);
router.post("/signin", signInSchemaValidation, signIn);

export default router;
