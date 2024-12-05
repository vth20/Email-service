import { Router } from "deps";
import EmailTemplateController from "../controllers/emailTemplates.controller.ts";
import { auth } from "../middlewares/auth.middleware.ts";
import { PermissionList } from "../config/roles.ts";
const router = new Router();

router.prefix("/api/v1/email-templates");
router.get("/", EmailTemplateController.getAll);
router.get("/:id", EmailTemplateController.getById);
router.post(
  "/",
  auth([PermissionList.CREATE_EMAIL_TEMPLATE]),
  EmailTemplateController.create
);
router.post(
  "/:id",
  auth([PermissionList.UPDATE_EMAIL_TEMPLATE]),
  EmailTemplateController.update
);
router.delete(
  "/:id",
  auth([PermissionList.DELETE_EMAIL_TEMPLATE]),
  EmailTemplateController.delete
);

export default router;
