// import NextAuth from "next-auth/next";
// import  CredentialsProvider  from "next-auth/providers/credentials";


// const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {},

//       async authorize(credentials) {
//         const user =  {id: "1"};
//         return user;
//       },
//     }),
//   ],

//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: "/"
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST }



import { NextApiHandler } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface User {
  id: string;
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const user: User = { id: "1" };
        return user;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};

const handler: NextApiHandler = (req, res) => NextAuth(req, res, authOptions);

export { handler as GET, handler as POST };
