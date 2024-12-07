import prismaClient from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
// get user info by email

interface ExtendedReq extends NextApiRequest {
  body: {
    kichirId: number;
    userId: string;
  };
}

const handler = async (req: ExtendedReq, res: NextApiResponse) => {
  const { kichirId, userId } = req.body;

  if (req.method === "POST") {
    try {
      // Check if the user has already liked the post
      const existingLove = await prismaClient.love.findFirst({
        where: {
          kichirId: kichirId,
          userId: userId,
        },
      });

      if (existingLove) {
        // If the user has already liked the post, unlike it
        await prismaClient.love.delete({
          where: {
            id: existingLove.id,
          },
        });

        res.status(200).json({ isLiked: false });
      } else {
        // If the user hasn't liked the post yet, like it
        await prismaClient.love.create({
          data: {
            kichirId: kichirId,
            userId: userId,
          },
        });

        res.status(200).json({ isLiked: true });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  } else res.status(405).json({ message: "Method not allowed" });
};

export default handler;
