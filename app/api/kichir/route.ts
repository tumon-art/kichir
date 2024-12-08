import prismaClient from "@/lib/prisma";
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { kichir, img } = await req.json(); // Parse the JSON body

    // Fetch the user by ID
    const user = await prismaClient.user.findUnique({
      where: {
        id: session.user?.id,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Create a new kichir
    const newKichir = await prismaClient.kichir.create({
      data: {
        body: kichir,
        img: img,
        authorId: String(user.id),
      },
    });

    return NextResponse.json(newKichir, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
