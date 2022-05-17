import { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "cloudinary";
import { allowCors } from "@/lib/middleware";

// @ts-ignore
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const response = await cloudinary.v2.uploader.upload(
        // base64 image
        JSON.parse(req.body).screenshot,
        {
          resource_type: "auto",
          folder: `screenshots`,
        },
        function (error, result) {}
      );
      return res.json(response);
    } else if (req.method === "GET") {
      const response = await cloudinary.v2.search
        .expression("folder:screenshots/*")
        .execute();
      return res.json(response.total_count);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default allowCors(handler);
