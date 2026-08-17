import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { FEED_DEFAULT_LIMIT, FEED_MAX_LIMIT, POST_TITLE_MAX, POST_BODY_MAX, QUESTION_TITLE_MAX } from "@/lib/community";

function parseQuestionQuery(url: string): { status: string; limit: number } {
  const params = new URL(url).searchParams;
  const status = params.get("status");
  const parsed = parseInt(params.get("limit") ?? String(FEED_DEFAULT_LIMIT), 10);
  const limit = Number.isFinite(parsed)
    ? Math.min(Math.max(parsed, 1), FEED_MAX_LIMIT)
    : FEED_DEFAULT_LIMIT;
  return { status: status === "answered" || status === "closed" ? status : "open", limit };
}

export async function GET(req: Request) {
  const { status, limit } = parseQuestionQuery(req.url);
  const questions = await prisma.question.findMany({
    where: { status },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: limit,
    include: {
      user: { select: { id: true, name: true, image: true } },
      _count: { select: { answers: true, comments: true } },
    },
  });

  return NextResponse.json({
    questions: questions.map((q) => ({
      id: q.id,
      title: q.title,
      body: q.body,
      status: q.status,
      tags: q.tags,
      createdAt: q.createdAt.toISOString(),
      author: { id: q.user.id, name: q.user.name, image: q.user.image },
      answerCount: q._count.answers,
      commentCount: q._count.comments,
    })),
  });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }
  let body: { title?: unknown; body?: unknown; evidence?: unknown; tags?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const questionBody = typeof body.body === "string" ? body.body.trim() : "";
  const evidence = typeof body.evidence === "string" ? body.evidence.trim().slice(0, 2000) : "";
  const tags = Array.isArray(body.tags)
    ? body.tags
        .filter((t): t is string => typeof t === "string")
        .map((t) => t.trim().toLowerCase())
        .filter((t) => t && t.length <= 20)
        .slice(0, 5)
    : [];

  if (title.length < 8 || title.length > QUESTION_TITLE_MAX) {
    return NextResponse.json({ error: `Question title must be 8–${QUESTION_TITLE_MAX} characters.` }, { status: 400 });
  }
  if (!questionBody || questionBody.length > POST_BODY_MAX) {
    return NextResponse.json({ error: `Question body must be 1–${POST_BODY_MAX} characters.` }, { status: 400 });
  }
  if (!evidence) {
    return NextResponse.json(
      { error: "Show your effort — describe what you tried before asking (evidence of effort)." },
      { status: 400 }
    );
  }

  const question = await prisma.question.create({
    data: { userId: session.user.id, title, body: questionBody, evidence, tags },
    select: { id: true },
  });

  await prisma.user.update({
    where: { id: session.user.id },
    data: { reputation: { increment: 5 } },
  });

  return NextResponse.json({ question: { id: question.id } }, { status: 201 });
}