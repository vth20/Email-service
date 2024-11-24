import { Router } from "deps";
import EmailMessageController from "../controllers/emailMessages.controller.ts";
import { auth } from "../middlewares/auth.middleware.ts";
import { PermissionList } from "roles";
const router = new Router();

router.prefix("/api/v1/email-messages");
router.get("/", EmailMessageController.getAll);
router.get("/:id", EmailMessageController.getById);
router.post(
  "/",
  auth([PermissionList.CREATE_EMAIL_TEMPLATE]),
  EmailMessageController.create
);
router.delete(
  "/:id",
  auth([PermissionList.DELETE_EMAIL_TEMPLATE]),
  EmailMessageController.delete
);

export default router;
