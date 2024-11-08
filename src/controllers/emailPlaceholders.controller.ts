import { EmailPlaceholderSchema } from "../models/email_placeholders.model.ts";
import { Bson, Status, type RouterContext } from "deps";
import EmailPlaceholderService from "../services/emailPlaceholders.service.ts";
import type { IQueryEmailPlaceholder } from "types";
import apiResponse from "apiResponse";

class EmailPlaceholderController {
  /**
   * Handles HTTP GET requests to retrieve email placeholders by `templateId` or `placeholderId`.
   *
   * This method extracts `templateId` and `placeholderId` from query parameters and
   * fetches matching email placeholders. It then sends a success response containing
   * the retrieved placeholders.
   *
   * @param {RouterContext<string>} { request, response } - The request and response context for the route.
   * @returns {Promise<void>} - A Promise that resolves when the response is sent.
   */
  public static async getEmailPlaceholdersByFK({
    request,
    response,
  }: RouterContext<string>) {
    const templateId = request.url.searchParams.get("templateId");
    const placeholderId = request.url.searchParams.get("placeholderId");

    const result = await EmailPlaceholderService.getEmailPlaceholder(
      templateId,
      placeholderId
    );
    apiResponse.success(response, null, result, Status.OK);
  }

  /**
   * Handles HTTP POST requests to create new email placeholders.
   *
   * This method accepts a request body containing `templateId` and `placeholderIds`,
   * verifies that `placeholderIds` is not empty, and then maps each `placeholderId`
   * to the specified `templateId`. After creating the placeholders, it sends a success
   * response with the inserted details.
   *
   * @param {RouterContext<string>} { request, response } - The request and response context for the route.
   * @throws {Error} If `placeholderIds` is missing or empty.
   * @returns {Promise<void>} - A Promise that resolves when the response is sent.
   */
  public static async create({ request, response }: RouterContext<string>) {
    const body = request.body();
    const { templateId, placeholderIds } = await body.value;
    if (!placeholderIds || !placeholderIds.length)
      throw new Error("placeholderIds is empty");
    const payload = placeholderIds.map((placeholderId: string) => ({
      templateId,
      placeholderId,
    })) as EmailPlaceholderSchema[];

    const result = await EmailPlaceholderService.createEmailPlaceholders(
      payload
    );
    apiResponse.success(response, null, result, Status.OK);
  }

  /**
   * Handles HTTP DELETE requests to delete email placeholders by their IDs.
   *
   * This method accepts a request body containing an array of `ids`, converts each
   * ID to a `Bson.ObjectId`, and deletes matching email placeholders. After deletion,
   * it sends a success response with the result details.
   *
   * @param {RouterContext<string>} { request, response } - The request and response context for the route.
   * @returns {Promise<void>} - A Promise that resolves when the response is sent.
   */
  public static async deletes({ request, response }: RouterContext<string>) {
    const body = request.body();
    const payload = await body.value;
    const objectIds = payload.ids.map((i: string) => new Bson.ObjectId(i));
    const result = await EmailPlaceholderService.deleteEmailPlaceholders(
      objectIds
    );
    apiResponse.success(response, null, { result }, Status.OK);
  }
}

export default EmailPlaceholderController;
