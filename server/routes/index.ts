import type { Application } from "deps";
import defaultRouter from "./default.router.ts";
import emailTemplatesRouter from "./emailTemplates.router.ts";
import emailPlaceholdersRouter from "./emailPlaceholders.router.ts";
import MetadataPlaceholdersRouter from "./metadataPlaceholders.router.ts";
import EmailMessagesRouter from "./emailMessages.router.ts";
import EmailSendLogsRouter from "./emailSendLogs.router.ts";
const init = (app: Application) => {
  app.use(defaultRouter.routes());
  app.use(defaultRouter.allowedMethods());
  app.use(emailTemplatesRouter.routes());
  app.use(emailTemplatesRouter.allowedMethods());
  app.use(emailPlaceholdersRouter.routes());
  app.use(emailPlaceholdersRouter.allowedMethods());
  app.use(MetadataPlaceholdersRouter.routes());
  app.use(MetadataPlaceholdersRouter.allowedMethods());
  app.use(EmailMessagesRouter.routes());
  app.use(EmailMessagesRouter.allowedMethods());
  app.use(EmailSendLogsRouter.routes());
  app.use(EmailSendLogsRouter.allowedMethods());
};

export default { init };
