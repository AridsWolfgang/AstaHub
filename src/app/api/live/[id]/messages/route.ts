import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { MESSAGE_BODY_MAX } from "@/lib/community";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const url = new URL(req.url);
  const after = url.searchParams.get("after");
  const parsed = parseInt(url.searchParams.get("limit") ?? "100", 10);
  const limit = Number.isFinite(parsed) ? Math.min(Math.max(parsed, 1), 300) : 100;

  const event = await prisma.liveEvent.findUnique({ where: { id }, select: { id: true } });
  if (!event) return NextResponse.json({ error: "Event not found." }, { status: 404 });

  const messages = await prisma.liveEventMessage.findMany({
    where: { eventId: id, ...(after ? { createdAt: { gt: new Date(after) } } : {}) },
    orderBy: { createdAt: "asc" },
    take: limit,
    include: { user: { select: { id: true, name: true, image: true } } },
  });

  return NextResponse.json({
    messages: messages.map((m) => ({
      id: m.id,
      body: m.body,
      createdAt: m.createdAt.toISOString(),
      author: { id: m.user.id, name: m.user.name, image: m.user.image },
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
  const messageBody = typeof body.body === "string" ? body.body.trim() : "";
  if (!messageBody || messageBody.length > MESSAGE_BODY_MAX) {
    return NextResponse.json({ error: `Message must be 1–${MESSAGE_BODY_MAX} characters.` }, { status: 400 });
  }

  const event = await prisma.liveEvent.findUnique({ where: { id }, select: { id: true } });
  if (!event) return NextResponse.json({ error: "Event not found." }, { status: 404 });

  const message = await prisma.liveEventMessage.create({
    data: { eventId: id, userId: session.user.id, body: messageBody },
    include: { user: { select: { id: true, name: true, image: true } } },
  });

  return NextResponse.json(
    {
      message: {
        id: message.id,
        body: message.body,
        createdAt: message.createdAt.toISOString(),
        author: { id: message.user.id, name: message.user.name, image: message.user.image },
      },
    },
    { status: 201 }
  );
}