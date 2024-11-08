import type { Application } from "deps";
import defaultRouter from "./default.router.ts";
import emailTemplateRouter from "./emailTemplate.router.ts";
import emailPlaceholderRouter from "./emailPlaceholder.router.ts";
import MetadataPlaceholderRouter from "./metadataPlaceholder.router.ts";
const init = (app: Application) => {
  app.use(defaultRouter.routes());
  app.use(defaultRouter.allowedMethods());
  app.use(emailTemplateRouter.routes());
  app.use(emailTemplateRouter.allowedMethods());
  app.use(emailPlaceholderRouter.routes());
  app.use(emailPlaceholderRouter.allowedMethods());
  app.use(MetadataPlaceholderRouter.routes());
  app.use(MetadataPlaceholderRouter.allowedMethods());
};

export default { init };
