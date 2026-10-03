import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/lib/auth-client";
import { SessionProvider as StoreHydrator } from "@/components/SessionProvider";

import Protected from "@/components/Protected";
import ErrorBoundary from "@/components/ErrorBoundary";

// Route-split: every page loads on demand, so the first paint (and every
// dev-server reload) only pulls the shell + the current route.
const HomePage = lazy(() => import("@/pages/HomePage"));
const UserHomePage = lazy(() => import("@/pages/UserHomePage"));
const TracksPage = lazy(() => import("@/pages/TracksPage"));
const TrackDetailPage = lazy(() => import("@/pages/TrackDetailPage"));
const CurriculumPage = lazy(() => import("@/pages/CurriculumPage"));
const PlaygroundPage = lazy(() => import("@/pages/PlaygroundPage"));
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const SettingsPage = lazy(() => import("@/pages/SettingsPage"));
const SigninPage = lazy(() => import("@/pages/SigninPage"));
const LeaderboardPage = lazy(() => import("@/pages/LeaderboardPage"));
const AchievementsPage = lazy(() => import("@/pages/AchievementsPage"));
const CertificatesPage = lazy(() => import("@/pages/CertificatesPage"));
const CertificateVerifyEntryPage = lazy(() => import("@/pages/CertificateVerifyEntryPage"));
const CertificateVerifyPage = lazy(() => import("@/pages/CertificateVerifyPage"));
const CommunityPage = lazy(() => import("@/pages/CommunityPage"));
const FeedPage = lazy(() => import("@/pages/FeedPage"));
const FeedDetailPage = lazy(() => import("@/pages/FeedDetailPage"));
const QuestionsPage = lazy(() => import("@/pages/QuestionsPage"));
const QuestionDetailPage = lazy(() => import("@/pages/QuestionDetailPage"));
const GroupsPage = lazy(() => import("@/pages/GroupsPage"));
const GroupDetailPage = lazy(() => import("@/pages/GroupDetailPage"));
const ModerationPage = lazy(() => import("@/pages/ModerationPage"));
const LivePage = lazy(() => import("@/pages/LivePage"));
const LiveDetailPage = lazy(() => import("@/pages/LiveDetailPage"));
const LiveRoomPage = lazy(() => import("@/pages/LiveRoomPage"));
const LessonCPage = lazy(() => import("@/pages/lessons/LessonCPage"));
const LessonPythonPage = lazy(() => import("@/pages/lessons/LessonPythonPage"));
const LessonCppPage = lazy(() => import("@/pages/lessons/LessonCppPage"));
const LessonJsPage = lazy(() => import("@/pages/lessons/LessonJsPage"));
const LessonSqlPage = lazy(() => import("@/pages/lessons/LessonSqlPage"));
const LessonBashPage = lazy(() => import("@/pages/lessons/LessonBashPage"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function RouteLoading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-gray-500">
        Loading…
      </p>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <StoreHydrator>
        <ErrorBoundary>
          <div className="min-h-screen bg-black">
            <Navbar />
            <main className="pt-16">
              <Suspense fallback={<RouteLoading />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/home" element={<Protected><UserHomePage /></Protected>} />
                  <Route path="/tracks" element={<TracksPage />} />
                  <Route path="/tracks/:slug" element={<TrackDetailPage />} />
                  <Route path="/curriculum" element={<CurriculumPage />} />
                  <Route path="/playground" element={<PlaygroundPage />} />
                  <Route path="/dashboard" element={<Protected><DashboardPage /></Protected>} />
                  <Route path="/profile" element={<Protected><ProfilePage /></Protected>} />
                  <Route path="/settings" element={<Protected><SettingsPage /></Protected>} />
                  <Route path="/signin" element={<SigninPage />} />
                  <Route path="/leaderboard" element={<LeaderboardPage />} />
                  <Route path="/achievements" element={<Protected><AchievementsPage /></Protected>} />
                  <Route path="/certificates" element={<Protected><CertificatesPage /></Protected>} />
                  <Route path="/certificates/verify" element={<CertificateVerifyEntryPage />} />
                  <Route path="/certificates/:id/verify" element={<CertificateVerifyPage />} />
                  <Route path="/community" element={<CommunityPage />} />
                  <Route path="/community/feed" element={<FeedPage />} />
                  <Route path="/community/feed/:id" element={<FeedDetailPage />} />
                  <Route path="/community/questions" element={<QuestionsPage />} />
                  <Route path="/community/questions/:id" element={<QuestionDetailPage />} />
                  <Route path="/community/groups" element={<GroupsPage />} />
                  <Route path="/community/groups/:slug" element={<Protected><GroupDetailPage /></Protected>} />
                  <Route path="/community/moderation" element={<Protected><ModerationPage /></Protected>} />
                  <Route path="/live" element={<LivePage />} />
                  <Route path="/live/:slug" element={<LiveDetailPage />} />
                  <Route path="/live/:slug/room" element={<LiveRoomPage />} />
                  <Route path="/lesson/:day" element={<Protected><LessonCPage /></Protected>} />
                  <Route path="/lesson/python/:day" element={<Protected><LessonPythonPage /></Protected>} />
                  <Route path="/lesson/cpp/:day" element={<Protected><LessonCppPage /></Protected>} />
                  <Route path="/lesson/js/:day" element={<Protected><LessonJsPage /></Protected>} />
                  <Route path="/lesson/sql/:day" element={<Protected><LessonSqlPage /></Protected>} />
                  <Route path="/lesson/bash/:day" element={<Protected><LessonBashPage /></Protected>} />
                  {/* legacy redirects */}
                  <Route path="/lesson/rust/:day" element={<Navigate to="/tracks" replace />} />
                  <Route path="/lesson/:track/:day" element={<Navigate to="/" replace />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </ErrorBoundary>
      </StoreHydrator>
    </AuthProvider>
  );
}
