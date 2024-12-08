import prismaClient from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      // Fetch a single Kichir by ID
      const kichir = await prismaClient.kichir.findUnique({
        where: { id: Number(id) },
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

      if (!kichir) {
        return NextResponse.json({ message: "Kichir not found" }, { status: 404 });
      }

      return NextResponse.json(kichir, { status: 200 });
    } else {
      // Fetch all Kichirs
      const kichirs = await prismaClient.kichir.findMany({
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

      kichirs.reverse(); // Reverse the list

      return NextResponse.json(kichirs, { status: 200 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
