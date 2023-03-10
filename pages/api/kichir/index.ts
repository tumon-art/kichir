import prismaClient from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
// get user info by email

interface ExtendedReq extends NextApiRequest {
  body: {
    kichir: string;
  };
}

const handler = async (req: ExtendedReq, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (session) console.log(session);

  if (req.method === "POST") {
    try {
      const user = await prismaClient.user.findUnique({
        where: {
          id: session?.user?.id,
        },
      });

      if (user) {
        const kichir = await prismaClient.kichir.create({
          data: {
            body: req.body.kichir,
            authorId: String(user.id),
          },
        });
        res.status(200).send({ ...kichir });
      }
    } catch (err) {
      return res.status(404).send(err);
    }
  }
};

export default handler;
