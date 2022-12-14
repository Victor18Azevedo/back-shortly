import { Router } from "express";

import { urlShorten } from "../controllers/urls.controllers.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { urlShortenSchemaValidation } from "../middlewares/urlShortenSchemaValidation.middleware.js";

const router = Router();

router.post(
  "/urls/shorten",
  authValidation,
  urlShortenSchemaValidation,
  urlShorten
);

export default router;
