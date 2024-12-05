import apiResponse from "../utils/api/response.ts";
import type { RouterContext } from "deps";
import { Status } from "deps";
import log from "../logger/index.ts";
import EmailMessageService from "../services/emailMessages.service.ts";

class EmailMessageController {
  /**
   * Retrieves all email messages with optional search and pagination.
   * @param {RouterContext<string>} context - The context object containing the request and response.
   * @param {string} context.request.url.searchParams.search - Search term to filter email messages.
   * @param {number} context.request.url.searchParams.page - Current page number for pagination (default: 1).
   * @param {number} context.request.url.searchParams.limit - Maximum number of results per page (default: 10).
   * @returns {Promise<void>} - A promise that sends a success response with the retrieved email messages.
   */
  public static async getAll({ request, response }: RouterContext<string>) {
    const search = request.url.searchParams.get("search") || "";
    const page = Number(request.url.searchParams.get("page")) || 1;
    const limit = Number(request.url.searchParams.get("limit")) || 10;

    const result = await EmailMessageService.getEmailMessages(
      search,
      page,
      limit
    );
    return apiResponse.success(response, null, result, Status.OK);
  }

  /**
   * Retrieves an email message by ID.
   * @param {RouterContext<string>} context - The context object containing the request and response.
   * @param {string} context.params.id - The ID of the email message to retrieve.
   * @returns {Promise<void>} - A promise that sends a success response with the found email message.
   */
  public static async getById({
    response,
    params,
  }: RouterContext<string>): Promise<void> {
    const id = params.id;
    const result = await EmailMessageService.getEmailMessageById(id);
    console.log(result);
    return apiResponse.success(response, null, { ...result }, Status.OK);
  }

  /**
   * Creates a new email message.
   * @param {RouterContext<string>} context - The context object containing the request and response.
   * @returns {Promise<void>} - A promise that sends a success response with the ID of the created email message.
   */
  public static async create({
    request,
    response,
  }: RouterContext<string>): Promise<void> {
    const payload = request.body();
    const {
      sender,
      recipient,
      templateId,
      subject,
      content,
      scheduledAt,
      status,
      attachments,
    } = await payload.value;
    const newEmailTemplate = await EmailMessageService.createEmailMessage({
      sender,
      recipient,
      templateId,
      subject,
      content,
      scheduledAt,
      status,
      attachments,
      createdAt: new Date(),
    });
    log.info("Created new Email message");
    return apiResponse.success(
      response,
      null,
      { _id: newEmailTemplate },
      Status.OK
    );
  }

  /**
   * Deletes an email message by ID.
   * @param {RouterContext<string>} context - The context object containing the request and response.
   * @param {string} context.params.id - The ID of the email message to delete.
   * @returns {Promise<void>} - A promise that sends a success response with the ID of the deleted email message.
   */
  public static async delete({
    response,
    params,
  }: RouterContext<string>): Promise<void> {
    const id = params.id;

    await EmailMessageService.deleteEmailMessage(id);
    log.info(`Deleted email template with id: ${id}`);

    // Sends a success response with the deleted ID
    return apiResponse.success(response, null, { id }, Status.OK);
  }
}

export default EmailMessageController;
