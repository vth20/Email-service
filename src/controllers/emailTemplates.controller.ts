import apiResponse from "apiResponse";
import type { RouterContext } from "deps";
import { Status } from "deps";
import log from "logger";
import EmailTemplateService from "../services/emailTemplates.service.ts";

class EmailTemplateController {
  public static async getAll({ request, response }: RouterContext<string>) {
    const search = request.url.searchParams.get("search") || "";
    const page = Number(request.url.searchParams.get("page")) || 1;
    const limit = Number(request.url.searchParams.get("limit")) || 10;

    const result = await EmailTemplateService.getEmailTemplates(
      search,
      page,
      limit
    );
    apiResponse.success(response, null, result, Status.OK);
  }

  public static async getById({ response, params }: RouterContext<string>) {
    const id = params.id;
    const result = await EmailTemplateService.getEmailTemplateById(id);
    console.log(result);
    apiResponse.success(response, null, { ...result }, Status.OK);
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
    });
    log.info("Created new Email template");
    apiResponse.success(response, null, { _id: newEmailTemplate }, Status.OK);
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
      { _id, templateName, description, subject, body, retryMax }
    );
    log.info(`Update email template id: ${_id}`);
    apiResponse.success(response, null, emailTemplateUpdated, Status.Created);
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
    apiResponse.success(response, null, { id }, Status.OK);
  }
}

export default EmailTemplateController;
