import db from "../database/index.ts";

export interface EmailTemplateSchema {
  _id?: string;
  templateType: string;
  templateName: string;
  description?: string;
  subject?: string;
  body?: string;
  retryMax: number;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
}

export const EmailTemplates =
  db.getDatabase.collection<EmailTemplateSchema>("email_templates");
