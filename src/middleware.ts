import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: { signIn: "/signin" },
});

export const config = {
  matcher: [
    "/dashboard",
    "/profile",
    "/achievements",
    "/settings",
    "/certificates",
    "/lesson/:path*",
    "/community/groups/:path*",
    "/community/moderation",
  ],
};
