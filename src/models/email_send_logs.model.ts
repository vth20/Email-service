import db from "db";

export interface EmailSendLogSchema {
  _id?: string;
  emailMessageId: string;
  logType: string;
  sendStatus: string;
  sentAt: Date;
  retryScheduledAt?: Date;
  retryCount: number;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
}

export const EmailTemplates =
  db.getDatabase.collection<EmailSendLogSchema>("email_send_logs");
