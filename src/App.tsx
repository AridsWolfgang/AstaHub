import { Routes, Route, Navigate } from "react-router-dom";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/lib/auth-client";
import { SessionProvider as StoreHydrator } from "@/components/SessionProvider";

// Pages — keep src/app as pages directory (migrated from Next App Router)
import HomePage from "@/app/page";
import TracksPage from "@/app/tracks/page";
import TrackSlugPage from "@/app/tracks/[slug]/page";
import CurriculumPage from "@/app/curriculum/page";
import PlaygroundPage from "@/app/playground/page";
import DashboardPage from "@/app/dashboard/page";
import ProfilePage from "@/app/profile/page";
import SettingsPage from "@/app/settings/page";
import SigninPage from "@/app/signin/page";
import LeaderboardPage from "@/app/leaderboard/page";
import AchievementsPage from "@/app/achievements/page";
import CertificatesPage from "@/app/certificates/page";
import CommunityPage from "@/app/community/page";
import FeedPage from "@/app/community/feed/page";
import FeedDetailPage from "@/app/community/feed/[id]/page";
import QuestionsPage from "@/app/community/questions/page";
import QuestionDetailPage from "@/app/community/questions/[id]/page";
import GroupsPage from "@/app/community/groups/page";
import GroupDetailPage from "@/app/community/groups/[slug]/page";
import ModerationPage from "@/app/community/moderation/page";
import LivePage from "@/app/live/page";
import LiveDetailPage from "@/app/live/[slug]/page";
import LiveRoomPage from "@/app/live/[slug]/room/page";
import LessonCPage from "@/app/lesson/[day]/page";
import LessonPythonPage from "@/app/lesson/python/[day]/page";
import LessonCppPage from "@/app/lesson/cpp/[day]/page";
import LessonJsPage from "@/app/lesson/js/[day]/page";
import LessonRustPage from "@/app/lesson/rust/[day]/page";
import LessonSqlPage from "@/app/lesson/sql/[day]/page";
import LessonBashPage from "@/app/lesson/bash/[day]/page";
import NotFound from "@/app/not-found";
import Protected from "@/components/Protected";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function App() {
  return (
    <AuthProvider>
      <StoreHydrator>
        <ErrorBoundary>
          <div className="min-h-screen bg-black">
            <Navbar />
            <main className="pt-16">
              <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/tracks" element={<TracksPage />} />
              <Route path="/tracks/:slug" element={<TrackSlugPage />} />
              <Route path="/curriculum" element={<CurriculumPage />} />
              <Route path="/playground" element={<PlaygroundPage />} />
              <Route path="/dashboard" element={<Protected><DashboardPage /></Protected>} />
              <Route path="/profile" element={<Protected><ProfilePage /></Protected>} />
              <Route path="/settings" element={<Protected><SettingsPage /></Protected>} />
              <Route path="/signin" element={<SigninPage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/achievements" element={<Protected><AchievementsPage /></Protected>} />
              <Route path="/certificates" element={<Protected><CertificatesPage /></Protected>} />
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
              <Route path="/lesson/rust/:day" element={<Protected><LessonRustPage /></Protected>} />
              <Route path="/lesson/sql/:day" element={<Protected><LessonSqlPage /></Protected>} />
              <Route path="/lesson/bash/:day" element={<Protected><LessonBashPage /></Protected>} />
              {/* legacy redirects */}
              <Route path="/lesson/:track/:day" element={<Navigate to="/" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
            <Footer />
          </div>
        </ErrorBoundary>
      </StoreHydrator>
    </AuthProvider>
  );
}
