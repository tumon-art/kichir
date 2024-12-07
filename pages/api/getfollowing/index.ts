import { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 const session = await getServerSession(req, res, authOptions)

  if (session) {
    try {
      const user = await prismaClient.user.findUnique({
        where: { id: session?.user?.id },
        include: {
          following: {
            include: {
              following: true,
            },
          },
        },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const following = user.following.map(({ following }) => following);

      res.status(200).json([...following]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else res.status(500).json({ message: "NextAuth Session Not Found" });
}
