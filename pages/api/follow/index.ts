import prismaClient from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

interface ExtendedReq extends NextApiRequest {
  body: {
    followerId: string;
    followingId: string;
  };
}

const handlerFollow = async (req: ExtendedReq, res: NextApiResponse) => {
  const { followerId, followingId } = req.body;
if(req.method == 'POST') {

  try {
    // Check if the follower and following users exist
    const [follower, following] = await Promise.all([
      prismaClient.user.findUnique({ where: { id: followerId } }),
      prismaClient.user.findUnique({ where: { id: followingId } }),
    ]);

    if (!follower || !following) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Check if the follow relationship already exists
    const existingFollow = await prismaClient.follows.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });

    if (existingFollow) {
      // If the follow relationship already exists, return an error
      res.status(400).json({ message: "Already following this User" });
      return;
    }

    // ADD NEW FOLLOWER
    const newFollower = await prismaClient.follows.create({
      data: {
        follower: {
          connect: {
            id: followerId,
          },
        },
        following: {
          connect: {
            id: followingId,
          },
        },
      },
    });

    res.status(201).json(newFollower);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    await prismaClient.$disconnect();
  }
} else res.status(500).json({ message: "Invalid Method" });
};

export default handlerFollow;
