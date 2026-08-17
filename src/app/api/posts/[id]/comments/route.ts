import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { COMMENT_BODY_MAX } from "@/lib/community";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id },
    select: { id: true },
  });
  if (!post) return NextResponse.json({ error: "Post not found." }, { status: 404 });

  const comments = await prisma.comment.findMany({
    where: { postId: id },
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
  const commentBody = typeof body.body === "string" ? body.body.trim() : "";
  if (!commentBody || commentBody.length > COMMENT_BODY_MAX) {
    return NextResponse.json({ error: `Comment must be 1–${COMMENT_BODY_MAX} characters.` }, { status: 400 });
  }

  const post = await prisma.post.findUnique({ where: { id }, select: { id: true } });
  if (!post) return NextResponse.json({ error: "Post not found." }, { status: 404 });

  const comment = await prisma.comment.create({
    data: { userId: session.user.id, postId: id, body: commentBody },
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