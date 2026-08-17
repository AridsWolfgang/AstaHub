import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { groupSlugify, GROUP_NAME_MAX, GROUP_DESC_MAX } from "@/lib/community";

export async function GET() {
  const groups = await prisma.group.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      owner: { select: { name: true, image: true } },
      _count: { select: { members: true } },
    },
  });

  return NextResponse.json({
    groups: groups.map((g) => ({
      id: g.id,
      slug: g.slug,
      name: g.name,
      description: g.description,
      createdAt: g.createdAt.toISOString(),
      owner: { name: g.owner.name, image: g.owner.image },
      memberCount: g._count.members,
    })),
  });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }
  let body: { name?: unknown; description?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const description = typeof body.description === "string" ? body.description.trim() : "";

  if (!name || name.length > GROUP_NAME_MAX) {
    return NextResponse.json({ error: `Group name must be 1–${GROUP_NAME_MAX} characters.` }, { status: 400 });
  }
  if (description.length > GROUP_DESC_MAX) {
    return NextResponse.json({ error: `Description must be at most ${GROUP_DESC_MAX} characters.` }, { status: 400 });
  }

  const slug = groupSlugify(name);
  const existing = await prisma.group.findUnique({ where: { slug } });
  if (existing) {
    return NextResponse.json({ error: "A group with this name already exists." }, { status: 409 });
  }

  const group = await prisma.group.create({
    data: {
      slug,
      name,
      description,
      ownerId: session.user.id,
      members: { create: { userId: session.user.id, role: "owner" } },
    },
    select: { slug: true },
  });

  return NextResponse.json({ group: { slug: group.slug } }, { status: 201 });
}