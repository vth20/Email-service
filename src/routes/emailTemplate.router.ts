import { Router } from "deps";
import EmailTemplateController from "../controllers/emailTemplates.controller.ts";
import { auth } from "../middlewares/auth.middleware.ts";
import { PermissionList } from "roles";
const router = new Router();

router.prefix("/api/v1/email-template");
router.post(
  "/",
  auth([PermissionList.CREATE_EMAIL_TEMPLATE]),
  EmailTemplateController.create
);

export default router;
