import express from "express";
import projectionRoute from "./projection.route";

const router = express.Router();

router.use("/projection", projectionRoute);

export default router;
