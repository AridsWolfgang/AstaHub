-- Google OAuth fields on User (schema already declared these; this migration
-- captures the drift so fresh databases match the Prisma schema).
-- googleId links password-less Google accounts; passwordHash becomes
-- nullable for Google-only signups.

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "googleId" TEXT,
ALTER COLUMN "passwordHash" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");
