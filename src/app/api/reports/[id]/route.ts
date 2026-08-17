import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { canModerate, isReportStatus, reportStatusTransition } from "@/lib/community";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!canModerate(session?.user?.email ?? null, process.env.MODERATOR_EMAILS ?? "")) {
    return NextResponse.json({ error: "Moderator access required." }, { status: 403 });
  }
  let body: { status?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  const next = body.status;
  if (!isReportStatus(next)) {
    return NextResponse.json({ error: "Status must be 'actioned' or 'dismissed'." }, { status: 400 });
  }

  const report = await prisma.report.findUnique({ where: { id }, select: { id: true, status: true } });
  if (!report) return NextResponse.json({ error: "Report not found." }, { status: 404 });

  const status = reportStatusTransition(report.status as "open" | "actioned" | "dismissed", next);
  if (status !== report.status) {
    await prisma.report.update({ where: { id }, data: { status, actionedAt: new Date() } });
  }

  return NextResponse.json({ ok: true, status });
}