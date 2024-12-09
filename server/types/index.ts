import { Bson } from 'deps';
import { EmailPlaceholderSchema } from "../models/email_placeholders.model.ts";
import { EmailTemplateSchema } from "../models/email_templates.model.ts";
export interface IPagination {
  search?: string;
  page?: number;
  limit?: number;
}

export interface IQueryEmailPlaceholder {
  templateId?: string | undefined;
  placeholderId?: string | undefined;
}

export interface ISendMail {
  emailMessageId: string | Bson.ObjectId,
  from: string,
  to: string;
  subject: string;
  text: string;
  html: string;
}

export interface IPayloadVerifyEmail {
  email: string;
  username: string;
  verifyEmailUrl: string;
}

export interface IInUseEmailTemplate {
  template: EmailTemplateSchema;
  placeholders: EmailPlaceholderSchema[];
}

export interface IPlaceholderVariable {
  key: string;
  value: string;
}
