import db from "db";

export interface EmailMessageSchema {
  _id?: string;
  sender: string;
  recipient: string;
  templateId: string;
  subject: string;
  content: string;
  scheduledAt: Date;
  status: string;
  attachments: Array<string>;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
}

export const EmailMessages =
  db.getDatabase.collection<EmailMessageSchema>("email_messages");
