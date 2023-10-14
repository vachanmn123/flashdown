import NextAuth from "next-auth";
import authOptions from "@/lib/auth/authOptions";

const auth = NextAuth(authOptions);

export { auth as GET, auth as POST };
