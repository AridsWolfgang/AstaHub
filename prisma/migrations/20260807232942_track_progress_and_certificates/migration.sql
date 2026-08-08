-- AlterTable
ALTER TABLE "Certificate" ADD COLUMN     "track" TEXT NOT NULL DEFAULT 'c';

-- CreateTable
CREATE TABLE "UserTrackProgress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "track" TEXT NOT NULL,
    "currentDay" INTEGER NOT NULL DEFAULT 1,
    "totalXp" INTEGER NOT NULL DEFAULT 0,
    "level" TEXT NOT NULL DEFAULT 'initiate',
    "streak" INTEGER NOT NULL DEFAULT 0,
    "lastActiveDate" TEXT,
    "completedDays" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "completedExercises" JSONB NOT NULL DEFAULT '{}',
    "completedAssignments" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "notes" JSONB NOT NULL DEFAULT '{}',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserTrackProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserTrackProgress_userId_idx" ON "UserTrackProgress"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserTrackProgress_userId_track_key" ON "UserTrackProgress"("userId", "track");

-- AddForeignKey
ALTER TABLE "UserTrackProgress" ADD CONSTRAINT "UserTrackProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
