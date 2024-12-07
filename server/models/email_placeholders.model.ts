import db from "../database/index.ts";
import { MetadataPlaceholderSchema } from "../models/metadata_placeholder.model.ts";

export interface EmailPlaceholderSchema {
  _id?: string;
  templateId: string;
  placeholderId: string;
  createdAt?: Date;
  createdBy?: string;
  metadata?: MetadataPlaceholderSchema;
}

export const EmailPlaceholders =
  db.getDatabase.collection<EmailPlaceholderSchema>("email_placeholders");
