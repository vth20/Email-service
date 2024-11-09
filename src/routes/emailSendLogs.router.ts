import { Router } from "deps";
import EmailSendLogsController from "../controllers/emailSendLogs.controller.ts";
import { auth } from "../middlewares/auth.middleware.ts";
import { PermissionList } from "roles";
const router = new Router();

router.prefix("/api/v1/email-send-logs");
router.get("/", EmailSendLogsController.getAll);
router.get("/:id", EmailSendLogsController.getById);
router.post(
  "/",
  auth([PermissionList.CREATE_EMAIL_TEMPLATE]),
  EmailSendLogsController.create
);
router.delete(
  "/:id",
  auth([PermissionList.DELETE_EMAIL_TEMPLATE]),
  EmailSendLogsController.delete
);

export default router;
