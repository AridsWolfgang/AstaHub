import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isReportTargetType, REPORT_REASON_MAX, canModerate } from "@/lib/community";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!canModerate(session?.user?.email ?? null, process.env.MODERATOR_EMAILS ?? "")) {
    return NextResponse.json({ error: "Moderator access required." }, { status: 403 });
  }

  const reports = await prisma.report.findMany({
    where: { status: "open" },
    orderBy: { createdAt: "desc" },
    take: 100,
    include: { reporter: { select: { id: true, name: true, image: true } } },
  });

  return NextResponse.json({
    reports: reports.map((r) => ({
      id: r.id,
      targetType: r.targetType,
      targetId: r.targetId,
      reason: r.reason,
      status: r.status,
      createdAt: r.createdAt.toISOString(),
      reporter: { id: r.reporter.id, name: r.reporter.name, image: r.reporter.image },
    })),
  });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }
  let body: { targetType?: unknown; targetId?: unknown; reason?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  const targetType = body.targetType;
  const targetId = typeof body.targetId === "string" ? body.targetId : "";
  const reason = typeof body.reason === "string" ? body.reason.trim() : "";

  if (!isReportTargetType(targetType)) {
    return NextResponse.json({ error: "Invalid report target type." }, { status: 400 });
  }
  if (!targetId) return NextResponse.json({ error: "Missing target id." }, { status: 400 });
  if (!reason || reason.length > REPORT_REASON_MAX) {
    return NextResponse.json({ error: `Reason must be 1–${REPORT_REASON_MAX} characters.` }, { status: 400 });
  }

  const report = await prisma.report.create({
    data: { reporterId: session.user.id, targetType, targetId, reason },
    select: { id: true },
  });

  return NextResponse.json({ report: { id: report.id } }, { status: 201 });
}