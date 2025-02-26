import { Router } from "express";
import projectionValidation from "../../validations/projection.validation";
import projectionController from "../../controllers/projection.controller";
import validate from "../../middlewares/validate";

const router = Router();

router.get(
  "/:column/histogram",
  validate(projectionValidation.getHistogram),
  projectionController.getHistogram,
);

export default router;
