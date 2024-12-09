import prismaClient from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");

  if (!page || !limit) {
    return NextResponse.json({ error: "Page and limit are required parameters" }, { status: 400 });
  }

  try {
    const kichirs = await prismaClient.kichir.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: Number(limit),
      skip: (Number(page) - 1) * Number(limit),
      include: {
        author: {
          select: {
            name: true,
            uname: true,
            image: true,
          },
        },
        loves: true,
        comments: true,
      },
    });

    return NextResponse.json(kichirs, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch kichirs" }, { status: 500 });
  }
}
