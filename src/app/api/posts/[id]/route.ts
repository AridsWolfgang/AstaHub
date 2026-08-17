import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { canModerate } from "@/lib/community";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ?? null;

  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true, image: true } },
      votes: { select: { userId: true, value: true } },
      comments: {
        orderBy: { createdAt: "asc" },
        include: { user: { select: { id: true, name: true, image: true } } },
      },
    },
  });
  if (!post || !post.published) return NextResponse.json({ error: "Post not found." }, { status: 404 });

  const isMod = canModerate(session?.user?.email ?? null, process.env.MODERATOR_EMAILS ?? "");
  if (!post.published && post.userId !== session?.user?.id && !isMod) {
    return NextResponse.json({ error: "Post not found." }, { status: 404 });
  }

  return NextResponse.json({
    post: {
      id: post.id,
      title: post.title,
      body: post.body,
      createdAt: post.createdAt.toISOString(),
      author: { id: post.user.id, name: post.user.name, image: post.user.image },
      score: post.votes.reduce((s, v) => s + v.value, 0),
      myVote: userId ? (post.votes.find((v) => v.userId === userId)?.value ?? null) : null,
      canDelete: post.userId === userId || isMod,
      comments: post.comments.map((c) => ({
        id: c.id,
        body: c.body,
        createdAt: c.createdAt.toISOString(),
        author: { id: c.user.id, name: c.user.name, image: c.user.image },
      })),
    },
  });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }
  const post = await prisma.post.findUnique({ where: { id }, select: { id: true, userId: true } });
  if (!post) return NextResponse.json({ error: "Post not found." }, { status: 404 });

  const isMod = canModerate(session.user.email ?? null, process.env.MODERATOR_EMAILS ?? "");
  if (post.userId !== session.user.id && !isMod) {
    return NextResponse.json({ error: "You can only delete your own posts." }, { status: 403 });
  }

  await prisma.post.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}