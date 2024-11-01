import db from "db";

export interface EmailTemplateSchema {
  _id?: string;
  retryMax: number;
  templateType: string;
  templateName: string;
  description?: string;
  subject?: string;
  body?: string;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
}

export const EmailTemplates =
  db.getDatabase.collection<EmailTemplateSchema>("email_templates");
