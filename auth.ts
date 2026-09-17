import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const {
  handlers,
  signIn,
  signOut,
  auth,
} = NextAuth({
  providers: [Google],

  callbacks: {
    async signIn({ user }) {
      const email = user.email

      if (!email) {
        return false
      }

      // Only allow institutional accounts
      if (!email.toLowerCase().endsWith("@thebges.edu.in")) {
        return false
      }

      return true
    },
  },

  pages: {
    signIn: "/login",
    error: "/access-denied",
  },
})