import { Router } from "express";
import { getHistogram } from "../controllers";

export const router = Router();

router.get("/api/:column/histogram", getHistogram);
