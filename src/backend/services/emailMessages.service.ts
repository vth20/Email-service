import { Bson } from "deps";
import {
  EmailMessages,
  type EmailMessageSchema,
} from "../models/email_messages.model.ts";

class EmailMessageService {
  /**
   * Retrieves email templates with pagination and optional search.
   * @param {string} search - Search term for filtering email templates by `templateName`, `subject`, `body`, or `description`.
   * @param {number} page - Current page number for pagination.
   * @param {number} limit - Maximum number of results to retrieve per page.
   * @returns {Promise<EmailMessageSchema[]>} - A promise that resolves to an array of email templates matching the search criteria.
   */
  public static async getEmailMessages(
    search: string,
    page: number,
    limit: number
  ): Promise<EmailMessageSchema[]> {
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

    return await EmailMessages.find(query).skip(skip).limit(limit).toArray();
  }

  /**
   * Retrieves an email message by its ID.
   * @param {string} id - The ID of the email message to retrieve.
   * @returns {Promise<EmailMessageSchema | undefined>} - A promise that resolves to the email message or undefined if not found.
   */
  public static getEmailMessageById(
    id: string
  ): Promise<EmailMessageSchema | undefined> {
    return EmailMessages.findOne({ _id: new Bson.ObjectId(id) });
  }

  /**
   * Creates a new email message.
   * @param {EmailMessageSchema} payload - The email message data to create.
   * @returns {Promise<string | Bson.ObjectId>} - A promise that resolves to the ID of the newly created email message.
   */
  public static createEmailMessage(
    payload: EmailMessageSchema
  ): Promise<string | Bson.ObjectId> {
    return EmailMessages.insertOne(payload);
  }

  /**
   * Deletes an email message by its ID.
   * @param {string} id - The ID of the email message to delete.
   * @returns {Promise<number>} - A promise that resolves to the number of deleted documents (0 or 1).
   */
  public static deleteEmailMessage(id: string): Promise<number> {
    return EmailMessages.deleteOne({ _id: new Bson.ObjectId(id) });
  }
}

export default EmailMessageService;
