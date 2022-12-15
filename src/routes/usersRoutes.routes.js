import { Router } from "express";

import { getUserUrls } from "../controllers/users.controllers.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";

const router = Router();

router.get("/users/me", authValidation, getUserUrls);

export default router;
