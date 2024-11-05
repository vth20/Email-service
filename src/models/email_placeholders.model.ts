import db from "db";

export interface EmailPlaceholderSchema {
  _id?: string;
  templateId: string;
  placeholderId: string;
  updatedAt?: Date;
  updatedBy?: string;
}

export const EmailTemplates =
  db.getDatabase.collection<EmailPlaceholderSchema>("email_placeholders");
