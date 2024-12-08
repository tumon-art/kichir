import prismaClient from "@/lib/prisma";
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

// Define the handler for the POST request
export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { kichirId, commentText } = await req.json(); // Parse the JSON body

    // Fetch the user by ID
    const user = await prismaClient.user.findUnique({
      where: {
        id: session.user?.id,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Create a new comment
    const comment = await prismaClient.comment.create({
      data: {
        body: commentText,
        authorId: String(user.id),
        kichirId: Number(kichirId),
      },
    });

    return NextResponse.json(comment, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
