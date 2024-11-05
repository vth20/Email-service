import type { RouterContext } from "deps";
import EmailTemplateService from "../services/emailTemplates.service.ts";
import { Status } from "deps";
import log from "logger";

class EmailTemplateController {
  public static async create({
    request,
    response,
  }: RouterContext<string>): Promise<void> {
    const payload = request.body();
    const { templateType, templateName, description, subject, body, retryMax } =
      await payload.value;
      console.log(112)
    const newEmailTemplate = await EmailTemplateService.createEmailTemplate({
      templateType,
      templateName,
      description,
      subject,
      body,
      retryMax,
    });
    log.info("Created new Email template");
    response.body = newEmailTemplate;
    response.status = Status.Created;
  }
}

export default EmailTemplateController;
