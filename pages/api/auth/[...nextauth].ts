import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prismaClient from "@/lib/prisma";
import EmailProvider from "next-auth/providers/email";
import { Session } from "inspector";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prismaClient),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      // token.userRole = "admin";
      if (user) {
        token.id = user?.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user!.id = String(token.id);
      return session;
    },
  },
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    GoogleProvider({
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
    }),
  ],
};
export default NextAuth(authOptions);
