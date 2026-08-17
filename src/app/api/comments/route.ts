import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { COMMENT_BODY_MAX } from "@/lib/community";

const TARGETS = ["post", "question", "answer"] as const;

function targetFilter(targetType: string, targetId: string): Record<string, string> {
  if (targetType === "post") return { postId: targetId };
  if (targetType === "question") return { questionId: targetId };
  return { answerId: targetId };
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const targetType = url.searchParams.get("targetType");
  const targetId = url.searchParams.get("targetId");
  if (!targetType || !(TARGETS as readonly string[]).includes(targetType) || !targetId) {
    return NextResponse.json({ error: "targetType and targetId are required." }, { status: 400 });
  }

  const comments = await prisma.comment.findMany({
    where: targetFilter(targetType, targetId),
    orderBy: { createdAt: "asc" },
    include: { user: { select: { id: true, name: true, image: true } } },
  });

  return NextResponse.json({
    comments: comments.map((c) => ({
      id: c.id,
      body: c.body,
      createdAt: c.createdAt.toISOString(),
      author: { id: c.user.id, name: c.user.name, image: c.user.image },
    })),
  });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }
  let body: { targetType?: unknown; targetId?: unknown; body?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  const targetType = body.targetType;
  const targetId = typeof body.targetId === "string" ? body.targetId : "";
  const commentBody = typeof body.body === "string" ? body.body.trim() : "";
  if (typeof targetType !== "string" || !(TARGETS as readonly string[]).includes(targetType) || !targetId) {
    return NextResponse.json({ error: "targetType and targetId are required." }, { status: 400 });
  }
  if (!commentBody || commentBody.length > COMMENT_BODY_MAX) {
    return NextResponse.json({ error: `Comment must be 1–${COMMENT_BODY_MAX} characters.` }, { status: 400 });
  }

  const comment = await prisma.comment.create({
    data: { userId: session.user.id, body: commentBody, ...targetFilter(targetType, targetId) },
    include: { user: { select: { id: true, name: true, image: true } } },
  });

  return NextResponse.json(
    {
      comment: {
        id: comment.id,
        body: comment.body,
        createdAt: comment.createdAt.toISOString(),
        author: { id: comment.user.id, name: comment.user.name, image: comment.user.image },
      },
    },
    { status: 201 }
  );
}