import { EmailConfig } from "next-auth/providers";
import { createTransport } from "nodemailer";
type SendVerificationRequestType = {
  identifier: string;
  url: string;
  expires: Date;
  provider: EmailConfig;
  token: string;
};

async function sendVerificationRequest({
  identifier: email,
  url,
  provider: { server, from },
}: SendVerificationRequestType) {
  const { host } = new URL(url);
  const transport = createTransport(server);
  await transport.sendMail({
    to: email,
    from,
    subject: `Sign in to ${host}`,
    text: text({ url, host }),
    html: html({ url, host, email }),
  });
}

// Email HTML body
function html({ url, host, email }: Record<"url" | "host" | "email", string>) {
  // Insert invisible space into domains and email address to prevent both the
  // email address and the domain from being turned into a hyperlink by email
  // clients like Outlook and Apple mail, as this is confusing because it seems
  // like they are supposed to click on their email address to sign in.
  const escapedEmail = `${email.replace(/\./g, "&#8203;.")}`;
  const escapedHost = `${host.replace(/\./g, "&#8203;.")}`;

  return `
    <body>
      <p>${escapedHost}</p>
      <p>Sign in as <strong>${escapedEmail}</strong></p>
      <br/>
      <p><a href="${url}" target="_blank" style="font-weight: bold;">Sign in</a></p>
      <br/>
      <p>If you did not request this email you can safely ignore it.</p>
    </body>
`;
}

// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
function text({ url, host }: Record<"url" | "host", string>) {
  return `Sign in to ${host}\n${url}\n\n`;
}

export { sendVerificationRequest };
