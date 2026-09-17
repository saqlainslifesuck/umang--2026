import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],

  callbacks: {
    async signIn({ user }) {
      const email = user.email

      // Allow only institutional college email
      if (!email?.toLowerCase().endsWith("@thebges.edu.in")) {
        return false
      }

      return true
    },

    authorized({ auth }) {
      return !!auth?.user
    },
  },

  pages: {
    signIn: "/login",
    error: "/access-denied",
  },
})