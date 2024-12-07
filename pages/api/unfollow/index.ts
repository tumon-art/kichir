import prismaClient from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

interface ExtendedReq extends NextApiRequest {
  body: {
    followerId: string;
    followingId: string;
  };
}

export default async function handler(req: ExtendedReq, res: NextApiResponse) {
  const { followerId, followingId } = req.body;

  if (req.method == "POST") {
    try {
      const follow = await prismaClient.follows.findUnique({
        where: {
          followerId_followingId: {
            followerId,
            followingId,
          },
        },
      });

      if (!follow) {
        return res.status(404).json({ message: "Follow not found" });
      }

      const deletedFollow = await prismaClient.follows.delete({
        where: {
          followerId_followingId: {
            followerId,
            followingId,
          },
        },
      });

      res.status(200).json({ message: "Unfollowed successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else res.status(500).json({ message: "Invalid Method" });
}
