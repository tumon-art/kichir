import prismaClient from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

// update username by email
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    try {
      const updateUser = await prismaClient.user.update({
        where: {
          email: req.body.email,
        },
        data: {
          uname: req.body.uame,
        },
      });

      res.status(200).send("username updated successfully");
    } catch (err) {
      return res.status(404).send({ msg: err });
    }
  }
};

export default handler;
