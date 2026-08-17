import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const session = await getServerSession(authOptions);

  const group = await prisma.group.findUnique({
    where: { slug },
    include: {
      owner: { select: { id: true, name: true, image: true } },
      members: { include: { user: { select: { id: true, name: true, image: true } } } },
    },
  });
  if (!group) return NextResponse.json({ error: "Group not found." }, { status: 404 });

  const isMember = session?.user?.id ? group.members.some((m) => m.userId === session.user!.id) : false;
  const myRole = session?.user?.id ? group.members.find((m) => m.userId === session.user!.id)?.role ?? null : null;

  return NextResponse.json({
    group: {
      id: group.id,
      slug: group.slug,
      name: group.name,
      description: group.description,
      createdAt: group.createdAt.toISOString(),
      owner: { id: group.owner.id, name: group.owner.name, image: group.owner.image },
      isMember,
      myRole,
      members: group.members.map((m) => ({
        id: m.user.id,
        name: m.user.name,
        image: m.user.image,
        role: m.role,
      })),
    },
  });
}

export async function PATCH(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }
  let body: { action?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  const action = body.action;
  if (action !== "join" && action !== "leave") {
    return NextResponse.json({ error: "Action must be 'join' or 'leave'." }, { status: 400 });
  }

  const group = await prisma.group.findUnique({ where: { slug }, select: { id: true } });
  if (!group) return NextResponse.json({ error: "Group not found." }, { status: 404 });

  const existing = await prisma.groupMember.findUnique({
    where: { groupId_userId: { groupId: group.id, userId: session.user.id } },
  });

  if (action === "join") {
    if (!existing) {
      await prisma.groupMember.create({
        data: { groupId: group.id, userId: session.user.id, role: "member" },
      });
    }
  } else if (existing) {
    await prisma.groupMember.delete({ where: { id: existing.id } });
  }

  return NextResponse.json({ ok: true, member: action === "join" });
}