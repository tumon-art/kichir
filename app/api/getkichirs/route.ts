import prismaClient from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const kichirs = await prismaClient.kichir.findMany({
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
    kichirs.reverse();
    return NextResponse.json(kichirs);
  } catch (err) {
    return NextResponse.json(err, { status: 401 });
  }
}
