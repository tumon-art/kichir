import prismaClient from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

interface ExtendedReq extends NextApiRequest {
  query: {
    id: string;
  };
}
// update username by email
const handler = async (req: ExtendedReq, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const { id } = req.query;
      console.log(req.query);
      if (id) {
        const kichir = await prismaClient.kichir.findUnique({
          where: { id: Number(id) },
          include: {
            author: {
              select: {
                name: true,
                uname: true,
                image: true,
              },
            },
            loves: true,
            comments: true,
          },
        });

        if (!kichir) {
          return res.status(404).json({ message: "Kichirs not found" });
        }

        return res.status(200).json(kichir);
      } else {
        const kichirs = await prismaClient.kichir.findMany({
          include: {
            author: {
              select: {
                name: true,
                uname: true,
                image: true,
              },
            },
            loves: true,
            comments: true,
          },
        });

        kichirs.reverse();

        return res.status(200).json(kichirs);
      }
    } catch (err) {
      return res.status(404).json(err);
    }
  }
};

export default handler;
