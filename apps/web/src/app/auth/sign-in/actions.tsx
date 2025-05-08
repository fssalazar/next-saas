'use server'

import { AxiosError } from 'axios'
import { z } from 'zod'

import { signInWithPassword } from '@/http/sign-in-with-password'

const signInSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please, provide a valid email address.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
})

export async function signInWithEmailAndPassword(_: unknown, data: FormData) {
  const result = signInSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    return { success: false, message: null, errors }
  }

  const { email, password } = result.data

  try {
    const { token } = await signInWithPassword({
      email,
      password,
    })
  } catch (error) {
    if (error instanceof AxiosError) {
      const err = error.response?.data
      return { success: false, message: err.message, errors: null }
    }
    return { success: false, message: 'Something went wrong', errors: null }
  }
  return { success: true, message: null, errors: null }
}
