import { Bson } from 'deps';
import db from "../database/index.ts";
import type { SendLogStatus } from "enum";

export interface EmailSendLogSchema {
  _id?: string;
  emailMessageId: string | Bson.ObjectId;
  logType: SendLogStatus;
  sentAt: Date;
  retryScheduledAt?: Date | null;
  retryCount: number;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
}

export const EmailSendLogs =
  db.getDatabase.collection<EmailSendLogSchema>("email_send_logs");
