"use server"

import { z } from "zod"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import { signIn } from "@/lib/auth/auth"
import { AuthError } from "next-auth"
import { UserRole } from "@/generated/prisma/enums"

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["DOCTOR", "PATIENT"]).default("PATIENT"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

export async function signup(prevState: any, formData: FormData) {
  const validatedFields = signupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    role: formData.get("role") || "PATIENT",
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { name, email, password, role } = validatedFields.data

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return {
        message: "Email already in use",
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role as UserRole,
      },
    })
    
  } catch (error) {
    console.error("Signup Error:", error)
    return {
      message: "Database Error: Failed to Create User.",
    }
  }

  redirect("/auth/login")
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", formData)
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials."
        default:
          return "Something went wrong."
      }
    }
    throw error
  }
}

