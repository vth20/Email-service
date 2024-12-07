import emailUtils from "../utils/email/index.ts";
import type { IPayloadVerifyEmail, IPlaceholderVariable } from "types/index.ts";
import EmailTemplateService from "./emailTemplates.service.ts";
import { EmailTemplateType } from "enum";

const sendVerifyEmail = async (payload: IPayloadVerifyEmail) => {
  const { template, placeholders } =
    await EmailTemplateService.getInUseTemplateByType(
      EmailTemplateType.VERIFY_EMAIL
    );
  const { subject, body } = template;

  const variables = new Map<string, string>();
  placeholders.forEach((placeholder) => {
    const key = placeholder.metadata?.key as keyof IPayloadVerifyEmail;
    variables.set(key, payload[key] || "N/A");
  });
  const replacedSubject = emailUtils.replaceTemplatePlaceholders(
    subject,
    variables
  );
  const replacedBody = emailUtils.replaceTemplatePlaceholders(body, variables);
  console.log(replacedBody, replacedSubject);
};
