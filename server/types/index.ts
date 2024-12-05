import type { Bson } from "deps";

export type IPagination = {
  search?: string;
  page?: number;
  limit?: number;
};

export type IQueryEmailPlaceholder = {
  templateId?: string | undefined;
  placeholderId?: string | undefined;
};
