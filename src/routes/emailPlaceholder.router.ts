import { Router } from "deps";
import EmailPlaceholderController from "../controllers/emailPlaceholders.controller.ts";
import { auth } from "../middlewares/auth.middleware.ts";
import { PermissionList } from "roles";
const router = new Router();

router.prefix("/api/v1/email-placeholders");
router.get("/", EmailPlaceholderController.getEmailPlaceholdersByFK);
router.post(
  "/",
  auth([PermissionList.CREATE_EMAIL_PLACEHOLDERS]),
  EmailPlaceholderController.create
);
router.delete(
  "/",
  auth([PermissionList.DELETE_EMAIL_PLACEHOLDERS]),
  EmailPlaceholderController.deletes
);

export default router;
