import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectMongoDB from "../../../../../libs/mongodb";
import UsersAuth from "../../../../../models/UsersAuth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials: any) {
        const { email, password } = credentials;

        try {
          await connectMongoDB();
          const user = await UsersAuth.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null;
          }
          
          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, session }) {
      return token;
    },
    async session({ session, token, user }) {
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 3 * 24 * 60 * 60
  },
  jwt: {
    maxAge: 3 * 24 * 60 * 60
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
