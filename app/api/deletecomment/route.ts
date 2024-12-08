import prismaClient from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "No Comment Found!" }, { status: 404 });
  }

  try {
    await prismaClient.comment.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Comment Deleted Successfully!" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({ message: "OK" }, { status: 200 }); // Handle preflight requests if needed
}
