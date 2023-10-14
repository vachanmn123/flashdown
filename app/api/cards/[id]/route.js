import authOptions from "@/lib/auth/authOptions";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

/**
 *
 * @param {import("next/server").NextRequest} req
 * @param {{params: {id: String}}} param1
 */
export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ status: 401 });
  }
  const { id } = params;
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  const card = await prisma.card.findUnique({ where: { id } });
  if (card.userId !== user.id) {
    return NextResponse.json({ status: 401 });
  }
  await prisma.card.delete({ where: { id } });
  return NextResponse.json({ status: 200 });
}
