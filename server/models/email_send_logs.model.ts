import db from "../database/index.ts";

export interface EmailSendLogSchema {
  _id?: string;
  emailMessageId: string;
  logType: string;
  sentAt: Date;
  retryScheduledAt?: Date;
  retryCount: number;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
}

export const EmailSendLogs =
  db.getDatabase.collection<EmailSendLogSchema>("email_send_logs");
