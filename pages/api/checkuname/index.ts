import prismaClient from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
// check uname by uname

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const data = await prismaClient.user.findMany({
        where: {
          uname: req.body.uname,
        },
      });

      res.status(200).send({ ...data });
    } catch (err) {
      return res.status(404).send({ msg: err });
    }
  }
};

export default handler;
