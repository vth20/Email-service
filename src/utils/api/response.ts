import { Status } from "deps";
import type { RouterContext } from "deps";
import type { Response } from "deps"

/**
 * @class ApiResponse
 * @classdesc A utility class for sending standardized API responses.
 * This class provides methods for sending success and error responses in a consistent format.
 */
class ApiResponse {
  /**
   * @desc    Send any success response
   *
   * @param   {Response} response - Oak response object
   * @param   {string | null} message - Success message
   * @param   {object | array} data - Data to be sent in response
   * @param   {Status} statusCode - HTTP status code
   */
  success(
    response: Response,
    message: string | null,
    data: object | unknown[],
    statusCode: Status
  ) {
    response.status = statusCode;
    response.body = {
      message,
      error: false,
      code: statusCode,
      data,
    };
  }

  /**
   * @desc    Send any error response
   *
   * @param   {Response} response - Oak response object
   * @param   {string} message - Error message
   * @param   {Status} statusCode - HTTP status code
   */
  error(response: Response, message: string, statusCode: Status) {
    response.status = statusCode;
    response.body = {
      message,
      error: true,
      code: statusCode,
      data: null,
    };
  }
}

export default new ApiResponse();
