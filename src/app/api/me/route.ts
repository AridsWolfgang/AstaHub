import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { certificates: { orderBy: { issuedAt: "asc" } } },
  });
  if (!user) return NextResponse.json({ error: "User not found." }, { status: 404 });
  return NextResponse.json({ user });
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }
  try {
    const { name, bio } = await req.json();
    const data: Record<string, string | null> = {};
    if (typeof name === "string" && name.trim()) data.name = name.trim();
    if (typeof bio === "string") data.bio = bio.trim() || null;
    const user = await prisma.user.update({
      where: { id: session.user.id },
      data,
      select: { id: true, name: true, email: true, image: true, bio: true },
    });
    return NextResponse.json({ user });
  } catch (err) {
    console.error("profile update error", err);
    return NextResponse.json({ error: "Failed to update profile." }, { status: 500 });
  }
}
