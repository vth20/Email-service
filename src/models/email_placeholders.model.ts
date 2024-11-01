import db from "db";

export interface EmailPlaceholderSchema {
  _id?: string;
  templateId: string;
  placeholderIds: Array<string>; // List of metadata_placeholder._id references
  updatedAt?: Date;
  updatedBy?: string;
}

export const EmailTemplates =
  db.getDatabase.collection<EmailPlaceholderSchema>("email_placeholders");
