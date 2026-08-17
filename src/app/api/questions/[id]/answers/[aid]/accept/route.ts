import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { answerAcceptGuard } from "@/lib/community";

export async function PATCH(
  _req: Request,
  { params }: { params: Promise<{ id: string; aid: string }> }
) {
  const { id, aid } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const question = await prisma.question.findUnique({
    where: { id },
    select: { userId: true },
  });
  if (!question) return NextResponse.json({ error: "Question not found." }, { status: 404 });

  const answer = await prisma.answer.findUnique({ where: { id: aid }, select: { id: true, accepted: true } });
  if (!answer) return NextResponse.json({ error: "Answer not found." }, { status: 404 });

  if (!answerAcceptGuard({ actorUserId: session.user.id, questionUserId: question.userId, isAccepted: answer.accepted })) {
    return NextResponse.json({ error: "Only the question author can accept an answer, once." }, { status: 403 });
  }

  await prisma.$transaction([
    prisma.answer.update({ where: { id: aid }, data: { accepted: true } }),
    prisma.user.update({
      where: { id: session.user.id },
      data: { reputation: { increment: 15 } },
    }),
  ]);

  return NextResponse.json({ ok: true });
}