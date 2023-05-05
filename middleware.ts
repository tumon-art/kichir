import { NextRequestWithAuth, withAuth } from "next-auth/middleware";

const middleware = async (request: NextRequestWithAuth) => {
  console.log(request.nextauth.token,'middleware.ts');
  // if (request.nextauth.token !== null)
  //   return NextResponse.redirect(new URL("/home", request.url));
};

export default withAuth(middleware, {
  callbacks: {
    authorized: ({ token }) => (token ? true : false),
  },
});

export const config = {
  matcher: ["/"],
};
