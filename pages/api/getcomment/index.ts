import prismaClient from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

interface ExtendedReq extends NextApiRequest {
  query: {
    id: string;
  };
}

const handler = async (req: ExtendedReq, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const { id } = req.query;
      console.log(req.query);
      if (id) {
        const allComments = await prismaClient.comment.findMany({
          orderBy: {
            createdAt: "desc",
          },
          where: {
            kichirId: Number(id),
          },
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

        return res.status(200).json(allComments);
      } else res.status(404).json("No Comment Found");
    } catch (err) {
      return res.status(404).json(err);
    }
  }
};

export default handler;
