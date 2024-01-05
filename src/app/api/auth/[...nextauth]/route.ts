// import NextAuth from "next-auth/next";
// import  CredentialsProvider  from "next-auth/providers/credentials";


// const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {},

//       async authorize(credentials) {
//         const UserAuth =  {id: "1"};
//         return UserAuth;
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



// import { NextApiHandler } from "next";
// import NextAuth, { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// interface User {
//   id: string;
// }

// const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {},

//       async authorize(credentials) {
//         const user: User = { id: "1" };
//         return user;
//       },
//     }),
//   ],

//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: "/",
//   },
// };

// const handler: NextApiHandler = (req, res) => NextAuth(req, res, authOptions);

// export { handler as GET, handler as POST };




import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectMongoDB from "../../../../../libs/mongodb";
import UsersAuth from "../../../../../models/UsersAuth";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
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
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
