export enum SendLogStatus {
  /**
   * Indicates that the system has begun an attempt to send the email.
   * This status is used when the email sending process is ongoing.
   */
  SEND_ATTEMPT = "SEND_ATTEMPT",

  /**
   * The email has been successfully sent.
   * This status indicates that no errors occurred during the sending process.
   */
  SEND_SUCCESS = "SEND_SUCCESS",

  /**
   * An error occurred while sending the email.
   * This status indicates that the sending process was not successful.
   */
  SEND_FAILURE = "SEND_FAILURE",

  /**
   * A retry attempt to send the email has been scheduled.
   * This status is used when the system decides to resend the email after a previous failure.
   */
  RETRY_SCHEDULED = "RETRY_SCHEDULED",

  /**
   * Indicates that the system has begun an attempt to resend the email.
   * This status indicates that a retry is currently in progress.
   */
  RETRY_ATTEMPT = "RETRY_ATTEMPT",

  /**
   * The email has been successfully resent.
   * This status indicates that the retry attempt completed without errors.
   */
  RETRY_SUCCESS = "RETRY_SUCCESS",

  /**
   * An error occurred while attempting to resend the email.
   * This status indicates that the retry attempt was not successful.
   */
  RETRY_FAILURE = "RETRY_FAILURE",

  /**
   * The email has been cancelled and no further sending attempts will be made.
   * This status can be used when a user cancels the email sending.
   */
  CANCELLED = "CANCELLED",
}
