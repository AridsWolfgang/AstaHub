import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getTierByLevel, type ProficiencyLevel } from "@/lib/types";
import ProfileClient from "@/components/ProfileClient";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/signin");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { certificates: { orderBy: { issuedAt: "asc" } } },
  });
  if (!user) redirect("/signin");

  const tier = getTierByLevel(user.level as ProficiencyLevel);

  return <ProfileClient user={user} tier={tier} />;
}
