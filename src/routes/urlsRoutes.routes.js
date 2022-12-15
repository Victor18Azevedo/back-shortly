import { Router } from "express";

import {
  urlShorten,
  getUrlById,
  redirectShortUrl,
  deleteUrl,
} from "../controllers/urls.controllers.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { urlShortenSchemaValidation } from "../middlewares/urlShortenSchemaValidation.middleware.js";
import { paramsSchemaValidation } from "../middlewares/paramsSchemaValidation.middleware.js";
import { shortUrlOwnerValidation } from "../middlewares/shortUrlOwnerValidation.middleware.js";

const router = Router();

router.get("/urls/:id", paramsSchemaValidation, getUrlById);
router.get("/urls/open/:shortUrl", paramsSchemaValidation, redirectShortUrl);
router.post(
  "/urls/shorten",
  authValidation,
  urlShortenSchemaValidation,
  urlShorten
);
router.delete(
  "/urls/:id",
  authValidation,
  paramsSchemaValidation,
  shortUrlOwnerValidation,
  deleteUrl
);

export default router;
