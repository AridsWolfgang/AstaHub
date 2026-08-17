import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { parseFeedQuery, POST_TITLE_MIN, POST_TITLE_MAX, POST_BODY_MAX } from "@/lib/community";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ?? null;
  const { before, limit } = parseFeedQuery(req.url);

  const posts = await prisma.post.findMany({
    where: { published: true, ...(before ? { createdAt: { lt: new Date(before) } } : {}) },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: limit + 1,
    include: {
      user: { select: { id: true, name: true, image: true } },
      votes: { select: { userId: true, value: true } },
      _count: { select: { comments: true } },
    },
  });

  const hasMore = posts.length > limit;
  const page = hasMore ? posts.slice(0, limit) : posts;
  const nextBefore = hasMore && page.length > 0 ? page[page.length - 1].createdAt.toISOString() : null;

  const items = page.map((p) => ({
    id: p.id,
    title: p.title,
    body: p.body,
    createdAt: p.createdAt.toISOString(),
    author: { id: p.user.id, name: p.user.name, image: p.user.image },
    score: p.votes.reduce((s, v) => s + v.value, 0),
    myVote: userId ? (p.votes.find((v) => v.userId === userId)?.value ?? null) : null,
    commentCount: p._count.comments,
  }));

  return NextResponse.json({ posts: items, nextBefore });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }
  let body: { title?: unknown; postBody?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const postBody = typeof body.postBody === "string" ? body.postBody.trim() : "";

  if (title.length < POST_TITLE_MIN || title.length > POST_TITLE_MAX) {
    return NextResponse.json({ error: `Title must be ${POST_TITLE_MIN}–${POST_TITLE_MAX} characters.` }, { status: 400 });
  }
  if (!postBody || postBody.length > POST_BODY_MAX) {
    return NextResponse.json({ error: `Body must be 1–${POST_BODY_MAX} characters.` }, { status: 400 });
  }

  const post = await prisma.post.create({
    data: { userId: session.user.id, title, body: postBody },
    select: { id: true },
  });

  await prisma.user.update({
    where: { id: session.user.id },
    data: { reputation: { increment: 5 } },
  });

  return NextResponse.json({ post: { id: post.id } }, { status: 201 });
}