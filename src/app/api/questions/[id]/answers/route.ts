import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { POST_BODY_MAX } from "@/lib/community";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }
  let body: { body?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  const answerBody = typeof body.body === "string" ? body.body.trim() : "";
  if (!answerBody || answerBody.length > POST_BODY_MAX) {
    return NextResponse.json({ error: `Answer must be 1–${POST_BODY_MAX} characters.` }, { status: 400 });
  }

  const question = await prisma.question.findUnique({ where: { id }, select: { id: true, status: true } });
  if (!question) return NextResponse.json({ error: "Question not found." }, { status: 404 });
  if (question.status === "closed") {
    return NextResponse.json({ error: "This question is closed to new answers." }, { status: 403 });
  }

  const answer = await prisma.answer.create({
    data: { questionId: id, userId: session.user.id, body: answerBody },
    include: { user: { select: { id: true, name: true, image: true } } },
  });

  if (question.status === "open") {
    await prisma.question.update({ where: { id }, data: { status: "answered" } });
  }
  await prisma.user.update({
    where: { id: session.user.id },
    data: { reputation: { increment: 10 } },
  });

  return NextResponse.json(
    {
      answer: {
        id: answer.id,
        body: answer.body,
        accepted: false,
        createdAt: answer.createdAt.toISOString(),
        author: { id: answer.user.id, name: answer.user.name, image: answer.user.image },
        score: 0,
        myVote: null,
        comments: [],
      },
    },
    { status: 201 }
  );
}