import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

export default function SignUp() {
  return (
    <form action="" className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" placeholder="Name" />
      </div>
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" name="email" placeholder="Email" />
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="password_confirmation">Confirm Password</Label>
        <Input
          type="password"
          id="password_confirmation"
          name="password_confirmation"
          placeholder="Confirm Password"
        />
      </div>
      <Button type="submit" className="w-full">
        Create account
      </Button>
      <Button variant="link" className="w-full" size="sm" asChild>
        <Link href="/auth/sign-in">Already have an account? Sign in</Link>
      </Button>
      <Separator />
      <Button type="submit" className="w-full" variant="outline">
        Sign up with Github
      </Button>
    </form>
  )
}
