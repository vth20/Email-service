import {
  type EmailSendLogSchema,
  EmailSendLogs,
} from "../models/email_send_logs.model.ts";
import { Bson } from "deps";

class EmailSendLogService {
  /**
   * Retrieves email send log with pagination and optional search.
   * @param {string} search - Search term for filtering email send log by `templateName`, `subject`, `body`, or `description`.
   * @param {number} page - Current page number for pagination.
   * @param {number} limit - Maximum number of results to retrieve per page.
   * @returns {Promise<EmailSendLogSchema[]>} - A promise that resolves to an array of email send log matching the search criteria.
   */
  public static async getEmailSendLogs(
    search: string,
    page: number,
    limit: number
  ): Promise<EmailSendLogSchema[]> {
    const skip = (page - 1) * limit;

    const query = search
      ? {
          $or: [
            { sender: { $regex: search, $options: "i" } },
            { recipient: { $regex: search, $options: "i" } },
            { templateName: { $regex: search, $options: "i" } },
            { subject: { $regex: search, $options: "i" } },
            { content: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    return await EmailSendLogs.find(query).skip(skip).limit(limit).toArray();
  }

  /**
   * Retrieves an email send log by its ID.
   * @param {string} id - The ID of the email send log to retrieve.
   * @returns {Promise<EmailSendLogSchema | undefined>} - A promise that resolves to the email send log or undefined if not found.
   */
  public static getEmailSendLogById(
    id: string
  ): Promise<EmailSendLogSchema | undefined> {
    return EmailSendLogs.findOne({ _id: new Bson.ObjectId(id) });
  }

  /**
   * Creates a new email send log.
   * @param {EmailSendLogSchema} payload - The email send log data to create.
   * @returns {Promise<string | Bson.ObjectId>} - A promise that resolves to the ID of the newly created email send log.
   */
  public static createEmailSendLog(
    payload: EmailSendLogSchema
  ): Promise<string | Bson.ObjectId> {
    return EmailSendLogs.insertOne(payload);
  }

  /**
   * Deletes an email send log by its ID.
   * @param {string} id - The ID of the email send log to delete.
   * @returns {Promise<number>} - A promise that resolves to the number of deleted documents (0 or 1).
   */
  public static deleteEmailSendLog(id: string): Promise<number> {
    return EmailSendLogs.deleteOne({ _id: new Bson.ObjectId(id) });
  }
}

export default EmailSendLogService;
