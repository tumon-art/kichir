// export async function GET(request: Request) {
//   return new Response('Hello, Next.js!')
// }

import prismaClient from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // @ts-ignore
  console.log(request.body.email);

  return new Response("HELO");
  try {
    const res = await prismaClient.user.findUnique({
      where: {
        email: "tumonkhn@gmail.com",
      },
    });

    return NextResponse.json(res);
  } catch (err) {
    return NextResponse.json(err);
  }
}
