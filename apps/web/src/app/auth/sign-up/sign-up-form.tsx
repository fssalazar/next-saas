'use client'

import { Separator } from '@radix-ui/react-separator'
import { AlertTriangle, Loader2 } from 'lucide-react'
import Link from 'next/link'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'

import { signInWithGithub } from '../actions'
import { signUp } from './action'

export function SignUpForm() {
  const [{ success, message, errors }, formAction, isPending] =
    useFormState(signUp)

  return (
    <div className="space-y-4">
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Sign up failed</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
      <form onSubmit={formAction} className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="Name" />
          {errors?.name && <p className="text-red-500">{errors.name}</p>}
        </div>
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" name="email" placeholder="Email" />
          {errors?.email && <p className="text-red-500">{errors.email}</p>}
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
          />
          {errors?.password && (
            <p className="text-red-500">{errors.password}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="password_confirmation">Confirm Password</Label>
          <Input
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            placeholder="Confirm Password"
          />
          {errors?.password_confirmation && (
            <p className="text-red-500">{errors.password_confirmation}</p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            'Create account'
          )}
        </Button>
        <Button variant="link" className="w-full" size="sm" asChild>
          <Link href="/auth/sign-in">Already have an account? Sign in</Link>
        </Button>
      </form>
      <Separator />
      <form action={signInWithGithub}>
        <Button type="submit" className="w-full" variant="outline">
          Sign up with Github
        </Button>
      </form>
    </div>
  )
}
