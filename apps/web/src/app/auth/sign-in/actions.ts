'use server'

import { AxiosError } from 'axios'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { acceptInvite } from '@/http/accept-invite'
import { signInWithPassword } from '@/http/sign-in-with-password'

const signInSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please, provide a valid email address.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
})

export async function signInWithEmailAndPassword(data: FormData) {
  const result = signInSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    return {
      success: false,
      message: null,
      errors,
    }
  }

  const { email, password } = result.data

  try {
    const { token } = await signInWithPassword({
      email,
      password,
    })

    ;(await cookies()).set('token', token, {
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    })
    const inviteId = (await cookies()).get('inviteId')?.value

    if (inviteId) {
      try {
        await acceptInvite(inviteId)
        ;(await cookies()).delete('inviteId')
      } catch (e) {
        console.log(e)
      }
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const err = error.response?.data
      return {
        success: false,
        message: err.message,
        errors: null,
        email,
        password,
      }
    }
    return {
      success: false,
      message: 'Something went wrong',
      errors: null,
      email,
      password,
    }
  }

  redirect('/')
}
