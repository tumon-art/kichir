import prismaClient from "@/lib/prisma";
import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
// get user info by email

interface ExtendedReq extends NextApiRequest {
  body: User;
}
const handler = async (req: ExtendedReq, res: NextApiResponse) => {
  if (req.body.email)
    if (req.method === "POST") {
      try {
        const data = await prismaClient.user.findUnique({
          where: {
            email: req.body.email,
          },
        });

        res.status(200).send({ ...data });
      } catch (err) {
        return res.status(404).send({ msg: err });
      }
    }
  if (req.body.email) {
    if (req.method === "PUT") {
      try {
        const updateUser = await prismaClient.user.update({
          where: {
            email: req.body.email,
          },
          data: {
            name: req.body.name,
            uname: req.body.uname,
          },
        });

        res.status(200).json(`${req.body.uname} updated successfully`);
      } catch (err) {
        return res.status(404).send({ msg: err });
      }
    }
  } else return res.status(404).json({ msg: "Please Send Email" });
};

export default handler;
