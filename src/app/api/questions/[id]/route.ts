import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ?? null;

  const question = await prisma.question.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true, image: true } },
      comments: {
        orderBy: { createdAt: "asc" },
        include: { user: { select: { id: true, name: true, image: true } } },
      },
      answers: {
        orderBy: [{ accepted: "desc" }, { createdAt: "asc" }],
        include: {
          user: { select: { id: true, name: true, image: true } },
          votes: { select: { userId: true, value: true } },
          comments: {
            orderBy: { createdAt: "asc" },
            include: { user: { select: { id: true, name: true, image: true } } },
          },
        },
      },
    },
  });
  if (!question) return NextResponse.json({ error: "Question not found." }, { status: 404 });

  return NextResponse.json({
    question: {
      id: question.id,
      title: question.title,
      body: question.body,
      evidence: question.evidence,
      status: question.status,
      tags: question.tags,
      createdAt: question.createdAt.toISOString(),
      author: { id: question.user.id, name: question.user.name, image: question.user.image },
      isAuthor: userId === question.userId,
      comments: question.comments.map((c) => ({
        id: c.id,
        body: c.body,
        createdAt: c.createdAt.toISOString(),
        author: { id: c.user.id, name: c.user.name, image: c.user.image },
      })),
      answers: question.answers.map((a) => ({
        id: a.id,
        body: a.body,
        accepted: a.accepted,
        createdAt: a.createdAt.toISOString(),
        author: { id: a.user.id, name: a.user.name, image: a.user.image },
        score: a.votes.reduce((s, v) => s + v.value, 0),
        myVote: userId ? (a.votes.find((v) => v.userId === userId)?.value ?? null) : null,
        comments: a.comments.map((c) => ({
          id: c.id,
          body: c.body,
          createdAt: c.createdAt.toISOString(),
          author: { id: c.user.id, name: c.user.name, image: c.user.image },
        })),
      })),
    },
  });
}