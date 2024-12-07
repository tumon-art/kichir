import prismaClient from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id } = req.query;

  try {
    await prismaClient.kichir.delete({
      where: { id: Number(id) },
    });
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}
