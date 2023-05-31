import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const middleware = async (request: NextRequestWithAuth) => {
  console.log(request.nextauth.token,'middleware.ts');
     if (request.nextauth.token === null) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
};

export default withAuth(middleware, {
  callbacks: {
    authorized: ({ token }) => (token ? true : false),
  },
});

export const config = {
  matcher: ["/"],
};
