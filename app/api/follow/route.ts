import prismaClient from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { followerId, followingId } = body;

    if (!followerId || !followingId) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Check if the follower and following users exist
    const [follower, following] = await Promise.all([
      prismaClient.user.findUnique({ where: { id: followerId } }),
      prismaClient.user.findUnique({ where: { id: followingId } }),
    ]);

    if (!follower || !following) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check if the follow relationship already exists
    const existingFollow = await prismaClient.follows.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });

    if (existingFollow) {
      return NextResponse.json({ message: "Already following this user" }, { status: 400 });
    }

    // Add new follower
    const newFollower = await prismaClient.follows.create({
      data: {
        follower: {
          connect: {
            id: followerId,
          },
        },
        following: {
          connect: {
            id: followingId,
          },
        },
      },
    });

    return NextResponse.json(newFollower, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  } finally {
    await prismaClient.$disconnect();
  }
}

export async function OPTIONS() {
  return NextResponse.json({ message: "OK" }, { status: 200 }); // Preflight handling for CORS
}
