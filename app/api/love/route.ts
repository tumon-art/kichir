import prismaClient from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { kichirId, userId } = await req.json(); // Parse the JSON body

    if (!kichirId || !userId) {
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }

    // Check if the user has already liked the post
    const existingLove = await prismaClient.love.findFirst({
      where: {
        kichirId: Number(kichirId),
        userId: String(userId),
      },
    });

    if (existingLove) {
      // If the user has already liked the post, unlike it
      await prismaClient.love.delete({
        where: {
          id: existingLove.id,
        },
      });

      return NextResponse.json({ isLiked: false }, { status: 200 });
    } else {
      // If the user hasn't liked the post yet, like it
      await prismaClient.love.create({
        data: {
          kichirId: Number(kichirId),
          userId: String(userId),
        },
      });

      return NextResponse.json({ isLiked: true }, { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({ message: "OK" }, { status: 200 }); // Handle preflight requests
}
