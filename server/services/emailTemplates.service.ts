import { Bson } from "deps";
import { EmailTemplateType } from "enum";
import {
  EmailTemplates,
  EmailTemplateSchema,
} from "../models/email_templates.model.ts";
import EmailPlaceholderService from "./emailPlaceholders.service.ts";
import type { IInUseEmailTemplate } from "types/index.ts";

class EmailTemplateService {
  /**
   * Retrieves a paginated list of email templates based on a search query.
   *
   * @param {string} search - The search term to filter email templates by. Filters by template name, subject, body, or description.
   * @param {number} page - The current page of results to retrieve (1-based index).
   * @param {number} limit - The maximum number of email templates to return per page.
   * @returns {Promise<EmailTemplateSchema[]>} A promise that resolves to an array of matching email templates.
   */
  public static getEmailTemplates(
    search: string,
    page: number,
    limit: number
  ): Promise<EmailTemplateSchema[]> {
    const skip = (page - 1) * limit;

    const query = search
      ? {
          $or: [
            { templateName: { $regex: search, $options: "i" } },
            { subject: { $regex: search, $options: "i" } },
            { body: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    return EmailTemplates.find(query).skip(skip).limit(limit).toArray();
  }

  /**
   * Retrieves an email template by its ID.
   *
   * @param {string} id - The ID of the email template to retrieve.
   * @returns {Promise<EmailTemplateSchema | undefined>} A promise that resolves to the found email template schema or undefined if not found.
   */
  public static getEmailTemplateById(
    id: string
  ): Promise<EmailTemplateSchema | undefined> {
    return EmailTemplates.findOne({ _id: new Bson.ObjectId(id) });
  }

  /**
   * Creates a new email template in the database.
   *
   * @param {EmailTemplateSchema} payload - The data to be inserted as a new email template.
   * This should conform to the structure defined in EmailTemplateSchema.
   *
   * @returns {Promise<string | Bson.ObjectId>} A promise that resolves to the ID of the created email template,
   * either as a string or a Bson.ObjectId, depending on the database configuration.
   *
   * @throws {Error} If the insertion fails due to database issues or validation errors.
   */
  public static createEmailTemplate(
    payload: EmailTemplateSchema
  ): Promise<string | Bson.ObjectId> {
    return EmailTemplates.insertOne(payload);
  }

  /**
   * Updates an existing email template in the database.
   *
   * @param {Partial<EmailTemplateSchema>} payload - The data to update the email template.
   * The payload should contain the `_id` of the template and any other fields to be updated.
   * Fields not included in the payload will remain unchanged.
   *
   * @returns {Promise<string | Bson.ObjectId>} A promise that resolves to the ID of the updated email template
   * or an indication of the operation's success.
   *
   * @throws {Error} If the update fails due to database issues or if the `_id` is not provided.
   */
  public static async updateEmailTemplate(
    payload: Partial<EmailTemplateSchema>
  ): Promise<Partial<EmailTemplateSchema>> {
    if (!payload._id) {
      throw new Error("Template ID must be provided for update.");
    }

    await EmailTemplates.updateOne(
      { _id: new Bson.ObjectId(payload._id) },
      {
        $set: {
          templateName: payload.templateName,
          description: payload.description,
          subject: payload.subject,
          body: payload.body,
          retryMax: payload.retryMax,
        },
      }
    );

    return payload;
  }

  /**
   * Deletes an email template by its unique identifier.
   *
   * @async
   * @function deleteEmailTemplate
   * @param   {string} id - The unique identifier of the email template to delete.
   * @returns {Promise<number>} - Returns a promise that resolves to the number of documents deleted (1 if successful, 0 if not found).
   *
   * @example
   * const result = await deleteEmailTemplate("64bcf8f87e1a4eaa11122233");
   */
  public static deleteEmailTemplate(id: string): Promise<number> {
    EmailPlaceholderService.deleteEmailPlaceholderByTemplateIds([id]);
    return EmailTemplates.deleteOne({ _id: new Bson.ObjectId(id) });
  }

  public static async getInUseTemplateByType(
    type: EmailTemplateType
  ): Promise<IInUseEmailTemplate> {
    const result = await EmailTemplates.aggregate([
      {
        $match: {
          templateType: type,
          isDeleted: false,
        },
      },
      {
        $lookup: {
          from: "email_placeholders", // Collection for placeholders
          localField: "_id", // EmailTemplates _id
          foreignField: "templateId", // EmailPlaceholders.templateId
          as: "placeholders", // Output array field
        },
      },
      {
        $unwind: {
          path: "$placeholders",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "metadata_placeholder", // Metadata collection
          localField: "placeholders.placeholderId", // EmailPlaceholders.placeholderId
          foreignField: "id", // MetadataPlaceholder.id
          as: "placeholders_metadata", // Enrich placeholders with metadata
        },
      },
      {
        $unwind: {
          path: "$placeholders_metadata", // Flatten the metadata array
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$_id", // Group by template _id
          template: { $first: "$$ROOT" },
          placeholders: {
            $push: {
              $mergeObjects: [
                "$placeholders",
                { metadata: "$placeholders_metadata" },
              ],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          template: {
            _id: "$template._id",
            name: "$template.name",
            subject: "$template.subject",
            body: "$template.body",
            templateType: "$template.templateType",
          },
          placeholders: 1,
        },
      },
    ]).toArray();

    // Return the first matched template or undefined
    return result[0] as unknown as IInUseEmailTemplate;
  }
}

export default EmailTemplateService;
