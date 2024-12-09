import { PREFIX_PLACEHOLDER, SUFFIX_PLACEHOLDER } from "constants/index.ts";
import { SMTPClient } from "deps";
import { ISendMail } from "types";
import configs from "../../config/config.ts";
/**
 * SMTP client instance for sending emails.
 */
const client = new SMTPClient({
  connection: {
    hostname: configs.smtpHost,
    port: configs.smtpPort,
    tls: true,
    auth: {
      username: configs.smtpUsername,
      password: configs.smtpPassword,
    },
  },
});

/**
 * Sends an email using the SMTP client.
 *
 * @param {ISendMail} data - The email details including recipient, subject, text, and HTML content.
 * @returns {Promise<void>} Resolves when the email is successfully sent.
 */
const sendMail = async (data: ISendMail): Promise<void> => {
  await client.send({
    from: configs.smtpMail,
    to: data.to,
    subject: data.subject,
    content: data.text,
    html: data.html,
  });
};

/**
 * Matches a placeholder in a template string with the format `[[{place_holder}]]`.
 *
 * @param {string} key - The key of the placeholder.
 * @returns {string} The formatted placeholder string.
 */
function matchingPlaceholder(key: string) {
  // placeholder with format [[{place_holder}]]
  return `${PREFIX_PLACEHOLDER}${key}${SUFFIX_PLACEHOLDER}`;
}

/**
 * Replaces placeholders in a template string with corresponding values from a map.
 *
 * @param {string | undefined} template - The template string containing placeholders.
 * @param {Map<string, string>} variables - A map of placeholder keys to replacement values.
 * @returns {string} The template with placeholders replaced by actual values.
 */
function replaceTemplatePlaceholders(
  template: string | undefined,
  variables: Map<string, string>
) {
  if (!template) return "";
  // DEFAULT placeholder
  variables.set("app_name", configs.appName);
  variables.set("support_mail", configs.smtpMail);
  variables.set("signature", configs.appName);
  for (const [key, value] of variables.entries()) {
    const placeholder = matchingPlaceholder(key);
    template = template.replaceAll(placeholder, value);
  }
  return template;
}

export default { client, sendMail, replaceTemplatePlaceholders };
