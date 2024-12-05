import { Router } from "deps";
import MetadataPlaceholderController from "../controllers/metadataPlaceholder.controller.ts";
import { auth } from "../middlewares/auth.middleware.ts";
import { PermissionList } from "../config/roles.ts";
const router = new Router();

router.prefix("/api/v1/metadata-placeholders");
router.get("/", MetadataPlaceholderController.getAll);
router.get("/:id", MetadataPlaceholderController.getById);
router.post(
  "/",
  auth([PermissionList.CREATE_EMAIL_PLACEHOLDERS]),
  MetadataPlaceholderController.create
);
router.post(
  "/:id",
  auth([PermissionList.UPDATE_EMAIL_PLACEHOLDERS]),
  MetadataPlaceholderController.update
);
router.delete(
  "/:id",
  auth([PermissionList.DELETE_EMAIL_PLACEHOLDERS]),
  MetadataPlaceholderController.delete
);

export default router;
