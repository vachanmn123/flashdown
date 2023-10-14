import authOptions from "@/lib/auth/authOptions";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

/**
 *
 * @param {import("next/server").NextRequest} req
 */
export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });
  const info = await req.json();
  const card = await prisma.card.create({
    data: {
      question: info.question,
      answer: info.answer,
      userId: user.id,
    },
  });
  return NextResponse.json({ message: "Success!" }, { status: 200 });
}
