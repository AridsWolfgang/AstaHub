import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { nextVoteValue } from "@/lib/community";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string; aid: string }> }
) {
  const { aid } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }
  let body: { value?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  const incoming = Number(body.value);
  if (incoming !== 1 && incoming !== -1) {
    return NextResponse.json({ error: "Vote value must be 1 or -1." }, { status: 400 });
  }

  const answer = await prisma.answer.findUnique({ where: { id: aid }, select: { id: true } });
  if (!answer) return NextResponse.json({ error: "Answer not found." }, { status: 404 });

  const existing = await prisma.vote.findUnique({
    where: { userId_answerId: { userId: session.user.id, answerId: aid } },
  });
  const next = nextVoteValue(existing?.value ?? null, incoming);

  if (next === null) {
    if (existing) await prisma.vote.delete({ where: { id: existing.id } });
  } else if (existing) {
    await prisma.vote.update({ where: { id: existing.id }, data: { value: next } });
  } else {
    await prisma.vote.create({ data: { userId: session.user.id, answerId: aid, value: next } });
  }

  const votes = await prisma.vote.findMany({ where: { answerId: aid }, select: { value: true } });
  return NextResponse.json({ score: votes.reduce((s, v) => s + v.value, 0), myVote: next });
}