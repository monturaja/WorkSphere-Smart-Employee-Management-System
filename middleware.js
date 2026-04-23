import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/employees/:path*",
    "/departments/:path*",
    "/attendance/:path*",
    "/leave/:path*",
    "/payroll/:path*",
    "/profile/:path*",
  ],
};
