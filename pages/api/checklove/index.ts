import prismaClient from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
// get user info by email

interface ExtendedReq extends NextApiRequest {
  query: {
    kichirId: string;
    userId: string;
  };
}

const handler = async (req: ExtendedReq, res: NextApiResponse) => {
  console.log(req.body);
  const { kichirId, userId } = req.query;

  const kichir = await prismaClient.love.findFirst({
    where: { userId: userId, kichirId: Number(kichirId) },
  });
  if (kichir) {
    res.status(200).json({ isLiked: true });
  } else {
    res.status(404).json({ isLiked: false });
  }
};
export default handler;
