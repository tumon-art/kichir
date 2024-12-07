import prismaClient from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

interface ExtendedReq extends NextApiRequest {
  query: {
    page: string;
    limit: string;
  };
}
// GET KICHIS BY PAGE AND LIMIT
const handler = async (req: ExtendedReq, res: NextApiResponse) => {
  const { page, limit } = req.query;
  if (req.method === "GET") {
    try {
      console.log(req.query);
      const kichirs = await prismaClient.kichir.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: Number(limit),
        skip: (Number(page) - 1) * Number(limit),
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

      return res.status(200).json(kichirs);
    } catch (err) {
      return res.status(404).json(err);
    }
  } else return res.status(404).json("HTTP METHOD NOT ALLOWED");
};

export default handler;
