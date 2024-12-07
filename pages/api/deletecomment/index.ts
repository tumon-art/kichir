import prismaClient from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

interface ExtendedReq extends NextApiRequest {
  query: {
    id: string;
  };
}

export default async function handler(req: ExtendedReq, res: NextApiResponse) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id } = req.query;

  if (id) {
    try {
      await prismaClient.comment.delete({
        where: { id: id },
      });
      res.status(204).end();
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Something went wrong" });
    }

    return res.status(200).json("Comment Deleted Successfully!");
  } else res.status(404).json("No Comment Found!");
}
