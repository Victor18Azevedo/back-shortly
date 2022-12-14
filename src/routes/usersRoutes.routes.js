import { Router } from "express";

import { usersList } from "../controllers/users.controllers.js";

const router = Router();

router.get("/users", usersList);

export default router;
