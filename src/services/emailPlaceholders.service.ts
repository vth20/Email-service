import { IQueryEmailPlaceholder } from "types";
import { Bson } from "deps";
import {
  EmailPlaceholders,
  EmailPlaceholderSchema,
} from "../models/email_placeholders.model.ts";

class EmailPlaceholderService {
  /**
   * Retrieves a list of `EmailPlaceholderSchema` entries based on `templateId` or `placeholderId`.
   *
   * This method queries the `EmailPlaceholders` collection to find matching records.
   *
   * - If `templateId` is provided, the query will filter by `templateId`,
   *   which is useful for displaying details in an email template.
   * - If `placeholderId` is provided, the query will filter by `placeholderId`,
   *   which is helpful for identifying all templates that use this metadata placeholder.
   *
   * @param {string | null} templateId - The ID of the email template. If not provided, the query will ignore `templateId`.
   * @param {string | null} placeholderId - The ID of the metadata placeholder. If not provided, the query will ignore `placeholderId`.
   * @returns {Promise<EmailPlaceholderSchema[]>} - A Promise that resolves to an array of `EmailPlaceholderSchema` objects matching the query conditions.
   */
  public static getEmailPlaceholder(
    templateId: string | null,
    placeholderId: string | null
  ): Promise<EmailPlaceholderSchema[]> {
    const query: IQueryEmailPlaceholder = {};
    // query to show detail in mail template
    if (templateId) {
      query.templateId = templateId;
    }

    // query when delete metadata placeholder, show all template use this metadata placeholder
    if (placeholderId) {
      query.placeholderId = placeholderId;
    }

    return EmailPlaceholders.find(query).toArray();
  }

  /**
   * Inserts multiple email placeholders into the `EmailPlaceholders` collection.
   *
   * This method accepts an array of `EmailPlaceholderSchema` objects and inserts
   * them into the database. It returns an object containing the IDs of the newly
   * inserted documents and the count of documents inserted.
   *
   * @param {EmailPlaceholderSchema[]} payload - An array of `EmailPlaceholderSchema` objects to be inserted.
   * @returns {Promise<{ insertedIds: (string | Bson.ObjectId)[]; insertedCount: number; }>}
   *          A Promise that resolves to an object containing `insertedIds`, an array of
   *          IDs (as `string` or `Bson.ObjectId`) for the inserted documents, and
   *          `insertedCount`, the number of documents successfully inserted.
   */
  public static createEmailPlaceholders(
    payload: EmailPlaceholderSchema[]
  ): Promise<{
    insertedIds: (string | Bson.ObjectId)[];
    insertedCount: number;
  }> {
    return EmailPlaceholders.insertMany(payload);
  }

  /**
   * Deletes multiple email placeholders from the `EmailPlaceholders` collection by their `_id` values.
   *
   * This method accepts an array of `_id` values as strings to identify the placeholders to delete.
   * If the array is empty, it returns `0` immediately. Otherwise, it performs a delete operation
   * and returns the count of documents deleted.
   *
   * @param {string[]} ids - An array of `_id` values as strings, representing the placeholders to delete.
   * @returns {Promise<number>} - A Promise that resolves to the number of documents deleted.
   */
  public static async deleteEmailPlaceholders(ids: string[]): Promise<number> {
    if (!ids.length) return 0;
    return await EmailPlaceholders.deleteMany({
      _id: { $in: ids },
    });
  }

  /**
   * Deletes email placeholders from the `EmailPlaceholders` collection based on `placeholderId` values.
   *
   * This method deletes placeholders where `placeholderId` matches any value in the provided array.
   *
   * @param {string[]} ids - An array of `placeholderId` values as strings to identify placeholders for deletion.
   * @returns {Promise<number>} - A Promise that resolves to the number of documents deleted.
   */
  public static async deleteEmailPlaceholderByMetadataPlaceholderIds(
    ids: string[]
  ): Promise<number> {
    return await EmailPlaceholders.deleteMany({ placeholderId: { $in: ids } });
  }

  /**
   * Deletes email placeholders from the `EmailPlaceholders` collection based on `templateId` values.
   *
   * This method deletes placeholders where `templateId` matches any value in the provided array.
   *
   * @param {string[]} ids - An array of `templateId` values as strings to identify placeholders for deletion.
   * @returns {Promise<number>} - A Promise that resolves to the number of documents deleted.
   */
  public static async deleteEmailPlaceholderByTemplateIds(
    ids: string[]
  ): Promise<number> {
    return await EmailPlaceholders.deleteMany({ templateId: { $in: ids } });
  }
}

export default EmailPlaceholderService;
