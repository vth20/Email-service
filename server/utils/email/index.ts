import { ISendMail, type IPlaceholderVariable } from "types";
import { SMTPClient } from "deps";
import configs from "../../config/config.ts";
import { PREFIX_PLACEHOLDER, SUFFIX_PLACEHOLDER } from "constants/index.ts";

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

const sendMail = async (data: ISendMail) => {
  await client.send({
    from: configs.smtpMail,
    to: data.to,
    subject: data.subject,
    content: data.text,
    html: data.html,
  });
};

function matchingPlaceholder(key: string) {
  // placeholder with format [[{place_holder}]]
  return `${PREFIX_PLACEHOLDER}${key}${SUFFIX_PLACEHOLDER}`;
}

function replaceTemplatePlaceholders(
  template: string | undefined,
  variables: Map<string, string>
) {
  if (!template) return template;
  for (const [key, value] of Object.entries(variables)) {
    const placeholder = matchingPlaceholder(key);
    template = template.replace(new RegExp(placeholder, "g"), value);
  }
  return template;
}

export default { client, sendMail, replaceTemplatePlaceholders };
