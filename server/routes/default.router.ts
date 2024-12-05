import { Context, Router } from "deps";

// whoami route
const router = new Router();

router.get("/whoami", (context: Context) => {
  context.response.status = 200;
  context.response.body = "Email service";
});

export default router;