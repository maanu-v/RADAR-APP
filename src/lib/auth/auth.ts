import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import prisma from "../prisma"
import bcrypt from "bcryptjs"
 
class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password"
}
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as { email: string; password: string }
    
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            }
        })

        if (!user) {
            throw new InvalidLoginError()
        }

        const isValid = await bcrypt.compare(password, user.password)

        if (isValid) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          }
        }
        
        throw new InvalidLoginError()
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl + "/dashboard"
    },
  },
})