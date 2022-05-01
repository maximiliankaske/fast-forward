import { Feedback, Project } from "@prisma/client";
import { EmailConfig } from "next-auth/providers";
import { config, transport } from "../nodemailer";
import { html, text } from "./templates/auth";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.VERCEL_URL;

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
  await transport.sendMail({
    to: email,
    from,
    subject: `Sign in to ${host}`,
    text: text({ url, host }),
    html: html({ url, host, email }),
  });
}

type SendFeedbackNotificationType = {
  email: string;
  project: Project;
  feedback: Feedback;
};
async function sendFeedbackNotification({
  email,
  project,
  feedback,
}: SendFeedbackNotificationType) {
  try {
    const res = await transport.sendMail({
      to: email,
      from: config.sender.email,
      subject: `New Feedback in your project ${project.name} `,
      text: `Feedback: "${feedback.text}"`,
      html: `
        <p>
          <strong>Feedback: </strong>
          "${feedback.text}"
        </p
        <p>click <a href="${BASE_URL}/projects/${project.id}">here</a> to see more.</p>
      `,
    });
    console.log(res);
  } catch (e) {
    console.log(e);
  }
}

export { sendVerificationRequest, sendFeedbackNotification };
