import db from "../database/index.ts";

export interface EmailPlaceholderSchema {
  _id?: string;
  templateId: string;
  placeholderId: string;
  createdAt?: Date;
  createdBy?: string;
}

export const EmailPlaceholders =
  db.getDatabase.collection<EmailPlaceholderSchema>("email_placeholders");
