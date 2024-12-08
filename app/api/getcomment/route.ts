import prismaClient from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      const allComments = await prismaClient.comment.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          kichirId: Number(id),
        },
        include: {
          author: {
            select: {
              name: true,
              uname: true,
              image: true,
            },
          },
        },
      });

      return NextResponse.json(allComments, { status: 200 });
    } else {
      return NextResponse.json({ message: "No Comment Found" }, { status: 404 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
