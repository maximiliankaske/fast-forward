import nodemailer from "nodemailer";

const config = {
  sender: {
    // TODO: create an email provider for fast-forward
    email: process.env.EMAIL_SERVER_USER,
    // email: "hello@fast-forward.app",
    name: "Fast Forward",
  },
  server: {
    host: process.env.EMAIL_SERVER_HOST,
    port: process.env.EMAIL_SERVER_PORT
      ? parseInt(process.env.EMAIL_SERVER_PORT)
      : 465,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  },
};

const transport = nodemailer.createTransport({
  ...config.server,
  pool: true,
});

export { transport, config };
