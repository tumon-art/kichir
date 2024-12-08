import prismaClient from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Extract query parameters
    const { searchParams } = new URL(req.url);
    const kichirId = searchParams.get("kichirId");
    const userId = searchParams.get("userId");

    // Validate input
    if (!kichirId || !userId) {
      return NextResponse.json(
        { message: "kichirId and userId are required" },
        { status: 400 }
      );
    }

    // Query the database
    const kichir = await prismaClient.love.findFirst({
      where: { userId: userId, kichirId: Number(kichirId) },
    });

    // Return response
    if (kichir) {
      return NextResponse.json({ isLiked: true }, { status: 200 });
    } else {
      return NextResponse.json({ isLiked: false }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({ message: "OK" }, { status: 200 }); // Handle preflight requests
}
