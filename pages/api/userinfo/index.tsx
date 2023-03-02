import prismaClient from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
// get user info by email

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const data = await prismaClient.user.findUnique({
        where: {
          email: req.body.email,
        },
      });

      res.status(200).send({ data });
    } catch (err) {
      return res.status(404).send({ msg: err });
    }
  }
};

export default handler;
