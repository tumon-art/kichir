import prismaClient from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

// update username by email
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
    const kichirs = await prismaClient.kichir.findMany({
      include: {
        author: {
          select: {
            name: true,
            uname: true,
            image: true,
          },
        },
      },
    });
    kichirs.reverse();

      res.status(200).json(kichirs)
    } catch (err) {
      return res.status(404).json(err);
    }
  }
};

export default handler;
