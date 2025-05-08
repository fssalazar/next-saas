'use client'
import { AlertTriangle, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useActionState } from 'react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import { signInWithEmailAndPassword } from './actions'

type FormState = {
  success: boolean
  message: string | null
  errors: { email?: string[]; password?: string[] } | null
  email: string
  password: string
}

export function SignInForm() {
  const initialState: FormState = {
    success: false,
    message: null,
    errors: null,
    email: '',
    password: '',
  }
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    signInWithEmailAndPassword,
    initialState,
  )

  return (
    <form action={formAction} className="space-y-4">
      {state.success === false && state.message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Sign in failed</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          defaultValue={state.email}
        />
        {state.errors?.email && (
          <p className="text-sm text-red-500 dark:text-red-400">
            {state.errors.email[0]}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          defaultValue={state.password}
        />
        {state.errors?.password && (
          <p className="text-sm text-red-500 dark:text-red-400">
            {state.errors.password[0]}
          </p>
        )}
        <Link
          href="/auth/forgot-password"
          className="text-foreground text-xs font-medium hover:underline"
        >
          Forgot yout password?
        </Link>
      </div>
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          'Sign in with email'
        )}
      </Button>
      <Button variant="link" className="w-full" size="sm" asChild>
        <Link href="/auth/sign-up">Don&apos;t have an account? Sign up</Link>
      </Button>
      <Separator />
      <Button type="submit" className="w-full" variant="outline">
        Sign in with Github
      </Button>
    </form>
  )
}
