import emailUtils from "../utils/email/index.ts";
import type { IPayloadVerifyEmail, IPlaceholderVariable } from "types/index.ts";
import log from "logger";
import EmailTemplateService from "services/emailTemplates.service.ts";
import { EmailMessageStatus, EmailTemplateType, SendLogStatus } from "enum";

import EmailMessageService from "services/emailMessages.service.ts";
import config from "config/config.ts";
import { type EmailMessageSchema } from "models/email_messages.model.ts";
import type { EmailSendLogSchema } from "models/email_send_logs.model.ts";
import EmailSendLogService from "services/emailSendLogs.service.ts";


/**
 * Sends a verification email using a predefined email template.
 *
 * @param {IPayloadVerifyEmail} payload - The payload containing email details and placeholder values.
 * @returns {Promise<void>} Resolves when the email is sent and logged, or logs an error on failure.
 */
const sendVerifyEmail = async (payload: IPayloadVerifyEmail): Promise<void> => {
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

  const emailMessage: EmailMessageSchema = {
    sender: config.smtpMail,
    recipient: payload.email,
    templateId: template._id!,
    subject: replacedSubject,
    content: replacedBody,
    status: EmailMessageStatus.PENDING,
    scheduledAt: null,
    attachments: null,
  };

  const createdEmailMessageId = await EmailMessageService.createEmailMessage(
    emailMessage
  );

  try {
    await emailUtils.sendMail({
      emailMessageId: createdEmailMessageId,
      from: config.smtpMail,
      to: payload.email,
      subject: replacedSubject,
      text: replacedBody,
      html: replacedBody,
    });
    await EmailMessageService.updateStatus(
      createdEmailMessageId,
      EmailMessageStatus.SUCCESS
    );
    const emailSendLog: EmailSendLogSchema = {
      emailMessageId: createdEmailMessageId,
      logType: SendLogStatus.SEND_SUCCESS,
      sentAt: new Date(),
      retryCount: 0,
    };

    await EmailSendLogService.createEmailSendLog(emailSendLog);
  } catch (_error) {
    log.error(_error);
    await EmailMessageService.updateStatus(
      createdEmailMessageId,
      EmailMessageStatus.FAILURE
    );

    const emailSendLog: EmailSendLogSchema = {
      emailMessageId: createdEmailMessageId,
      logType: SendLogStatus.SEND_FAILURE,
      sentAt: new Date(),
      retryCount: 0,
      retryScheduledAt: null,
    };

    await EmailSendLogService.createEmailSendLog(emailSendLog);
  }
};

export default { sendVerifyEmail };
