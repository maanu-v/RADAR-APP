import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import prisma from "../prisma"
 
class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password"
}
 
export const { handlers, auth } = NextAuth({
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
                password: password,
            }
        })

        if (user) {
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
})