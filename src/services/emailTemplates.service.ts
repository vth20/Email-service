import { Bson } from "deps";
import {
  EmailTemplates,
  EmailTemplateSchema,
} from "../models/email_templates.model.ts";

class EmailTemplateService {
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
  ): Promise<string | Bson.ObjectId> {
    if (!payload._id) {
      throw new Error("Template ID must be provided for update.");
    }

    const result = await EmailTemplates.updateOne(
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

    if (result.modifiedCount === 0) {
      throw new Error("No template was updated. Please check the template ID.");
    }

    return payload._id;
  }
}

export default EmailTemplateService;
