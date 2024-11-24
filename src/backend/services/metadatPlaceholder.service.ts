import {
  MetadataPlaceholderSchema,
  MetadataPlaceholder,
} from "../models/metadata_placeholder.model.ts";
import { Bson } from "deps";
import EmailPlaceholderService from "./emailPlaceholders.service.ts";

class MetadataPlaceholderService {
  /**
   * Retrieves metadata placeholders with optional search, pagination, and limit parameters.
   *
   * This method performs a search query across `name`, `key`, and `description` fields
   * using a case-insensitive regex match if a `search` term is provided. Results are
   * paginated based on the `page` and `limit` parameters.
   *
   * @param {string} search - The search term for filtering results.
   * @param {number} page - The current page number for pagination.
   * @param {number} limit - The maximum number of results per page.
   * @returns {Promise<MetadataPlaceholderSchema[]>} - A Promise resolving to an array of matched metadata placeholders.
   */
  public static async getMetadataPlaceholders(
    search: string,
    page: number,
    limit: number
  ): Promise<MetadataPlaceholderSchema[]> {
    const skip = (page - 1) * limit;

    const query = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { key: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    return await MetadataPlaceholder.find(query)
      .skip(skip)
      .limit(limit)
      .toArray();
  }

  /**
   * Retrieves a single metadata placeholder by its ID.
   *
   * This method finds a metadata placeholder document by its unique ObjectId.
   *
   * @param {string} id - The unique identifier of the metadata placeholder.
   * @returns {Promise<MetadataPlaceholderSchema | undefined>} - A Promise that resolves to the metadata placeholder, or undefined if not found.
   */
  public static getMetadataPlaceholderById(
    id: string
  ): Promise<MetadataPlaceholderSchema | undefined> {
    return MetadataPlaceholder.findOne({ _id: new Bson.ObjectId(id) });
  }

  /**
   * Creates a new metadata placeholder in the collection.
   *
   * Inserts a new metadata placeholder document with the specified payload.
   *
   * @param {MetadataPlaceholderSchema} payload - The metadata placeholder data to insert.
   * @returns {Promise<string | Bson.ObjectId>} - A Promise that resolves to the ID of the inserted document.
   */

  public static createMetadataPlaceholder(
    payload: MetadataPlaceholderSchema
  ): Promise<string | Bson.ObjectId> {
    return MetadataPlaceholder.insertOne(payload);
  }

  /**
   * Updates an existing metadata placeholder with new data.
   *
   * This method updates a metadata placeholder identified by `_id` with new values
   * for `name` and `description`. An error is thrown if `_id` is missing in the payload.
   *
   * @param {Partial<MetadataPlaceholderSchema>} payload - Partial metadata placeholder data, including `_id` and fields to update.
   * @throws {Error} If `_id` is not provided in the payload.
   * @returns {Promise<Partial<MetadataPlaceholderSchema>>} - A Promise that resolves to the updated payload.
   */
  public static async updateMetadataPlaceholder(
    payload: Partial<MetadataPlaceholderSchema>
  ): Promise<Partial<MetadataPlaceholderSchema>> {
    if (!payload._id) {
      throw new Error("Template ID must be provided for update.");
    }

    await MetadataPlaceholder.updateOne(
      { _id: new Bson.ObjectId(payload._id) },
      {
        $set: {
          name: payload.name,
          description: payload.description,
        },
      }
    );

    return payload;
  }

  /**
   * Deletes a metadata placeholder by its ID, and removes references in related collections.
   *
   * This method deletes a metadata placeholder document by its unique ObjectId
   * and also removes any foreign key references in the `email_placeholders` collection.
   *
   * @param {string} id - The unique identifier of the metadata placeholder.
   * @returns {Promise<number>} - A Promise that resolves to the count of documents deleted.
   */
  public static async deleteMetadataPlaceholder(id: string): Promise<number> {
    // delete foreign key in email_placeholders table
    await EmailPlaceholderService.deleteEmailPlaceholderByMetadataPlaceholderIds(
      [id]
    );
    return await MetadataPlaceholder.deleteOne({ _id: new Bson.ObjectId(id) });
  }
}

export default MetadataPlaceholderService;
