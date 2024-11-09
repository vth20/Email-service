import apiResponse from "apiResponse";
import type { RouterContext } from "deps";
import { Status } from "deps";
import log from "logger";
import EmailSendLogService from "../services/emailSendLogs.service.ts";

class EmailSendLogController {
  /**
   * Retrieves all email send logs with optional search and pagination.
   * @param {RouterContext<string>} context - The context object containing the request and response.
   * @param {string} context.request.url.searchParams.search - Search term to filter email send logs.
   * @param {number} context.request.url.searchParams.page - Current page number for pagination (default: 1).
   * @param {number} context.request.url.searchParams.limit - Maximum number of results per page (default: 10).
   * @returns {Promise<void>} - A promise that sends a success response with the retrieved email send logs.
   */
  public static async getAll({
    request,
    response,
  }: RouterContext<string>): Promise<void> {
    const search = request.url.searchParams.get("search") || "";
    const page = Number(request.url.searchParams.get("page")) || 1;
    const limit = Number(request.url.searchParams.get("limit")) || 10;

    const result = await EmailSendLogService.getEmailSendLogs(
      search,
      page,
      limit
    );
    return apiResponse.success(response, null, result, Status.OK);
  }

  /**
   * Retrieves an email send log by its ID.
   * @param {RouterContext<string>} context - The context object containing the request and response.
   * @param {string} context.params.id - The ID of the email send log to retrieve.
   * @returns {Promise<void>} - A promise that sends a success response with the found email send log.
   */
  public static async getById({
    response,
    params,
  }: RouterContext<string>): Promise<void> {
    const id = params.id;
    const result = await EmailSendLogService.getEmailSendLogById(id);
    console.log(result);
    return apiResponse.success(response, null, { ...result }, Status.OK);
  }

  /**
   * Creates a new email send log.
   * @param {RouterContext<string>} context - The context object containing the request and response.
   * @returns {Promise<void>} - A promise that sends a success response with the ID of the created email send log.
   */
  public static async create({
    request,
    response,
  }: RouterContext<string>): Promise<void> {
    const payload = request.body();
    const { emailMessageId, logType, sentAt, retryScheduledAt, retryCount } =
      await payload.value;
    const newEmailTemplate = await EmailSendLogService.createEmailSendLog({
      emailMessageId,
      logType,
      sentAt,
      retryScheduledAt,
      retryCount,
      createdAt: new Date(),
    });
    log.info("Created new Email template");
    return apiResponse.success(
      response,
      null,
      { _id: newEmailTemplate },
      Status.OK
    );
  }

  /**
   * Deletes an email send log by its ID.
   * @param {RouterContext<string>} context - The context object containing the request and response.
   * @param {string} context.params.id - The ID of the email send log to delete.
   * @returns {Promise<void>} - A promise that sends a success response with the ID of the deleted email send log.
   */
  public static async delete({
    response,
    params,
  }: RouterContext<string>): Promise<void> {
    const id = params.id;

    await EmailSendLogService.deleteEmailSendLog(id);
    log.info(`Deleted email template with id: ${id}`);

    // Sends a success response with the deleted ID
    return apiResponse.success(response, null, { id }, Status.OK);
  }
}

export default EmailSendLogController;
