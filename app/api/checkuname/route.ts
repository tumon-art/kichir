import prismaClient from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();

    // Validate input
    if (!body.uname) {
      return NextResponse.json(
        { message: "Username is required" },
        { status: 400 }
      );
    }

    // Query the database
    const data = await prismaClient.user.findMany({
      where: {
        uname: body.uname,
      },
    });

    // Return the data
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({ message: "OK" }, { status: 200 }); // Handle preflight requests
}
