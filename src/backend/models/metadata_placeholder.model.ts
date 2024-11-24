import db from "db";

export interface MetadataPlaceholderSchema {
  _id?: string;
  key: string;
  name: string;
  description: string;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
}

export const MetadataPlaceholder =
  db.getDatabase.collection<MetadataPlaceholderSchema>("metadata_placeholder");
