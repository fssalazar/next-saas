/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from 'axios'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { CreateAccount } from '@/http/create-account'

const signUpSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: 'Name is required' })
      .refine((val) => val.split(' ').length > 1, {
        message: 'Please, provide your full name',
      }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords do not match',
    path: ['password_confirmation'],
  })

export async function signUp(data: FormData) {
  const result = signUpSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return {
      success: false,
      message: null,
      errors,
    }
  }

  const { name, email, password } = result.data

  try {
    await CreateAccount({
      name,
      email,
      password,
    })
  } catch (error) {
    if (error instanceof AxiosError) {
      const err = error.response?.data
      return {
        success: false,
        message: err.message,
        errors: null,
      }
    }
  }
  redirect('/auth/sign-in')
}
