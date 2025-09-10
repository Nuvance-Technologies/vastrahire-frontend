import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/lib/models/user.model";
import { AuthorizedUser as Authorized } from "@/types/AuthoririzedUser";
import { connectToDB } from "@/lib/db/db";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<Authorized | null> {
        if (!credentials?.email || !credentials?.password) return null;
        await connectToDB();

        const user = await User.findOne({ email: credentials.email });
        console.log("User found:", user);

        if (!user) return null;

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isPasswordCorrect) return null;

        const updatedUser = await User.findById(user?._id);

        return {
          id: updatedUser?._id.toString() as string,
          name: updatedUser?.name as { firstname: string; lastname: string },
          email: updatedUser?.email as string,
          role: updatedUser?.role as "individual" | "business" | "customer",
          phoneNumber: updatedUser?.phoneNumber as string,
          address: updatedUser?.address as string,
        };
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.phoneNumber = user.phoneNumber;
        token.address = user.address;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.name = token.name as { firstname: string; lastname: string };
      session.user.role = token.role as string;
      session.user.phoneNumber = token.phoneNumber as string;
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/auth/error",
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};
