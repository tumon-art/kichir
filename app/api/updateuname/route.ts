import prismaClient from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, uname } = body;

    // Validate the required fields
    if (!email || !uname) {
      return NextResponse.json(
        { message: "Email and username are required" },
        { status: 400 }
      );
    }

    // Update the user's username by email
    await prismaClient.user.update({
      where: {
        email: email,
      },
      data: {
        uname: uname,
      },
    });

    return NextResponse.json(
      { message: "Username updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error updating username", error: error.message },
      { status: 500 }
    );
  }
}
