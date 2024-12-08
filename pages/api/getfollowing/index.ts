import { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "../../../lib/prisma";
import { auth } from "@/auth"


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await auth(req, res)
  console.log(session?.user)
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


      console.log(user, 'user')
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
