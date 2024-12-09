import db from "../database/index.ts";

export interface EmailMessageSchema {
  _id?: string;
  sender: string;
  recipient: string;
  templateId: string;
  subject: string;
  content: string;
  scheduledAt: Date | null;
  status: string;
  attachments: Array<string> | null;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
}

export const EmailMessages =
  db.getDatabase.collection<EmailMessageSchema>("email_messages");
