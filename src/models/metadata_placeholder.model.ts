import db from "db";

export interface MetadataPlaceholderSchema {
  _id?: string;
  name: string;
  description: string;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
}

export const EmailTemplates =
  db.getDatabase.collection<MetadataPlaceholderSchema>("metadata_placeholder");
