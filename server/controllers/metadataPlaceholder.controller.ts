import MetadataPlaceholderService from "../services/metadatPlaceholder.service.ts";
import apiResponse from "../utils/api/response.ts";
import type { RouterContext } from "deps";
import { Status } from "deps";
import log from "../logger/index.ts";

class MetadataPlaceholderController {
  /**
   * Retrieves a paginated list of metadata placeholders with an optional search filter.
   *
   * @param {RouterContext<string>} context - The context object containing `request` and `response`.
   * @param {URLSearchParams} context.request.url.searchParams - The search parameters from the request URL.
   * @param {Response} context.response - The response object for sending data back to the client.
   * @returns {Promise<void>} - A Promise that sends a JSON response with paginated metadata placeholders and status 200.
   */
  public static async getAll({ request, response }: RouterContext<string>) {
    const search = request.url.searchParams.get("search") || "";
    const page = Number(request.url.searchParams.get("page")) || 1;
    const limit = Number(request.url.searchParams.get("limit")) || 10;

    const result = await MetadataPlaceholderService.getMetadataPlaceholders(
      search,
      page,
      limit
    );
    return apiResponse.success(response, null, result, Status.OK);
  }

  /**
   * Retrieves a metadata placeholder by its unique ID.
   *
   * @param {RouterContext<string>} context - The context object containing `response` and `params`.
   * @param {Response} context.response - The response object for sending data back to the client.
   * @param {Record<string, string>} context.params - The route parameters, expected to contain the `id` of the metadata placeholder.
   * @returns {Promise<void>} - A Promise that sends a JSON response with the placeholder data and status 200.
   */
  public static async getById({ response, params }: RouterContext<string>) {
    const id = params.id;
    const result = await MetadataPlaceholderService.getMetadataPlaceholderById(
      id
    );
    console.log(result);
    return apiResponse.success(response, null, { ...result }, Status.OK);
  }

  /**
   * Creates a new metadata placeholder with the provided information.
   *
   * @param {RouterContext<string>} context - The context object containing `request` and `response`.
   * @param {Request} context.request - The request object, expected to contain `key`, `name`, and `description` in the payload.
   * @param {Response} context.response - The response object for sending data back to the client.
   * @returns {Promise<void>} - A Promise that sends a JSON response with the ID of the created placeholder and status 200.
   */
  public static async create({
    request,
    response,
  }: RouterContext<string>): Promise<void> {
    const payload = request.body();
    const { key, name, description } = await payload.value;
    const newEmailTemplate =
      await MetadataPlaceholderService.createMetadataPlaceholder({
        key,
        name,
        description,
        createdAt: new Date(),
      });
    log.info("Created new Metadata placeholder");
    return apiResponse.success(
      response,
      null,
      { _id: newEmailTemplate },
      Status.OK
    );
  }

  /**
   * Updates an existing metadata placeholder with the specified ID.
   *
   * @param {RouterContext<string>} context - The context object containing `request`, `response`, and `params`.
   * @param {Request} context.request - The request object, expected to contain `name` and `description` in the payload.
   * @param {Response} context.response - The response object for sending data back to the client.
   * @param {Record<string, string>} context.params - The route parameters, expected to contain the `id` of the placeholder to update.
   * @returns {Promise<void>} - A Promise that sends a JSON response with the updated placeholder data and status 201.
   */
  public static async update({
    request,
    response,
    params,
  }: RouterContext<string>): Promise<void> {
    const payload = request.body();
    const _id = params.id;
    const { name, description } = await payload.value;
    const emailTemplateUpdated =
      await MetadataPlaceholderService.updateMetadataPlaceholder({
        _id,
        name,
        description,
        updatedAt: new Date(),
      });
    log.info(`Update Metadata placeholder id: ${_id}`);
    return apiResponse.success(
      response,
      null,
      emailTemplateUpdated,
      Status.Created
    );
  }

  /**
   * Deletes a metadata placeholder by its unique ID and removes references in related collections.
   *
   * @param {RouterContext<string>} context - The context object containing `response` and `params`.
   * @param {Response} context.response - The response object for sending data back to the client.
   * @param {Record<string, string>} context.params - The route parameters, expected to contain the `id` of the placeholder to delete.
   * @returns {Promise<void>} - A Promise that sends a JSON response with the deleted ID and status 200.
   */
  public static async delete({
    response,
    params,
  }: RouterContext<string>): Promise<void> {
    const id = params.id;

    await MetadataPlaceholderService.deleteMetadataPlaceholder(id);
    log.info(`Deleted Metadata placeholder with id: ${id}`);

    // Sends a success response with the deleted ID
    return apiResponse.success(response, null, { id }, Status.OK);
  }
}

export default MetadataPlaceholderController;
