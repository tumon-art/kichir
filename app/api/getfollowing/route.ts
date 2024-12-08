import prismaClient from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET() {
  try {
    // Retrieve session using your custom auth function
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { message: "NextAuth Session Not Found" },
        { status: 401 }
      );
    }

    // Fetch user and their following list
    const user = await prismaClient.user.findUnique({
      where: { id: session?.user?.id },
      include: {
        following: {
          include: {
            following: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Extract the list of users being followed
    const following = user.following.map(({ following }) => following);

    return NextResponse.json(following, { status: 200 });
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
