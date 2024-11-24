import apiResponse from "apiResponse";
import type { RouterContext } from "deps";
import { Status } from "deps";
import log from "logger";
import EmailTemplateService from "../services/emailTemplates.service.ts";

class EmailTemplateController {
  /**
   * Retrieves a paginated list of email templates, optionally filtered by a search term.
   *
   * This method extracts `search`, `page`, and `limit` parameters from the request URL,
   * applies the search term if provided, and paginates the results based on the `page`
   * and `limit` values.
   *
   * @param {RouterContext<string>} context - The context object containing `request` and `response`.
   * @param {URLSearchParams} context.request.url.searchParams - The search parameters from the request URL.
   * @param {Response} context.response - The response object for sending data back to the client.
   * @returns {Promise<void>} - A Promise that sends a JSON response with paginated results and status 200.
   */
  public static async getAll({ request, response }: RouterContext<string>): Promise<void> {
    const search = request.url.searchParams.get("search") || "";
    const page = Number(request.url.searchParams.get("page")) || 1;
    const limit = Number(request.url.searchParams.get("limit")) || 10;

    const result = await EmailTemplateService.getEmailTemplates(
      search,
      page,
      limit
    );
    return apiResponse.success(response, null, result, Status.OK);
  }

  /**
   * Retrieves an email template by its unique ID.
   *
   * This method fetches a single email template based on the `id` parameter from the request `params`.
   * The resulting template is sent back as a JSON response.
   *
   * @param {RouterContext<string>} context - The context object containing `response` and `params`.
   * @param {Response} context.response - The response object for sending data back to the client.
   * @param {Record<string, string>} context.params - The route parameters, expected to contain the `id` of the email template.
   * @returns {Promise<void>} - A Promise that sends a JSON response with the template data and status 200.
   */
  public static async getById({ response, params }: RouterContext<string>): Promise<void> {
    const id = params.id;
    const result = await EmailTemplateService.getEmailTemplateById(id);
    console.log(result);
    return apiResponse.success(response, null, { ...result }, Status.OK);
  }

  /**
   * Creates a new email template based on the provided data in the request body.
   *
   * @async
   * @function create
   * @param   {RouterContext<string>} context - The Oak Router context containing request/response objects.
   * @param   {Object} context.request - Oak request object to access the request body.
   * @param   {Object} context.response - Oak response object for sending the HTTP response.
   * @returns {Promise<void>} - No return value; sends an HTTP response with the newly created template ID.
   *
   * @example
   * // Example route setup:
   * router.post("/email-template", EmailTemplateController.create);
   *
   * // POST request body example:
   * {
   *   "templateType": "Welcome",
   *   "templateName": "Welcome Template",
   *   "description": "Template for welcoming new users",
   *   "subject": "Welcome to Our Service!",
   *   "body": "<p>Hello, welcome!</p>",
   *   "retryMax": 3
   * }
   *
   * // Success response example:
   * {
   *   "message": null,
   *   "error": false,
   *   "code": 200,
   *   "data": { "_id": "64bcf8f87e1a4eaa11122233" }
   * }
   */
  public static async create({
    request,
    response,
  }: RouterContext<string>): Promise<void> {
    const payload = request.body();
    const { templateType, templateName, description, subject, body, retryMax } =
      await payload.value;
    const newEmailTemplate = await EmailTemplateService.createEmailTemplate({
      templateType,
      templateName,
      description,
      subject,
      body,
      retryMax,
      createdAt: new Date()
    });
    log.info("Created new Email template");
    return apiResponse.success(response, null, { _id: newEmailTemplate }, Status.OK);
  }

  /**
   * Handles updating an email template by its unique identifier.
   *
   * @async
   * @function update
   * @param   {RouterContext<string>} context - The Oak Router context, containing request/response objects and route parameters.
   * @param   {Object} context.request - The Oak request object, containing the payload data for the update.
   * @param   {Object} context.response - The Oak response object for sending the HTTP response.
   * @param   {Object} context.params - Route parameters containing the `id` of the email template to update.
   * @returns {Promise<void>} - No return value; sends an HTTP response with the update result.
   *
   * @example
   * // Example route setup:
   * router.put("/email-template/:id", EmailTemplateController.update);
   *
   * // PUT request to /email-template/64bcf8f87e1a4eaa11122233 with JSON body:
   * {
   *   "templateName": "Updated Template",
   *   "description": "Updated description",
   *   "subject": "Updated subject",
   *   "body": "Updated body content",
   *   "retryMax": 3
   * }
   * // Responds with a success message and the updated template data
   */
  public static async update({
    request,
    response,
    params,
  }: RouterContext<string>): Promise<void> {
    const payload = request.body();
    const _id = params.id;
    const { templateName, description, subject, body, retryMax } =
      await payload.value;
    const emailTemplateUpdated = await EmailTemplateService.updateEmailTemplate(
      { _id, templateName, description, subject, body, retryMax, updatedAt: new Date() }
    );
    log.info(`Update email template id: ${_id}`);
    return apiResponse.success(response, null, emailTemplateUpdated, Status.Created);
  }

  /**
   * Handles the deletion of an email template by its unique identifier.
   *
   * @async
   * @function delete
   * @param   {RouterContext<string>} context - The Oak Router context, containing request/response objects and route parameters.
   * @param   {Object} context.response - Oak response object for sending the HTTP response.
   * @param   {Object} context.params - Route parameters containing the `id` of the email template to delete.
   * @returns {Promise<void>} - No return value; sends an HTTP response with the deletion result.
   *
   * @example
   * // Example route setup:
   * router.delete("/email-template/:id", EmailTemplateController.delete);
   *
   * // DELETE request to /email-template/64bcf8f87e1a4eaa11122233
   * // Responds with a success message and the deleted template's ID
   */
  public static async delete({
    response,
    params,
  }: RouterContext<string>): Promise<void> {
    const id = params.id;

    await EmailTemplateService.deleteEmailTemplate(id);
    log.info(`Deleted email template with id: ${id}`);

    // Sends a success response with the deleted ID
    return apiResponse.success(response, null, { id }, Status.OK);
  }
}

export default EmailTemplateController;
